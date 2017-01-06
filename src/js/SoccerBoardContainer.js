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
    var w = Math.max(this.refs.soccerBoardContainer.offsetWidth-500,500);
    var h = this.refs.soccerBoardContainer.offsetHeight;
    if (w>h/4*5) w = ~~(h/4*5);
    else if (h>w/5*4) h = ~~(w/5*4);

    var w_field = ~~(w*radioField[0]);
    var h_field = ~~(h*radioField[1]);
    var w_stand = ~~(w*radioStand[0]);
    var h_stand = ~~(h*radioStand[1]);
    var w_border = ~~(w*radioBorder[0]);
    var h_border = ~~(h*radioBorder[1]);
    this.refs.soccerModule.resize(w,h, w_field,h_field);
    this.refs.startModule.resize(w,h);
    this.refs.teamModule.resize(Math.min(w_stand+500, this.refs.soccerBoardContainer.offsetWidth), h_stand, w_border, h_border);
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
