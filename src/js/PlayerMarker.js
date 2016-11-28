var React = require('react');
var style = require('../less/PlayerMarker.less');

var PlayerMarker = React.createClass({
  getInitialState: function() {
    return {
      dragging: false,
      x:0,
      y:0,
      boardWidth: 100,
      boardHeight: 100,
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
    var x = ~~(x_ratio*this.state.boardWidth);
    var y = ~~(y_ratio*this.state.boardHeight);

    var css = "top:" + y +"px;"
            + "left:"+ x +"px;";
    return css;
  },
  render:function(){
    var className = "playerMarker";
    if (this.state.dragging) className+=" dragging";

    return(
      <div className={className} style={this.getStyle()}>
        <div className="number">{this.props.number}</div>
        <div className="cloth-border"></div>
        <div className="cloth-dark"></div>
        <div className="cloth-color"></div>
        <div className="shadow"></div>
      </div>
    );
  }
});

module.exports = PlayerMarker;
