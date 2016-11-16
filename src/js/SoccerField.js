var React = require('react');

var SoccerBoard = React.createClass({
  componentDidMount: function (){
  },
  render:function(){
    return(
      <div className="soccerField {this.props.fieldStyle.field}">
        <div className="top {this.props.fieldStyle.top}"></div>
        <div className="stands {this.props.fieldStyle.stands}"></div>
        <div className="board"></div>
        <div className="grass {this.props.fieldStyle.grass}"></div>
      </div>
    );
  }
});

module.exports = Field;
