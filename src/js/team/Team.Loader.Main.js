require('LESS/Component.BoardTag.less');
var React = require('react');

var LoaderMain = React.createClass({
  /* Public Method *********************************************************************/
  show:function(){
    this.setState({
      hide: false
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
      hide: false
    };
  },
  componentDidMount:function(){
    this._renderBg();
  },
  render:function(){
    var className = "teamLoader-main";
    if (this.state.hide) className+=" hidden";
    return(
      <div className={className} ref="container">
        <div className="title">Load Team</div>
        <div className="team-option team-option-real"></div>
        <div className="team-option team-option-default"></div>
        <div className="team-option team-option-no"></div>
      </div>
    );
  }
});

module.exports = LoaderMain;
