var React = require('react');
var StartModule = require('MODULE/Module.Start.js');
var SoccerModule = require('MODULE/Module.Soccer.js');
var TeamModule = require('MODULE/Module.Team.js');
var style = require('LESS/SoccerBoardContainer.less');

var fieldStyle={field:'default'};

var radioStand = [1100/1500, 850/1200];
var radioBorder = [884/1500, 642/1200];
var radioField = [694/1500, 520/1200];

var SoccerBoardContainer = React.createClass({
  /* Public Method *********************************************************************/
  loadTeam: function (dat){
    this.refs.teamModule.loadTeam(dat);
    this.refs.soccerModule.loadTeam(dat);
  },
  resize:function(){
    var w = this.refs.soccerBoardContainer.offsetWidth-480;
    var h = this.refs.soccerBoardContainer.offsetHeight;
    if (w>h/4*5) w = h/4*5;
    else if (h>w/5*4) h = w/5*4;
    this.refs.soccerModule.resize(w,h, w*radioField[0],h*radioField[1]);
    this.refs.startModule.resize(w*0.6,h);
    this.refs.teamModule.resize(w*radioStand[0]+460,h*radioStand[1], w*radioBorder[0],h*radioBorder[1]);
  },

  /* Private Method *********************************************************************/
  _onMouseEnter:function(){
    this.refs.startModule.hover(true);
    this.refs.soccerModule.hover(true);
  },
  _onMouseLeave:function(){
    this.refs.startModule.hover(false);
    this.refs.soccerModule.hover(false);
  },
  _start:function(){
    this.refs.startModule.hide();
    this.refs.soccerModule.expand();
    this.refs.teamModule.show();
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
      <div className={className} ref="soccerBoardContainer" onselectstart="return false;">
        <StartModule ref="startModule" onHover={[this._onMouseEnter, this._onMouseLeave]} onStart={this._start}/>
        <TeamModule ref="teamModule"/>
        <SoccerModule ref="soccerModule" fieldStyle={fieldStyle}/>
      </div>
    );
  }
});

module.exports = SoccerBoardContainer;
