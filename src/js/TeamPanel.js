var React = require('react');
var Team = require('./Team.js');
var style = require('../less/TeamPanel.less');

var TeamPanel = React.createClass({
  show:function(){
    this.setState({
      hidden:false
    });
  },
  updateDimensions:function(){
    var w = Math.max(600,this.refs.soccerField.parentNode.offsetWidth-400);
    var h = this.refs.soccerField.parentNode.offsetHeight;
    if (w>h/4*5) w = h/4*5;
    else if (h>w/5*4) h = w/5*4;
    this.refs.soccerField.style.width = w+"px";
    this.refs.soccerField.style.height = h+"px";
  },
  getInitialState: function() {
    return {
      hidden: true
    };
  },
  loadTeam: function (dat){
    if (!dat) return;
    if (!dat.left)this.refs.teamLeft.loadPlayer(dat.left);
    if (!dat.right)this.refs.teamRight.loadPlayer(dat.right);
  },
  render:function(){
    var className='teamPanel';
    if (this.state.hidden)className+= " hidden";

    return(
      <div className={className} ref="teamPanel">
        <Team ref="teamLeft" posAlign="left" />
        <Team ref="teamRight" posAlign="right" />
      </div>
    );
  }
});

module.exports = TeamPanel;
