"use strict"

const jsonfile = require('jsonfile'),
    cheerio = require("cheerio"),
    req = require("tinyreq"),
    request = require('request'),
    fs = require("fs"),
    imageDownloader = require('image-downloader');

// data ----------------------------------------------------------------
var DATA_info = [
    'English Premier League',
];


// function ------------------------------------------------------------
function readJson(fileName) {
    var contents = fs.readFileSync("data/squads/" + fileName + ".json");
    var jsonContent = JSON.parse(contents);
    return jsonContent;
};

function pad(num, size) {
    return ('00' + num).substr(-size);
}

var saveFile = function(dat, fileName) {
    for (var i = 0; i < dat.length; i++) {
        jsonfile.writeFile('data/' + fileName + '.json', dat, function(err) {
            if (err) console.error(err)
        });
    }
};

function scrapeTeamBadge(teamName, folder, idx, teamDat) {
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
            if (cloth != null) {
                for (var i = 0; i < cloth.length; i++) {
                    try {
                        imageDownloader({
                            url: "https:" + $($(cloth[i]).find("div div div")).eq(2).find("img").attr("src"),
                            dest: 'data/' + folder + '/' + idx + "_" + i + '.png',
                            done: function(err, filename, image) {
                                if (err) {
                                    throw err;
                                }
                                console.log('Cloth: ', filename);
                            }
                        });
                    } catch (e) {
                        console.log(e.message);
                    }
                }
            }
            teamDat['idx'] = idx;
            teamDat['color'] = [];
        });
};

function main(leagueInfo, LeagueName) {
    var i = 0;
    var loadFunc = function() {
        var teamDat = leagueInfo[i];
        var idx = pad(i + 1, 2);
        scrapeTeamBadge(teamDat.name, LeagueName, idx, teamDat);
        i++;
        if (i < leagueInfo.length) setTimeout(loadFunc, 1000);
        else {
            saveFile(leagueInfo, LeagueName + '.json');
        }
    };
    loadFunc();
};

//------------------------------------------------------------------
for (var i = 0; i < DATA_info.length; i++) {
    main(readJson(DATA_info[i]), DATA_info[i]);
}
