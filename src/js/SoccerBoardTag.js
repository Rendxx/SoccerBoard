var React = require('react');
var style = require('../less/SoccerBoardTag.less');
var grassBg = require('../image/grass-bg.png');
var img_grassBg = new Image();
img_grassBg.src = grassBg;

var SoccerBoardTag = React.createClass({
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
  _renderBg:function(){
    var w = this.refs.container.offsetWidth;
    var h = this.refs.container.offsetHeight;

    this.refs.canvas.width = w;
    this.refs.canvas.height = h;
		var ctx = this.refs.canvas.getContext('2d');
    ctx.clearRect(0, 0, w, h);

    //ctx.fillStyle = "#eeeeee";
    ctx.beginPath();

    ctx.translate(-120, -120);
    ctx.rotate(Math.PI/12);

    ctx.fillStyle = ctx.createPattern(img_grassBg, 'repeat');
    ctx.fillRect(0, 0, w*4, h*4);

    ctx.rotate(-Math.PI/12);
    ctx.translate(30, 30);
    ctx.closePath();
  },

  /* React Method *********************************************************************/
  getInitialState: function() {
    return {
      hide: false,
      hover: false
    };
  },
  componentDidMount:function(){
    this._renderBg();
  },
  render:function(){
    var className = "soccerBoardTag";
    if (this.state.hide) className+=" hidden";
    else if (this.state.hover) className+=" hover";
    return(
      <div className={className} ref="container">
        <span>SOCCER BOARD</span>
        <canvas ref="canvas"></canvas>
        <div className="dot"></div>
      </div>
    );
  }
});

module.exports = SoccerBoardTag;
