var React = require('react');
var style = require('../less/Header.less');

var Header = React.createClass({
  getInitialState: function() {
    return {
      min: false
    };
  },
  minimize:function(){
    this.state.min=true;
  },
  componentDidMount:function(){
    window.addEventListener("resize", this.renderBg);
    this.renderBg();
  },
  componentWillUnmount: function() {
    window.removeEventListener("resize", this.renderBg);
  },
  renderBg:function(){
    var w = this.refs.container.offsetWidth;
    var h = this.refs.container.offsetHeight;

    this.refs.canvas.width = w;
    this.refs.canvas.height = h;
		var ctx = this.refs.canvas.getContext('2d');
    ctx.clearRect(0, 0, w, h);

    ctx.fillStyle = "#eeeeee";
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(w/4,0);
    ctx.lineTo(w/4-10, h);
    ctx.lineTo(0, h);
    ctx.closePath();
    ctx.fill();

    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(w/4, -10);
    ctx.lineTo(w/4-10,h+10);
    ctx.closePath();
    ctx.stroke();
  },
  render:function(){
    var className = "header";
    if (this.state.min) className+=" minimize";
    return(
      <div className={className} ref="container">
        <span>SOCCER BOARD</span>
        <canvas ref="canvas"></canvas>
      </div>
    );
  }
});

module.exports = Header;
