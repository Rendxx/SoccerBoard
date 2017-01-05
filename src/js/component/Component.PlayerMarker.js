require('LESS/Component.PlayerMarker.less');
var React = require('react');
var Util = require('JS/Util.js');

var PlayerMarker = React.createClass({
  /* Public Method *********************************************************************/
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
  select: function (){
    this.setState({
      selected: true
    });
  },
  unselect: function (){
    this.setState({
      selected: false
    });
  },

  /* Private Method *********************************************************************/
  _getStyle: function (){
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
      left: y+"px"
    };
  },
  _getFrontStyle:function (){
    var x_ratio = this.state.x/100;
    if (this.state.side==="right"){
      x_ratio=1-x_ratio;
    }
    var x = ~~(x_ratio*this.state.boardHeight);

    return {
      zIndex: x+10
    };
  },
  _mouseDown: function (e){
    var mousePos = Util.getMousePos(e, this.props.container);
    this.setState({
      dragging:true,
      moveOffset:[
        mousePos[0]/this.state.boardWidth*100-(this.state.side==="right"?100-this.state.y:this.state.y),
        mousePos[1]/this.state.boardHeight*100-(this.state.side==="right"?100-this.state.x:this.state.x)
      ]
    });
    this.props.onMouseDown&&this.props.onMouseDown();
  },
  _mouseMove: function (e){
    if (!this.state.dragging) return false;
    var mousePos = Util.getMousePos(e, this.props.container);
    var pos = [
      mousePos[0]/this.state.boardWidth*100-this.state.moveOffset[0],
      mousePos[1]/this.state.boardHeight*100-this.state.moveOffset[1]
    ];

    console.log(mousePos);

    if (this.state.side==="right"){
      pos[0]=100-pos[0];
      pos[1]=100-pos[1];
    }
    this.setState({
      x:Math.max(Math.min(pos[1],100),0),
      y:Math.max(Math.min(pos[0],100),0)
    });
  },
  _mouseUp: function (e){
    this.setState({
      dragging:false,
      moveOffset:[0,0]
    });
  },

  /* React Method *********************************************************************/
  getInitialState: function() {
    return {
      dragging: false,
      selected: false,
      number: this.props.number,
      color: this.props.color,
      x:this.props.x || 0,
      y:this.props.y || 0,
      boardWidth: this.props.boardWidth ||100,
      boardHeight: this.props.boardHeight ||100,
      side: this.props.side || "left",
      moveOffset:[0,0]
    };
  },
  componentDidMount: function (){
    document.body.addEventListener('mousemove', this._mouseMove);
    document.body.addEventListener('mouseup', this._mouseUp);
    document.body.addEventListener('mouseout', function(e) {
        e = e ? e : window.event;
        var from = e.relatedTarget || e.toElement;
        if (!from || from.nodeName == "HTML") {
            this._mouseUp(e);
        }
    }.bind(this));
  },
  render:function(){
    var className = "playerMarker";
    if (this.state.dragging) className+=" dragging";
    if (this.state.selected) className+=" selected";

    return(
      <div className={className} style={this._getStyle()} onselectstart="return false;"
        onMouseDown={this._mouseDown}>
        <div className="front" style={this._getFrontStyle()}>
          <div className="number">{this.state.number}</div>
          <div className="cloth-cover"></div>
          <div className="cloth-border"></div>
          <div className="cloth-dark"></div>
          <div className="cloth-color" style={{color: this.state.color}}></div>
          <div className="shadow"></div>
        </div>
        <div className="back">
          <div className="circle"></div>
        </div>
      </div>
    );
  }
});

module.exports = PlayerMarker;
