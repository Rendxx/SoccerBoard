var React = require('react');
var Team = require('./Team.js');
var style = require('../less/TeamPanel.less');

var TeamPanel = React.createClass({
  show:function(){
    this.setState({
      hidden:false
    });
  },
  transitionEnd: function(){
    if (this.state.hidden) return;
    this.setState({
      animation:false
    });
  },
  resize:function(w, h){
    this.refs.teamPanel.style.width = w+"px";
    this.refs.teamPanel.style.height = h+"px";
  },
  getInitialState: function() {
    return {
      hidden: true,
      animation:true
    };
  },
  loadTeam: function (dat){
    if (!dat) return;
    if (dat.left)this.refs.teamLeft.loadPlayer(dat.left);
    if (dat.right)this.refs.teamRight.loadPlayer(dat.right);
  },
  render:function(){
    var className='teamPanel';
    if (this.state.hidden)className+= " hidden";
    if (this.state.animation)className+= " animation";

    return(
      <div className={className} ref="teamPanel" onTransitionEnd={this.transitionEnd}>
        <Team ref="teamLeft" posAlign="left" />
        <Team ref="teamRight" posAlign="right" />
      </div>
    );
  }
});

module.exports = TeamPanel;
