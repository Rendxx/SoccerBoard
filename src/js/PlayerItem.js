var React = require('react');
var style = require('../less/PlayerItem.less');

var PlayerItem = React.createClass({
  componentDidMount: function (){
  },
  render:function(){
    var className = "playerItem "+this.props.textAlign==="left"?"textLeft":"textRight";
    if (this.props.status=="starting") className+=" starting";
    else if (this.props.status=="bench") className+=" bench";
    else if (this.props.status=="rest") className+=" rest";

    return(
      <div className={className}>
        <div className="number">{this.props.number}</div>
        <div className="name"><span>{this.props.name}</span></div>
      </div>
    );
  }
});

module.exports = Team;
