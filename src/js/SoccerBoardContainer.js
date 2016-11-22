var React = require('react');
var StartScreen = require('./StartScreen.js');
var SoccerField = require('./SoccerField.js');
var TeamPanel = require('./TeamPanel.js');
var style = require('../less/SoccerBoardContainer.less');

var fieldStyle={field:'default'};

var SoccerBoardContainer = React.createClass({
  getInitialState: function() {
    return {
      started: false
    };
  },
  componentDidMount: function (){
    window.addEventListener("resize", this.resize);
    this.resize();
  },
  componentWillUnmount: function() {
    window.removeEventListener("resize", this.resize);
  },
  resize:function(){
    var w = Math.max(600,this.refs.soccerBoardContainer.offsetWidth-400);
    var h = this.refs.soccerBoardContainer.offsetHeight;
    if (w>h/4*5) w = h/4*5;
    else if (h>w/5*4) h = w/5*4;
    this.refs.soccerField.resize(w,h);
    this.refs.startScreen.resize(w*0.6,h);
    this.refs.teamPanel.resize(w+400,h);
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
    this.refs.teamPanel.show();
    this.setState({
      started: true
    });
  },
  render:function(){
    var className = "soccerBoardContainer";
    if (this.state.started) className+=" started";
    return(
      <div className={className} ref="soccerBoardContainer">
        <StartScreen ref="startScreen" onHover={[this.onMouseEnter,this.onMouseLeave]} onStart={this.start}/>
        <TeamPanel ref="teamPanel"/>
        <SoccerField ref="soccerField" fieldStyle={fieldStyle}/>
      </div>
    );
  }
});

module.exports = SoccerBoardContainer;
