require('LESS/Team.PlayerItem.less');
var React = require('react');

var PlayerItem = React.createClass({
  /* Public Method *********************************************************************/

  /* Private Method *********************************************************************/

  /* React Method *********************************************************************/
  componentDidMount: function (){
  },
  render:function(){
    var className = "playerItem ";
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

module.exports = PlayerItem;
