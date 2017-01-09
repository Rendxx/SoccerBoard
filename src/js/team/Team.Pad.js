require('LESS/Team.Pad.less');
var React = require('react');
var Util = require('JS/Util.js');
var PlayerItem = require('TEAM/Team.PlayerItem.js');

var TeamPad = React.createClass({
  /* Public Method *********************************************************************/
  loadPlayer:function(teamDat){
    this.setState({
      name:teamDat.name||"",
      info:teamDat.info||[],
      starting:teamDat.starting||[],
      bench:teamDat.bench||[],
      rest:teamDat.rest||[]
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
      name:"",
      selected: false,
      info:[],
      starting:[],
      bench:[],
      rest:[]
    };
  },
  componentDidMount: function (){
    this.refs.container.addEventListener('click', function(e) {
      this.props.onSelected && this.props.onSelected();
      this.select();
    }.bind(this));
  },
  render:function(){
    var className = "teamPad";
    if (this.props.selected) className += " selected";
    if (this.props.posAlign==="left") className+=" left";
    else  className+=" right";
    var textAlign;
    if (this.props.textAlign==="left") textAlign="left";
    else if (this.props.textAlign==="right") textAlign="right";
    else textAlign=(this.props.posAlign==="left")?"right":"left";
    var nameClass="teamPad-name "+(textAlign==="left"?"textLeft":"textRight");

    return(
      <div className={className} ref="container">
        <div className={nameClass}><span>{this.state.name}</span> </div>
        <div className={"player-starting "+(textAlign==="left"?"textLeft":"textRight")} ref="starting">{
          this.state.starting.map((number) => (
              <PlayerItem number={number} name={this.state.info[number].name} status="starting" />
          ))
        }</div>
        <div className={"player-bench "+(textAlign==="left"?"textLeft":"textRight")} ref="bench">{
          this.state.bench.map((number) => (
              <PlayerItem number={number} name={this.state.info[number].name} status="bench" />
          ))
        }</div>
        <div className={"player-rest "+(textAlign==="left"?"textRight":"textLeft")} ref="rest">{
          this.state.rest.map((number) => (
              <PlayerItem number={number} name={this.state.info[number].name} status="rest" />
          ))
        }</div>
      </div>
    );
  }
});

module.exports = TeamPad;
