var React = require('react');
var style = require('../less/PlayerMarker.less');

var PlayerMarker = React.createClass({
  getInitialState: function() {
    return {
      dragging: false,
      number: this.props.number,
      color: this.props.color,
      x:this.props.x || 0,
      y:this.props.y || 0,
      boardWidth: this.props.boardWidth ||100,
      boardHeight: this.props.boardHeight ||100,
      side: this.props.side || "left",
    };
  },
  componentDidMount: function (){
  },
  setBoardDimension: function (boardWidth, boardHeight){
    this.setState({
      boardWidth: boardWidth,
      boardHeight: boardHeight
    });
  },
  move: function (x, y){
    this.setState({
      x: x,
      y: y
    });
  },
  getStyle: function (){
    var x_ratio = this.state.x/100;
    var y_ratio = this.state.y/100;
    if (this.state.side==="right"){
      x_ratio=1-x_ratio;
      y_ratio=1-y_ratio;
    }
    var x = ~~(x_ratio*this.state.boardHeight);
    var y = ~~(y_ratio*this.state.boardWidth);

    return {
      top: x+"px",
      left: y+"px",
      zIndex: x
    };
  },
  render:function(){
    var className = "playerMarker";
    if (this.state.dragging) className+=" dragging";

    return(
      <div className={className} style={this.getStyle()} onselectstart="return false;">
        <div className="number">{this.state.number}</div>
        <div className="cloth-border"></div>
        <div className="cloth-dark"></div>
        <div className="cloth-color" style={{color: this.state.color}}></div>
        <div className="shadow"></div>
      </div>
    );
  }
});

module.exports = PlayerMarker;
