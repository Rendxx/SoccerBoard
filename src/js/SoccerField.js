var React = require('react');
var style = require('../less/SoccerField.less');

var SoccerField = React.createClass({
  getInitialState: function() {
    return {
      min: true,
      hover: false
    };
  },
  componentDidMount: function (){
    window.addEventListener("resize", this.updateDimensions);
    this.updateDimensions();
  },
  componentWillUnmount: function() {
    window.removeEventListener("resize", this.updateDimensions);
  },
  updateDimensions:function(){
    var w = this.refs.soccerField.parentNode.offsetWidth-400;
    var h = this.refs.soccerField.parentNode.offsetHeight;
    if (w>h/4*5) w = h/4*5;
    else if (h>w/5*4) h = w/5*4;
    this.refs.soccerField.style.width = w+"px";
    this.refs.soccerField.style.height = h+"px";
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
  },
  render:function(){
    var class_soccerField='soccerField ' + this.props.fieldStyle.field;
    if (this.state.min){
      class_soccerField+= " minimize"
      if (this.state.hover) class_soccerField+=" hover";
    }
    var class_top='top ' + (this.props.fieldStyle.top?this.props.fieldStyle.top:'');
    var class_stands='stands ' + (this.props.fieldStyle.stands?this.props.fieldStyle.stands:'');
    var class_grass='grass ' + (this.props.fieldStyle.grass?this.props.fieldStyle.grass:'');

    return(
      <div className={class_soccerField} ref="soccerField">
        <div className={class_top}></div>
        <div className={class_stands}></div>
        <div className="board"></div>
        <div className={class_grass}></div>
      </div>
    );
  }
});

module.exports = SoccerField;
