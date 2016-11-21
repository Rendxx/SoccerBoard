var React = require('react');
var StartScreen = require('./StartScreen.js');
var SoccerField = require('./SoccerField.js');
var style = require('../less/SoccerBoardContainer.less');

var fieldStyle={field:'default'};

var SoccerBoardContainer = React.createClass({
  componentDidMount: function (){
  },
  onMouseEnter:function(){
    this.refs.startScreen.hover(true);
    this.refs.soccerField.hover(true);
  },
  onMouseLeave:function(){
    this.refs.startScreen.hover(false);
    this.refs.soccerField.hover(false);
  },
  start:function(){
    this.refs.startScreen.hide();
    this.refs.soccerField.expand();
  },
  render:function(){
    return(
      <div className="soccerBoardContainer">
        <StartScreen ref="startScreen" onHover={[this.onMouseEnter,this.onMouseLeave]} onStart={this.start}/>
        <SoccerField ref="soccerField" fieldStyle={fieldStyle}/>
      </div>
    );
  }
});

module.exports = SoccerBoardContainer;
