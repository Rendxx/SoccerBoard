var React = require('react');
var style = require('../less/Header.less');
var img_grass = require('../image/grass-bg.png');

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
    window.removeEventListener("resize", this.renderBg);
    this.renderBg();
  },
  componentWillUnmount: function() {
    window.removeEventListener("resize", this.renderBg);
  },
  renderBg:function(){
    this.refs.canvas.width = this.refs.container.offsetWidth;
    this.refs.canvas.height = this.refs.container.offsetHeight;

  },
  render:function(){
    var className = "header";
    if (this.state.min) className+=" minimize";
    return(
      <div className={className} ref="container">
        <span>SOCCER BOARD</span>
        <canvas ref="canvas">
      </div>
    );
  }
});

module.exports = StartScreen;
