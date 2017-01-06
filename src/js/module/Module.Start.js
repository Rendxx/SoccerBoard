require('LESS/Module.Start.less');
var React = require('react');
//var BoardTag = require('COMPONENT/Component.BoardTag.js');

var StartModule = React.createClass({
  /* Public Method *********************************************************************/
  resize:function(w, h){
    this.refs.instruction.style.marginLeft = w/2*0.68+40+"px";
    this.refs.sensor.style.width = w*0.8 +'px';
    this.refs.sensor.style.height = h*0.8 +'px';
  },
  hover:function(isHover){
    this.setState({
      hover: isHover
    });
    //this.refs.boardTag.hover(isHover);
  },
  hide:function(){
    this.setState({
      show: false
    });
    //this.refs.boardTag.hide();
  },

  /* Private Method *********************************************************************/
  _transitionEnd:function(){
    if (this.state.show) return;
    this.refs.startModule.style.display = "none";
  },
  _buildInstruction: function (){
    return {__html:this.state.instruction.map(function(str){return '<span>'+str+'</span>';}).join('')};
  },
  /* React Method *********************************************************************/
  getInitialState: function() {
    return {
      show:true,
      hover: false,
      instruction:[
        'Drag player',
        'Draw lines to show your tactic',
        'Edit your team'
      ]
    };
  },
  render:function(){
    var className = "startModule";
    if (!this.state.show) className+=" hidden";
    else if (this.state.hover) className+=" hover";
    return(
      <div className={className} ref="startModule" onClick={this.start} onTransitionEnd={this._transitionEnd}>
        <div className="sensor" ref="sensor" onMouseEnter={this.props.onHover[0]} onMouseLeave={this.props.onHover[1]} onClick={this.props.onStart}></div>
        <div className="instruction" ref="instruction" dangerouslySetInnerHTML={this._buildInstruction()} />
      </div>
    );
  }
});

module.exports = StartModule;
