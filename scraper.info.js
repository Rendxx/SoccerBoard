"use strict"

const jsonfile = require('jsonfile'),
      cheerio = require("cheerio"),
      req = require("tinyreq"),
      windows1252 = require('windows-1252'),
      utf8 = require('utf8');

// data ----------------------------------------------------------------
var DATA_League = [
    {
        name: 'English Premier League',
        url: 'http://www.footballsquads.co.uk/eng/2016-2017/faprem.htm'
    },
    {
        name: 'Spanish LaLiga',
        url: 'http://www.footballsquads.co.uk/spain/2016-2017/spalali.htm'
    },
    {
        name: 'German Bundesliga',
        url: 'http://www.footballsquads.co.uk/ger/2016-2017/gerbun.htm'
    },
    {
        name: 'Italian Serie A',
        url: 'http://www.footballsquads.co.uk/italy/2016-2017/seriea.htm'
    },
    {
        name: 'French Ligue 1',
        url: 'http://www.footballsquads.co.uk/france/2016-2017/fralig1.htm'
    }
];

var DATA_Squad_pre = 'http://www.footballsquads.co.uk/eng/2016-2017/';

// function ------------------------------------------------------------
function encodeHtml (body){
  let body_encode ='';
  try{
    body_encode=windows1252.encode(body)
  }catch(e){
    body_encode=utf8.encode(body);
  }
  return body_encode;
};

function parseLeagueInfo (idx, url, cb){
    req({
          url:url,
          encoding: 'binary'
        },
        (err, body) => {
          if (err) { return cb(err); }
          let $ = cheerio.load(encodeHtml(body));
          let pageData = [];

          var dat = $('#main').find('h5 a');
          console.log(dat.length);
          for (var i=0; i<dat.length; i++){
              var d = $(dat[i]);
              pageData[i] = {
                name: (d.text()),
                url: d.attr('href')
              };
          }
          cb(idx, pageData);
    });
};

function parseSquadInfo (idx, idx2, url, cb){
  console.log(url)
    req({
          url:url,
          encoding: 'binary'
        },
        (err, body) => {
            if (err) { return cb(err); }
            let $ = cheerio.load(encodeHtml(body));
            let pageData = [];

            var dat = $('#main table').find('tr');
            for (var i=0; i<dat.length; i++){
                var d = parsePlayerInfo($, $(dat[i]));
                if (d===null) continue;
                if (d===true) break;
                pageData.push(d);
            }

            cb(idx, idx2, pageData);
        });
};

function parsePlayerInfo ($, dat){
    var td = dat.find('td');
    if (dat.find('h4').length>0) return true;
    if ($(td[0]).text().replace(/\r/g,'').replace(/\n/g,'').trim()=='Number') return null;
    if ($(td[1]).text().replace(/\r/g,'').replace(/\n/g,'').trim()=='') return null;
    return {
        number: $(td[0]).text().replace(/\r/g,'').replace(/\n/g,'').trim(),
        name: $(td[1]).text().replace(/\r/g,'').replace(/\n/g,'').trim(),
        nat: $(td[2]).text().replace(/\r/g,'').replace(/\n/g,'').trim(),
        pos: $(td[3]).text().replace(/\r/g,'').replace(/\n/g,'').trim(),
        height: $(td[4]).text().replace(/\r/g,'').replace(/\n/g,'').trim(),
        weight: $(td[5]).text().replace(/\r/g,'').replace(/\n/g,'').trim(),
        dob: $(td[6]).text().replace(/\r/g,'').replace(/\n/g,'').trim()
    };
};

function scrapeLeague(league){
    var squadData = [];
    var count = league.length;
    for (var i=0;i<league.length;i++){
        var item = league[i];
        parseLeagueInfo(i, item.url, function(idx, dat){
            squadData[idx]={
              name: league[idx].name,
              url: dat
            }
            count--;
            console.log(squadData[idx].name);

            if (count===0){
                scrapeSquad(squadData);
            }
        });
    }
};

function scrapeSquad(squad){
    //console.log(squad);
    var info = [];
    var count = 0;
    for (var i=0;i<squad.length;i++){
        count+=squad[i].url.length;
        info[i]={
            name: squad[i].name,
            squad: []
        }
    }
    for (var i=0;i<squad.length;i++){
        var pre = DATA_League[i].url.substring(0,DATA_League[i].url.lastIndexOf('/')+1);
        for (var j=0;j<squad[i].url.length;j++){
            var item = squad[i].url[j];
            parseSquadInfo(i,j, pre+item.url, function(idx1, idx2, dat){
                info[idx1].squad[idx2]={
                  name: squad[idx1].url[idx2].name,
                  player: dat
                }
                count--;

                if (count===0){
                    saveFile(info);
                }
            });
        }
    }
};

var saveFile = function (dat){
    for (var i=0;i<dat.length;i++){
        jsonfile.writeFile('data/squads/'+dat[i].name+'.json', dat[i].squad, function (err) {
          if (err)console.error(err)
        });
    }
};

scrapeLeague(DATA_League);
// var cb = function (idx, dat){
//   console.log(dat);
//     jsonfile.writeFile('data/test.json', dat, function (err) {
//       console.error(err)
//     });
// };
// parseLeagueInfo(0,'http://www.footballsquads.co.uk/spain/2016-2017/spalali.htm', cb);

//console.log(windows1252.encode(utf8.decode('Alav�s')));
