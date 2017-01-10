require('../font/soccerIcon/style.css');
require('../less/Main.less');
var React = require('react');
var ReactDOM = require('react-dom');
var SoccerBoardContainer = require('./SoccerBoardContainer.js');
var STATUS=require('TEAM/Team.STATUS.js');
var SIDE = require('TEAM/Team.SIDE.js');

var team1={
  name:"Team 1",
  color: "#cc3333",
  info:[
    null,
    {name: "Player Alpha"}, // 1
    {name: "Player Beta"},
    {name: "Player Cyta"},
    {name: "Player David"},
    {name: "Player Elephant"},  // 5
    {name: "Player Flag"},
    {name: "Player Grill"},
    {name: "Player Hillton"},
    {name: "Player Illen"},
    {name: "Player Jack"},  // 10
    {name: "Player Kate"},
    {name: "Player Leon"},
    {name: "Player Max"},
    {name: "Player Nito"},
    {name: "Player Orange"},  // 15
    {name: "Player Pink"},
    {name: "Player Queen"},
    {name: "Player Red"},
    {name: "Player Santa"},
    {name: "Player Tank"} // 20
  ],
  playerList: {},
  position:[[50,2], [15,18], [38,15], [62,15], [85,18], [42,24], [58,24], [25,36], [50,36],[75,36],[50,46]]
};

var playerList1 = {};
playerList1[STATUS.STARTING] = [1,3,2,4,5,6,7,8,9,10,11];
playerList1[STATUS.BENCH] = [12,13,14,15,16,17];
playerList1[STATUS.REST] = [18, 19, 20];
team1.playerList = playerList1;

var team2={
  name:"Team 2",
  color: "#3333cc",
  info:[
    null,
    {name: "Player Alpha"}, // 1
    {name: "Player Beta"},
    {name: "Player Cyta"},
    {name: "Player David"},
    {name: "Player Elephant"},  // 5
    {name: "Player Flag"},
    {name: "Player Grill"},
    {name: "Player Hillton"},
    {name: "Player Illen"},
    {name: "Player Jack"},  // 10
    {name: "Player Kate"},
    {name: "Player Leon"},
    {name: "Player Max"},
    {name: "Player Nito"},
    {name: "Player Orange"},  // 15
    {name: "Player Pink"},
    {name: "Player Queen"},
    {name: "Player Red"},
    {name: "Player Santa"},
    {name: "Player Tank"} // 20
  ],
  playerList: {},
  position:[[50,2], [15,18], [38,15], [62,15], [85,18], [15,30], [42,26], [58,26], [85,30],[42,42],[58,42]]
};

var playerList2 = {};
playerList2[STATUS.STARTING] = [1,3,2,4,5,6,7,8,9,10,11];
playerList2[STATUS.BENCH] = [12,13,14,15,16,17];
playerList2[STATUS.REST] = [18, 19, 20];
team2.playerList = playerList2;

var teamDat = {};
teamDat[SIDE.LEFT] = team1;
teamDat[SIDE.RIGHT] = team2;

ReactDOM.render(
  <SoccerBoardContainer team={teamDat}/>,
  document.body
);
