require('LESS/Module.Team.less');
var React = require('react');
var TeamPad = require('TEAM/Team.Pad.js');
var TeamLoaderMain = require('TEAM/Team.Loader.Main.js');
var SIDE = require('TEAM/Team.SIDE.js');

var TeamModule = React.createClass({
  /* Public Method *********************************************************************/
  show:function(){
    this.setState({
      hidden:false
    });
  },
  loadTeam: function (dat){
    if (!dat) return;
    if (dat[SIDE.LEFT])this.refs.teamLeft.loadPlayer(dat[SIDE.LEFT]);
    if (dat[SIDE.RIGHT])this.refs.teamRight.loadPlayer(dat[SIDE.RIGHT]);
  },
  resize:function(w, h, w_border, h_border){
    this.refs.teamLeft.setPosition({
      left: -(~~(w/2)),
      top: -(~~(h_border/2))
    });
    this.refs.teamRight.setPosition({
      right: -(~~(w/2)),
      top: -(~~(h_border/2))
    });
  },
  unselect:function(){
    this.setState({
      teamSelected: false
    });
    this.refs.teamLeft.unselect();
    this.refs.teamRight.unselect();
  },

  /* Private Method *********************************************************************/
  _transitionEnd: function(){
    if (this.state.hidden) return;
    this.setState({
      animation:false
    });
  },
  _teamPadSelected: function(){
    this.setState({
      teamSelected: true
    });
  },
  _playerListUpdate:function(){
      var playerList = {};
      playerList[SIDE.LEFT] = this.refs.teamLeft.getPlayerList();
      playerList[SIDE.RIGHT] = this.refs.teamRight.getPlayerList();
      this.props.onChange && this.props.onChange(playerList);
  },
  _changeTeam:function(side){
    this.refs.teamLoaderMain.show();
    this.unselect();
  },

  /* React Method *********************************************************************/
  getInitialState: function() {
    return {
      hidden: true,
      animation:true,
      teamSelected: false,
    };
  },
  componentDidMount: function (){
    this.refs.bg.addEventListener('click', function(e) {
      this.unselect();
    }.bind(this));
  },
  render:function(){
    var className='teamModule';
    if (this.state.hidden)className+= " hidden";
    if (this.state.animation)className+= " animation";

    return(
      <div className={className} ref="container" onTransitionEnd={this._transitionEnd}>
          <TeamPad ref="teamLeft" side={SIDE.LEFT} onSelected={this._teamPadSelected} onChanged={this._playerListUpdate} changeTeam={this._changeTeam}/>
          <TeamPad ref="teamRight" side={SIDE.RIGHT} onSelected={this._teamPadSelected} onChanged={this._playerListUpdate} changeTeam={this._changeTeam} />
          <div className={"teamBgCover"+(this.state.teamSelected?" shown":"")} ref="bg" ></div>
          <TeamLoaderMain ref="teamLoaderMain" />
      </div>
    );
  }
});

module.exports = TeamModule;
