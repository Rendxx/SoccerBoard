var React = require('react');
var ReactDOM = require('react-dom');
var Board = require('./Board.js');
var style = require('../less/Main.less');

ReactDOM.render(
  <Board />,
  document.getElementById('main')
);
