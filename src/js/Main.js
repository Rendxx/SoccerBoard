var React = require('react');
var ReactDOM = require('react-dom');
var SoccerBoardContainer = require('./SoccerBoardContainer.js');
var font = require('../font/soccerIcon/style.css');

var style = require('../less/Main.less');

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
  starting:[1,3,2,4,5,6,7,8,9,10,11],
  bench:[12,13,14,15,16,17],
  rest:[18, 19, 20],
  position:[[50,2], [15,18], [38,15], [62,15], [85,18], [42,24], [58,24], [25,36], [50,36],[75,36],[50,46]]
};

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
  starting:[1,2,3,4,5,6,7,8,9,10,11],
  bench:[12,13,14,15,16,17],
  rest:[18, 19, 20],
  position:[[50,2], [15,18], [38,15], [62,15], [85,18], [15,30], [42,26], [58,26], [85,30],[42,42],[58,42]]
};

var teamDat = {left:team1, right:team2};

ReactDOM.render(
  <SoccerBoardContainer team={teamDat}/>,
  document.body
);
