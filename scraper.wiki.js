"use strict"

const jsonfile = require('jsonfile'),
    cheerio = require("cheerio"),
    req = require("tinyreq"),
    request = require('request'),
    fs = require("fs");

// data ----------------------------------------------------------------
var DATA_info = [
    'English Premier League',
    'French Ligue 1',
    'German Bundesliga',
    'Italian Serie A',
    'Spanish LaLiga',
];

var wiki = {

};


// function ------------------------------------------------------------
function readJson(fileName) {
    var contents = fs.readFileSync("data/squads/" + fileName + '.json');
    var jsonContent = JSON.parse(contents);
    return jsonContent;
};

function pad(num, size) {
    return ('00' + num).substr(-size);
}

function _scrapeTeamWiki(url, idx, teamDat, cb) {
    console.log(url);
    req({
            url: url,
            headers: {
                "user-agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36"
            }
        },
        (err, body, res) => {
            if (err) return cb(false);
            let $ = cheerio.load(body);

            //console.log(res);
            var badge = $('#content #bodyContent #mw-content-text .infobox.vcard .image img');
            var cloth = $('#content #bodyContent #mw-content-text .infobox.vcard .toccolours table td');
            if ($(badge).attr('src')==null||cloth==null||cloth.length==0){ return cb(false); }
            return cb(true);
        });
};

function scrapeTeamWiki(idx, teamDat, cb) {
    console.log(teamDat.name+'----------------------------------------------');
    var name1 = teamDat.name.replace(/-/g, ' ').replace(/&/g, ' ').replace(/  +/g, ' ').replace(/ /g, '_');
    var name2 = teamDat.officialName.replace(/-/g, ' ').replace(/&/g, ' ').replace(/  +/g, ' ').replace(/ /g, '_');
    var urlList = [
        "https://en.wikipedia.org/wiki/" + name1,
        "https://en.wikipedia.org/wiki/" + name1 + "_F.C.",
        "https://en.wikipedia.org/wiki/" + name2,
        "https://en.wikipedia.org/wiki/" + name1+ " CF",
    ];
    var i = 0;
    var callback = function (successed){
        if (successed) cb && cb(urlList[i-1]);
        else if (i>=urlList.length) cb &&cb(null);
        else{
          _scrapeTeamWiki(urlList[i], idx, teamDat, callback);
          i++;
        }
    };
    callback(null);
};

function main(leagueInfo, wikiDat, cb) {
    var i = 0;
    var loadFunc = function() {
        var teamDat = leagueInfo[i];
        var idx = pad(i + 1, 2);
        scrapeTeamWiki(idx, teamDat, function(url){
            wikiDat[teamDat.name] = url;
            if (url!=null) {
              //console.log('[ERROR] '+err);
            }
            i++;

            if (i < leagueInfo.length){
                setTimeout(loadFunc, 1000);
            } else {
                cb();
            }
        });
    };
    loadFunc();
};

//------------------------------------------------------------------

function saveFile(dat) {
    jsonfile.writeFile('data/squads/wiki.json', dat, function(err) {
        if (err) console.error(err)
    });
};

var i = 0;
var loadInfo = function (){
  wiki[DATA_info[i]] = {};
  main(readJson(DATA_info[i]), wiki[DATA_info[i]], function (){
      i++;
      if (i<DATA_info.length) loadInfo();
      else{
        console.log('');
        console.log('[DONE] ---------------------------------');
        saveFile(wiki);
      }
  });
};
loadInfo();
