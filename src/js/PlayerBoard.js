var React = require('react');
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

    for (var i=0;i<this.state.teamLeft.length;i++) this.refs["l"+i].setBoardDimension(w,h);
    for (var i=0;i<this.state.teamRight.length;i++) this.refs["r"+i].setBoardDimension(w,h);
  },
  getInitialState: function() {
    return {
      hidden: true,
      teamLeft:[],
      teamRight:[]
    };
  },
  loadTeam: function (dat){
    if (!dat) return;
    var s = {};
    if (dat.left) s.teamLeft=dat.left;
    if (dat.right) s.teamRight=dat.right;

    this.setState(s);
  },
  render:function(){
    var className='playerBoard';
    var idx = 0;
    if (this.state.hidden)className+= " hidden";

    return(
      <div className={className} ref="playerBoard">
      {
        this.state.left.map((player) => (
            <PlayerMarker ref={"l"+ idx++} number={player.number} color={player.color} x={player.x} y={player.y}/>
        ))
        idx=0;
        this.state.right.map((player) => (
            <PlayerMarker ref={"r"+ idx++} number={player.number} color={player.color} x={player.x} y={player.y}/>
        ))
      }
      </div>
    );
  }
});

module.exports = PlayerBoard;
