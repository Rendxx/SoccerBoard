require('LESS/Team.PlayerItem.less');
var React = require('react');

var PlayerItem = React.createClass({
  /* Public Method *********************************************************************/
  setData: function (number, name){
    this.setState({
      number: number,
      name: name
    });
  },
  select: function (){
    this.setState({
      selected: true
    });
  },
  unselect: function (){
    this.setState({
      selected: false
    });
  },
  /* Private Method *********************************************************************/

  /* React Method *********************************************************************/
  getInitialState: function() {
    return {
      name:this.props.name,
      number: this.props.number,
      selected: false
    };
  },
  componentDidMount: function (){
    this.refs.container.addEventListener('click', function(e) {
      this.props.onSelected && this.props.onSelected(this.state.number);
      this.select();
    }.bind(this));
  },
  render:function(){
    var className = "playerItem ";
    if (this.state.selected) className += " selected";
    if (this.props.status=="starting") className+=" starting";
    else if (this.props.status=="bench") className+=" bench";
    else if (this.props.status=="rest") className+=" rest";

    return(
      <div className={className} ref="container">
        <div className="number">{this.state.number}</div>
        <div className="name"><span>{this.state.name}</span></div>
      </div>
    );
  }
});

module.exports = PlayerItem;
