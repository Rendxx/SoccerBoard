var React = require('react');
var StartScreen = require('./StartScreen.js');
var SoccerField = require('./SoccerField.js');
var TeamPanel = require('./TeamPanel.js');
var style = require('../less/SoccerBoardContainer.less');

var fieldStyle={field:'default'};

var radioStand = [1100/1500, 850/1200];
var radioBorder = [884/1500, 642/1200];
var radioField = [694/1500, 520/1200];

var SoccerBoardContainer = React.createClass({
  /* Public Method *********************************************************************/
  loadTeam: function (dat){
    this.refs.teamPanel.loadTeam(dat);
    this.refs.soccerField.loadTeam(dat);
  },
  resize:function(){
    var w = Math.max(600,this.refs.soccerBoardContainer.offsetWidth-460);
    var h = this.refs.soccerBoardContainer.offsetHeight;
    if (w>h/4*5) w = h/4*5;
    else if (h>w/5*4) h = w/5*4;
    this.refs.soccerField.resize(w,h, w*radioField[0],h*radioField[1]);
    this.refs.startScreen.resize(w*0.6,h);
    this.refs.teamPanel.resize(w*radioStand[0]+460,h*radioStand[1], w*radioBorder[0],h*radioBorder[1]);
  },
  
  /* Private Method *********************************************************************/
  _onMouseEnter:function(){
    this.refs.startScreen.hover(true);
    this.refs.soccerField.hover(true);
  },
  _onMouseLeave:function(){
    this.refs.startScreen.hover(false);
    this.refs.soccerField.hover(false);
  },
  _start:function(){
    this.refs.startScreen.hide();
    this.refs.soccerField.expand();
    this.refs.teamPanel.show();
    this.setState({
      started: true
    });
  },

  /* React Method *********************************************************************/
  getInitialState: function() {
    return {
      started: false
    };
  },
  componentDidMount: function (){
    window.addEventListener("resize", this.resize);
    this.resize();
    this.loadTeam({
      left:this.props.team.left,
      right:this.props.team.right
    });
  },
  componentWillUnmount: function() {
    window.removeEventListener("resize", this.resize);
  },
  render:function(){
    var className = "soccerBoardContainer";
    if (this.state.started) className+=" started";
    return(
      <div className={className} ref="soccerBoardContainer">
        <StartScreen ref="startScreen" onHover={[this._onMouseEnter, this._onMouseLeave]} onStart={this._start}/>
        <TeamPanel ref="teamPanel"/>
        <SoccerField ref="soccerField" fieldStyle={fieldStyle}/>
      </div>
    );
  }
});

module.exports = SoccerBoardContainer;
