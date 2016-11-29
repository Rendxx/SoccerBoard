var React = require('react');
var PlayerBoard = require('./PlayerBoard.js');

var style = require('../less/SoccerField.less');

var SoccerField = React.createClass({
  /* Public Method *********************************************************************/
  loadTeam: function (dat){
    if (!dat) return;
    this.refs.playerBoard.loadTeam(dat);
  },
  resize:function(w, h, w_field, h_field){
    this.refs.soccerField.style.width = w+"px";
    this.refs.soccerField.style.height = h+"px";
    this.refs.playerBoard.resize(w_field, h_field);
  },
  hover:function(isHover){
    this.setState({
      hover: isHover
    });
  },
  expand:function(){
    this.setState({
      min: false
    });
    this.refs.playerBoard.show();
  },

  /* Private Method *********************************************************************/
  _transitionEnd: function(){
    if (this.state.min) return;
    this.setState({
      animation:false
    });
  },
  /* React Method *********************************************************************/
  getInitialState: function() {
    return {
      min: true,
      hover: false,
      animation:true
    };
  },
  render:function(){
    var class_soccerField='soccerField ' + this.props.fieldStyle.field;
    if (this.state.animation) class_soccerField+= " animation"
    if (this.state.min){
      class_soccerField+= " minimize"
      if (this.state.hover) class_soccerField+=" hover";
    }
    var class_top='top ' + (this.props.fieldStyle.top?this.props.fieldStyle.top:'');
    var class_stands='stands ' + (this.props.fieldStyle.stands?this.props.fieldStyle.stands:'');
    var class_grass='grass ' + (this.props.fieldStyle.grass?this.props.fieldStyle.grass:'');

    return(
      <div className={class_soccerField} ref="soccerField" onTransitionEnd={this._transitionEnd}>
        <div className={class_top}></div>
        <div className={class_stands}></div>
        <PlayerBoard ref="playerBoard" />
        <div className={class_grass}></div>
      </div>
    );
  }
});

module.exports = SoccerField;
