var React = require('react');
var PlayerMarker = require('./PlayerMarker.js');

var style = require('../less/PlayerBoard.less');

var PlayerBoard = React.createClass({
  show:function(){
    this.setState({
      hidden:false
    });
  },
  resize:function(w, h){
    this.refs.playerBoard.style.width = w+"px";
    this.refs.playerBoard.style.height = h+"px";

    if (this.state.teamLeft!=null) for (var i=0;i<this.state.teamLeft.starting.length;i++) this.refs["l"+i].setBoardDimension(w,h);
    if (this.state.teamRight!=null) for (var i=0;i<this.state.teamRight.starting.length;i++) this.refs["r"+i].setBoardDimension(w,h);
    this.setState({
      boardWidth:w,
      boardHeight:h
    });
  },
  getInitialState: function() {
    return {
      hidden: true,
      teamLeft:null,
      teamRight:null,
      boardWidth:100,
      boardHeight:100,
      selectedRefId:null
    };
  },
  loadTeam: function (dat){
    if (!dat) return;
    var s = {};
    if (dat.left) s.teamLeft=dat.left;
    if (dat.right) s.teamRight=dat.right;

    this.setState(s);
  },
  onPlayerSelected: function (refId){

  },
  buildOnSelectedCallback: function(refId){
    var cb = function (){
      if (this.state.selectedRefId!==null) this.refs[this.state.selectedRefId].unselect();
      this.setState({selectedRefId:refId});
    };
    return cb.bind(this);
  },
  render:function(){
    var className='playerBoard';
    if (this.state.hidden)className+= " hidden";

    return(
      <div className={className} ref="playerBoard">
      {
        this.state.teamLeft && this.state.teamLeft.starting.map((playerNumber, arrIdx) => (
            <PlayerMarker ref={"l"+ arrIdx}
              number={playerNumber}
              color={this.state.teamLeft.color}
              x={this.state.teamLeft.position[arrIdx][0]}
              y={this.state.teamLeft.position[arrIdx][1]}
              side="left"
              boardWidth={this.state.boardWidth}
              boardHeight={this.state.boardHeight}
              onSelected={(this.buildOnSelectedCallback("l"+ arrIdx))}
            />
        ))
      }
      {
        this.state.teamRight && this.state.teamRight.starting.map((playerNumber, arrIdx) => (
            <PlayerMarker ref={"r"+ arrIdx}
              number={playerNumber}
              color={this.state.teamRight.color}
              x={this.state.teamRight.position[arrIdx][0]}
              y={this.state.teamRight.position[arrIdx][1]}
              side="right"
              boardWidth={this.state.boardWidth}
              boardHeight={this.state.boardHeight}
              onSelected={(this.buildOnSelectedCallback("r"+ arrIdx))}
            />
        ))
      }
      </div>
    );
  }
});

module.exports = PlayerBoard;
