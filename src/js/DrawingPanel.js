var React = require('react');
var Drawing = require('../../bower_components/drawing/js/Drawing.min.js');
var style = require('../less/SoccerBoardTag.less');

var DrawingPanel = React.createClass({
  /* Public Method *********************************************************************/
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

  /* Private Method *********************************************************************/
  _render:function(drawingListIdx){
    this.state.ctx.clearRect(0, 0, this.refs.scene.width, this.refs.scene.height);
    for (var i = 0; i <= drawingListIdx; i++) {
        this.state.ctx.drawImage(drawingList[i], 0, 0);
    }
  },

  /* React Method *********************************************************************/
  getInitialState: function() {
    return {
      ctx:null
    };
  },
  componentDidMount:function(){
    this.props.sensor.className = "drawing_sensor";
    this.setState({
      ctx: this.refs.scene.getContext("2d");
    });

    var drawingList=[];
    var _drawing = new $$.Draw.FreeDraw(this.refs.drawingPanel);
    var started = false;
    var _mousedown = function (e) {
        started = true;
        this.props.sensor.className = "drawing_sensor top";
        _drawing.startDrawing({
            strokeStyle: '#555',
            lineWidth: 4,
            lineCap: 'round'
        });
    }.bind(this);
    var _mouseup = function (e) {
        if (!started) return;
        started = false;
        this.props.sensor.className = "drawing_sensor";
        _drawing.stopDrawing();
        var img = _drawing.getImage();
        drawingList.length = ++drawingListIdx;
        drawingList.push(img);
        _drawing.clear();
        this._render(drawingList);
    }.bind(this);

    this.props.sensor.addEventListener('mouseout', _mouseup, false);
    this.props.sensor.addEventListener('mouseup', _mouseup, false);
    this.props.sensor.addEventListener('mousedown', _mousedown, false);
  },
  render:function(){
    var className = "drawingPanel";
    return(
      <div className={className} ref="drawingPanel">
        <canvas className="scene" ref="scene"></canvas>
      </div>
    );
  }
});

module.exports = DrawingPanel;
