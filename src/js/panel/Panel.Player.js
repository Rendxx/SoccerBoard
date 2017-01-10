require('LESS/Panel.Player.less');
var React = require('react');
var PlayerMarker = require('COMPONENT/Component.PlayerMarker.js');
var STATUS=require('TEAM/Team.STATUS.js');
var SIDE = require('TEAM/Team.SIDE.js');

var PanelPlayer = React.createClass({
  /* Public Method *********************************************************************/
  show:function(){
    this.setState({
      hidden:false
    });
  },
  resize:function(w, h){
    this.refs.container.style.width = w+"px";
    this.refs.container.style.height = h+"px";
    this.refs.container.style.marginTop = -(h>>1)+"px";
    this.refs.container.style.marginLeft = -(w>>1)+"px";

    if (this.state.team[SIDE.LEFT]!=null) for (var i=0;i<this.state.team[SIDE.LEFT].playerList[STATUS.STARTING].length;i++) this.refs["l"+i].setBoardDimension(w,h);
    if (this.state.team[SIDE.RIGHT]!=null) for (var i=0;i<this.state.team[SIDE.RIGHT].playerList[STATUS.STARTING].length;i++) this.refs["r"+i].setBoardDimension(w,h);
    this.setState({
      boardWidth:w,
      boardHeight:h
    });
  },
  loadTeam: function (dat){
    if (!dat) return;
    var team = {};
    if (dat[SIDE.LEFT]) team[SIDE.LEFT]=(dat[SIDE.LEFT]);
    if (dat[SIDE.RIGHT]) team[SIDE.RIGHT]=(dat[SIDE.RIGHT]);

    this.setState({
      team:team
    });
  },
  updatePlayerList:function(playerList){
      if (playerList[SIDE.LEFT]){
          this.state.team[SIDE.LEFT].playerList = playerList[SIDE.LEFT];
          this.state.team[SIDE.LEFT].playerList[STATUS.STARTING].map((playerNumber, arrIdx) => (
              this.refs["l"+ arrIdx].setData(playerNumber)
          ))
      }
      if (playerList[SIDE.RIGHT]){
          this.state.team[SIDE.RIGHT].playerList = playerList[SIDE.RIGHT];
          this.state.team[SIDE.RIGHT].playerList[STATUS.STARTING].map((playerNumber, arrIdx) => (
              this.refs["r"+ arrIdx].setData(playerNumber)
          ))
      }
  },


  /* Private Method *********************************************************************/
  _buildOnSelectedCallback: function(refId){
    var cb = function (){
      if (this.state.selectedRefId!==null) this.refs[this.state.selectedRefId].unselect();
      this.setState({selectedRefId:refId});
      if (refId!==null)this.refs[refId].select();
    };
    return cb.bind(this);
  },

  /* React Method *********************************************************************/
  getInitialState: function() {
    var team = {};
    team[SIDE.LEFT]=null;
    team[SIDE.RIGHT]=null;
    return {
      hidden: true,
      team: team,
      boardWidth:100,
      boardHeight:100,
      selectedRefId:null
    };
  },
  componentDidMount: function (){
    var func = this._buildOnSelectedCallback(null);
    this.refs.bg.addEventListener('click', function(e) {
      func();
    }.bind(this));
  },
  render:function(){
    var className='panel-player';
    if (this.state.hidden)className+= " hidden";

    return(
      <div className={className} ref="container" onselectstart="return false;">
        {
          this.state.team[SIDE.LEFT] && this.state.team[SIDE.LEFT].playerList[STATUS.STARTING].map((playerNumber, arrIdx) => (
              <PlayerMarker ref={"l"+ arrIdx}
                number={playerNumber}
                color={this.state.team[SIDE.LEFT].color}
                x={this.state.team[SIDE.LEFT].position[arrIdx][0]}
                y={this.state.team[SIDE.LEFT].position[arrIdx][1]}
                side="left"
                boardWidth={this.state.boardWidth}
                boardHeight={this.state.boardHeight}
                onMouseDown={(this._buildOnSelectedCallback("l"+ arrIdx))}
                container={this.refs.container}
              />
          ))
        }
        {
          this.state.team[SIDE.RIGHT] && this.state.team[SIDE.RIGHT].playerList[STATUS.STARTING].map((playerNumber, arrIdx) => (
              <PlayerMarker ref={"r"+ arrIdx}
                number={playerNumber}
                color={this.state.team[SIDE.RIGHT].color}
                x={this.state.team[SIDE.RIGHT].position[arrIdx][0]}
                y={this.state.team[SIDE.RIGHT].position[arrIdx][1]}
                side="right"
                boardWidth={this.state.boardWidth}
                boardHeight={this.state.boardHeight}
                onMouseDown={(this._buildOnSelectedCallback("r"+ arrIdx))}
                container={this.refs.container}
              />
          ))
        }
        <div className="panel-player-bg" ref="bg"></div>
      </div>
    );
  }
});

module.exports = PanelPlayer;
