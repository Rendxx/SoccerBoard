var React = require('react');
var ReactDOM = require('react-dom');
var StartScreen = require('./StartScreen.js');
var SoccerBoardTag = require('./SoccerBoardTag.js');
var SoccerField = require('./SoccerField.js');

var style = require('../less/Main.less');

var fieldStyle={field:'default'};

ReactDOM.render(
  <div id="main">
    <StartScreen />
    <SoccerBoardTag />
    <SoccerField fieldStyle={fieldStyle}/>
  </div>,
  document.body
);
