var React = require('react');
var $ = require('jQuery');

var SoccerBoard = React.createClass({
  getInitialState: function (){
    return {
      fieldStyle:{
        field: 'default',
        top: 'default',
        stands: 'default',
        grass: 'default'
      }
    };
  },
  componentDidMount: function (){
  },
  render:function(){
    return(
      <div className="soccerField {this.state.fieldStyle.field}">
        <div className="top {this.state.fieldStyle.top}"></div>
        <div className="stands {this.state.fieldStyle.stands}"></div>
        <div className="board"></div>
        <div className="grass {this.state.fieldStyle.grass}"></div>
      </div>
    );
  }
});

module.exports = Field;
