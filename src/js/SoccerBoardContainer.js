var React = require('react');
var StartScreen = require('./StartScreen.js');
var SoccerField = require('./SoccerField.js');
var style = require('../less/SoccerBoardContainer.less');

var fieldStyle={field:'default'};

var SoccerBoardContainer = React.createClass({
  getInitialState: function() {
    return {
      started: false
    };
  },
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
    this.setState({
      started: true
    });
  },
  render:function(){
    var className = "soccerBoardContainer";
    if (this.state.started) className+=" started";
    return(
      <div className={className}>
        <StartScreen ref="startScreen" onHover={[this.onMouseEnter,this.onMouseLeave]} onStart={this.start}/>
        <SoccerField ref="soccerField" fieldStyle={fieldStyle}/>
      </div>
    );
  }
});

module.exports = SoccerBoardContainer;
