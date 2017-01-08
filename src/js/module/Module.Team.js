require('LESS/Module.Team.less');
var React = require('react');
var Team = require('TEAM/Team.Pad.js');

var TeamModule = React.createClass({
  /* Public Method *********************************************************************/
  show:function(){
    this.setState({
      hidden:false
    });
  },
  loadTeam: function (dat){
    if (!dat) return;
    if (dat.left)this.refs.teamLeft.loadPlayer(dat.left);
    if (dat.right)this.refs.teamRight.loadPlayer(dat.right);
  },
  resize:function(w, h, w_border, h_border){
    this.refs.inner.style.width = w+"px";
    this.refs.inner.style.height = h_border+"px";
    this.refs.inner.style.marginLeft = -(~~(w/2))+"px";
    this.refs.inner.style.marginTop = -(~~(h_border/2))+"px";
  },

  /* Private Method *********************************************************************/
  _transitionEnd: function(){
    if (this.state.hidden) return;
    this.setState({
      animation:false
    });
  },

  /* React Method *********************************************************************/
  getInitialState: function() {
    return {
      hidden: true,
      animation:true
    };
  },
  render:function(){
    var className='teamModule';
    if (this.state.hidden)className+= " hidden";
    if (this.state.animation)className+= " animation";

    return(
      <div className={className} ref="container" onTransitionEnd={this._transitionEnd}>
          <div className="innerWrap" ref="inner" >
            <Team ref="teamLeft" posAlign="left" />
            <Team ref="teamRight" posAlign="right" />
          </div>
      </div>
    );
  }
});

module.exports = TeamModule;
