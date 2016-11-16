var React = require('react');
var style = require('../less/StartScreen.less');

var StartScreen = React.createClass({
  getInitialState: function() {
    return {
      show:true,
      instruction:[
        'Drag player',
        'Draw lines to show your tactic',
        'Edit your team'
      ]
    };
  },
  buildInstruction: function (){
    return {__html:this.state.instruction.map(function(str){return '<span>'+str+'</span>';}).join('')};
  },
  hide:function(){
    this.state.show=false;
  },
  render:function(){
    var className = "startScreen";
    if (!this.state.show) className+=" hidden";
    return(
      <div className={className} onClick={this.start}>
        <div className="instruction" dangerouslySetInnerHTML={this.buildInstruction()} />
      </div>
    );
  }
});

module.exports = StartScreen;
