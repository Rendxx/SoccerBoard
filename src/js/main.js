var React = require('react');
var ReactDOM = require('react-dom');
var CommentBox = require('./CommentBox.js');
var style = require('../less/main.less');

ReactDOM.render(
  <CommentBox url="/api/comments" pollInterval={2000}/>,
  document.getElementById('main')
);
