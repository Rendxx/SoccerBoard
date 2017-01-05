require('LESS/Panel.Drawing.less');
var React = require('react');
var Drawing = require('BOWER/drawing/js/Drawing.min.js');

var widthRatio = 0.01;

var PanelDrawing = React.createClass({
  /* Public Method *********************************************************************/
  setup:function(sensor){
    sensor.className = "drawingSensor";

    var drawingList=[];
    var _drawing = new $$.Draw.FreeDraw(this.refs.self);
    var started = false;
    var _mousedown = function (e) {
        started = true;
        sensor.className = "drawingSensor top";
        _drawing.startDrawing({
            strokeStyle: '#555',
            lineWidth: this.state.width*widthRatio,
            lineCap: 'round'
        });
    }.bind(this);
    var _mouseup = function (e) {
        if (!started) return;
        started = false;
        sensor.className = "drawingSensor";
        _drawing.stopDrawing();
        var img = _drawing.getImage();
        drawingList.length = ++drawingListIdx;
        drawingList.push(img);
        _drawing.clear();
        this._render(drawingList);
    }.bind(this);

    sensor.addEventListener('mouseout', _mouseup, false);
    sensor.addEventListener('mouseup', _mouseup, false);
    sensor.addEventListener('mousedown', _mousedown, false);
    this.setState({
      setuped: true
    });
  },
  hover:function(isHover){
    this.setState({
      hover: isHover
    });
  },
  hide:function(){
    this.setState({
      hide: true
    });
  },
  resize:function(w, h){
    this.refs.self.style.width = w+"px";
    this.refs.self.style.height = h+"px";
    this.refs.self.style.marginTop = -(h>>1)+"px";
    this.refs.self.style.marginLeft = -(w>>1)+"px";
    this.setState({
      width: w,
      height: h
    });
    this._render();
  },

  /* Private Method *********************************************************************/
  _render:function(drawingListIdx){
    if (!this.state.setuped) return;
    this.state.ctx.clearRect(0, 0, this.refs.scene.width, this.refs.scene.height);
    for (var i = 0; i <= drawingListIdx; i++) {
        this.state.ctx.drawImage(drawingList[i], 0, 0, this.state.width, this.state.height);
    }
  },

  /* React Method *********************************************************************/
  getInitialState: function() {
    return {
      setuped:false,
      ctx:null,
      width:400,
      height:300
    };
  },
  componentDidMount:function(){
    this.setState({
      ctx: this.refs.scene.getContext("2d")
    });
  },
  render:function(){
    var className = "panel-drawing";
    return(
      <div className={className} ref="self">
        <canvas className="scene" ref="scene" width={this.state.width} height={this.state.height}></canvas>
      </div>
    );
  }
});

module.exports = PanelDrawing;
