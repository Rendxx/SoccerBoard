require('LESS/Module.Soccer.less');
var React = require('react');
var PanelPlayer = require('PANEL/Panel.Player.js');
var PanelDrawing = require('PANEL/Panel.Drawing.js');

var SoccerModule = React.createClass({
  /* Public Method *********************************************************************/
  loadTeam: function (dat){
    if (!dat) return;
    this.refs.panelPlayer.loadTeam(dat);
  },
  resize:function(w, h, w_field, h_field){
    this.refs.soccerModule.style.width = w+"px";
    this.refs.soccerModule.style.height = h+"px";
    this.refs.soccerModule.style.marginTop = -(h>>1)+"px";
    this.refs.soccerModule.style.marginLeft = -(w>>1)+"px";
    this.refs.panelPlayer.resize(w_field, h_field);
    this.refs.panelDrawing.resize(w_field, h_field);
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
    this.refs.panelPlayer.show();
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
      animation:false
    };
  },
  componentDidMount:function(){
      this.refs.panelDrawing.setup(this.refs.drawingSensor);
      this.setState({
        animation:true
      });
  },
  render:function(){
    var class_soccerField='soccerModule ' + this.props.fieldStyle.field;
    if (this.state.animation) class_soccerField+= " animation"
    if (this.state.min){
      class_soccerField+= " minimize"
      if (this.state.hover) class_soccerField+=" hover";
    }
    var class_top='top ' + (this.props.fieldStyle.top?this.props.fieldStyle.top:'');
    var class_stands='stands ' + (this.props.fieldStyle.stands?this.props.fieldStyle.stands:'');
    var class_grass='grass ' + (this.props.fieldStyle.grass?this.props.fieldStyle.grass:'');

    return(
      <div className={class_soccerField} ref="soccerModule" onTransitionEnd={this._transitionEnd} onselectstart="return false;">
        <div className={class_top}></div>
        <div className={class_stands}></div>
        <div className="drawingSensor" ref="drawingSensor"></div>
        <PanelPlayer ref="panelPlayer" />
        <PanelDrawing ref="panelDrawing" />
        <div className={class_grass}></div>
      </div>
    );
  }
});

module.exports = SoccerModule;
