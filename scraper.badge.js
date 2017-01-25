"use strict"

const jsonfile = require('jsonfile'),
    cheerio = require("cheerio"),
    req = require("tinyreq"),
    request = require('request'),
    fs = require("fs"),
    imageDownloader = require('image-downloader'),
    Canvas = require("canvas"),
    Image = Canvas.Image;

// data ----------------------------------------------------------------
var DATA_info = [
    // 'English Premier League',
    // 'French Ligue 1',
    // 'German Bundesliga',
    'Italian Serie A',
    'Spanish LaLiga',
];


// function ------------------------------------------------------------
function readJson(fileName) {
    var contents = fs.readFileSync("data/squads/" + fileName + '.json');
    var jsonContent = JSON.parse(contents);
    return jsonContent;
};

function pad(num, size) {
    return ('00' + num).substr(-size);
}

function saveFile(dat, fileName) {
    for (var i = 0; i < dat.length; i++) {
        jsonfile.writeFile('data/' + fileName, dat, function(err) {
            if (err) console.error(err)
        });
    }
};

function createCanvas(bg, uri, w, h, clothIdx, cb) {
    //console.log(bg, uri, w, h);
    var canvas = new Canvas(w, h),
        ctx = canvas.getContext('2d');

    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, w, h);
    if (uri != null) {
        req({
                url: uri,
                headers: {
                    "user-agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36"
                },
                encoding: "binary"
            },
            (err, body) => {
                if (err) {
                    throw err;
                }
                var img = new Image;
                img.onload = function() {
                    ctx.drawImage(img, 0, 0, w, h);
                    cb && cb(canvas, ctx, clothIdx);
                };
                img.src = new Buffer(body, "binary");;
            }
        );
    } else {
        cb && cb(canvas, ctx, clothIdx);
    }
};

function getMainColor(ctx, w, h){
    var data = ctx.getImageData(0, 0, w, h);
    var length = data.data.length;
    var rgb = {'ffffff': -w*4};
    var max = 'ffffff';
    var i=0;
    while ( i < length ) {
        var c = pad(data.data[i].toString(16),2)+ pad(data.data[i+1].toString(16),2)+ pad(data.data[i+2].toString(16),2);
        rgb[c]=(rgb[c]||0)+1;
        if (rgb[c]>rgb[max])max=c;
        i+=4;
    }
    return "#"+max;
};

function scrapeTeamBadge(teamName, folder, idx, teamDat, cb) {
  console.log ("https://en.wikipedia.org/wiki/" + teamName + "_F.C.")
    req({
            url: "https://en.wikipedia.org/wiki/" + teamName + "_F.C.",
            headers: {
                "user-agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36"
            }
        },
        (err, body) => {
            console.log(teamName + "-------------------------------")
            if (err) {
                return cb(err);
            }
            let $ = cheerio.load(body);

            var badge = $('#content #bodyContent #mw-content-text .infobox.vcard .image img');
            try {
                imageDownloader({
                    url: "https:" + $(badge).attr('src'),
                    dest: 'data/' + folder + '/' + idx + '.png',
                    done: function(err, filename, image) {
                        if (err) {
                            throw err;
                        }
                        console.log('Badge: ', filename);
                    }
                });
            } catch (e) {
                console.log(e.message);
            }

            var cloth = $('#content #bodyContent #mw-content-text .infobox.vcard .toccolours table td');
            var colorDat = [];
            var count = cloth.length;
            if (cloth != null) {
                for (var i = 0; i < cloth.length; i++) {
                    try {
                        var ele = $($(cloth[i]).find("div div div")).eq(2);
                        var clothUri = ele.find("img").attr("src");
                        var bg = $(ele).css("background-color");
                        var w = parseInt($(ele).css("width"));
                        var h = parseInt($(ele).css("height"));
                        if (clothUri != null) clothUri = "https:" + clothUri;
                        createCanvas(bg, clothUri, w, h, i, function(canvas, ctx, clothIdx) {
                          var cloth_name = 'data/' + folder + '/' + idx + "_" + clothIdx + '.png';
                          var cloth_color = getMainColor(ctx, canvas.width, canvas.height);
                          colorDat[clothIdx]=cloth_color;
                          console.log(cloth_color);
                          fs.writeFile(cloth_name, canvas.toBuffer(), function(err) {
                              if(err) {
                                  return console.log(err);
                              }

                              console.log("[Saved] "+cloth_name);
                              if (--count===0) cb && cb();
                          });
                        });
                    } catch (e) {
                        console.log(e.message);
                    }
                }
            }
            teamDat['idx'] = idx;
            teamDat['color'] = colorDat;
        });
};

function main(leagueInfo, LeagueName) {
    var i = 0;
    if (!fs.existsSync("data/" + LeagueName)) {
        fs.mkdirSync("data/" + LeagueName);
    }
    var loadFunc = function() {
        var teamDat = leagueInfo[i];
        var idx = pad(i + 1, 2);
        scrapeTeamBadge(teamDat.name, LeagueName, idx, teamDat, function(){
            i++;
            if (i < leagueInfo.length){
                setTimeout(loadFunc, 1000);
            } else {
                saveFile(leagueInfo, LeagueName + '.json');
            }
        });
    };
    loadFunc();
};

//------------------------------------------------------------------
for (var i = 0; i < DATA_info.length; i++) {
    main(readJson(DATA_info[i]), DATA_info[i]);
}
