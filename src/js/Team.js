var React = require('react');
var PlayerItem = require('./PlayerItem.js');
var style = require('../less/Team.less');

var Team = React.createClass({
  loadPlayer:function(teamDat){
    this.setState({
      name:teamDat.name||"",
      info:teamDat.info||[],
      starting:teamDat.starting||[],
      bench:teamDat.bench||[],
      rest:teamDat.rest||[]
    });
  },
  getInitialState: function() {
    return {
      name:"",
      info:[],
      starting:[],
      bench:[],
      rest:[]
    };
  },
  componentDidMount: function (){
  },
  render:function(){
    var className = "team";
    if (this.props.posAlign==="left") className+=" left";
    else  className+=" right";
    var textAlign;
    if (this.props.textAlign==="left") textClass="left";
    else if (this.props.textAlign==="right") textClass="right";
    else textAlign=(this.props.posAlign==="left")?"right":"left";

    return(
      <div className={className}>
        <div className="team-name"><span>{this.state.name}</span> </div>
        <div className="player-starting">{
          this.state.starting.map((number) => (
              <PlayerItem number={number} name={this.state.info[number].name} status="starting" textAlign={textAlign} />
          ))
        }</div>
        <div className="player-bench">{
          this.state.bench.map((number) => (
              <PlayerItem number={number} name={this.state.info[number].name} status="bench" textAlign={textAlign} />
          ))
        }</div>
        <div className="player-rest">{
          this.state.rest.map((number) => (
              <PlayerItem number={number} name={this.state.info[number].name} status="rest" textAlign={textAlign} />
          ))
        }</div>
      </div>
    );
  }
});

module.exports = Team;
