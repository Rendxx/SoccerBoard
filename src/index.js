var React = require('react');
var ReactDOM = require('react-dom');
var Board = require('./Board.js');
var style = require('../less/index.less');

ReactDOM.render(
  <CommentBox url="/api/comments" pollInterval={2000}/>,
  document.getElementById('main')
);
