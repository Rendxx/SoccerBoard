var React = require('react');
var StartScreen = require('./StartScreen.js');
var SoccerBoardTag = require('./SoccerBoardTag.js');
var SoccerField = require('./SoccerField.js');
var style = require('../less/SoccerBoardContainer.less');

var fieldStyle={field:'default'};

var SoccerBoardContainer = React.createClass({
  componentDidMount: function (){
  },
  render:function(){
    return(
      <div className="soccerBoardContainer">
        <StartScreen />
        <SoccerBoardTag />
        <SoccerField fieldStyle={fieldStyle}/>
      </div>
    );
  }
});

module.exports = SoccerBoardContainer;
