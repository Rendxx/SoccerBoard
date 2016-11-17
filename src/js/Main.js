var React = require('react');
var ReactDOM = require('react-dom');
var StartScreen = require('./StartScreen.js');
var Header = require('./Header.js');
var style = require('../less/Main.less');

ReactDOM.render(
  <div id="main">
    <StartScreen />
    <Header />
  </div>,
  document.body
);
 
