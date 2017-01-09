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
  setPosition:function(margin){
    if (margin==null) return;
    this.refs.container.style.marginLeft = (margin.hasOwnProperty('left')&&margin.left!=null)?margin.left+"px":'auto';
    this.refs.container.style.marginRight = (margin.hasOwnProperty('right')&&margin.right!=null)?margin.right+"px":'auto';
    this.refs.container.style.marginTop =  (margin.hasOwnProperty('top')&&margin.top!=null)?margin.top+"px":'auto';
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
  _onPlayerSelect:function(number){
      if (this.state.selectedNumber===-1){
          this.setState({
              selectedNumber:number
          });
      }else{

      }
  },

  /* React Method *********************************************************************/
  getInitialState: function() {
    return {
      name:"",
      selected: false,
      info:[],
      starting:[],
      bench:[],
      rest:[],
      selectedNumber: -1,
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
    if (this.state.selected) className += " selected";
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
              <PlayerItem number={number} name={this.state.info[number].name} status="starting" onSelected={this._onPlayerSelect} />
          ))
        }</div>
        <div className={"player-bench "+(textAlign==="left"?"textLeft":"textRight")} ref="bench">{
          this.state.bench.map((number) => (
              <PlayerItem number={number} name={this.state.info[number].name} status="bench" onSelected={this._onPlayerSelect} />
          ))
        }</div>
        <div className={"player-rest "+(textAlign==="left"?"textRight":"textLeft")} ref="rest">{
          this.state.rest.map((number) => (
              <PlayerItem number={number} name={this.state.info[number].name} status="rest" onSelected={this._onPlayerSelect} />
          ))
        }</div>
      </div>
    );
  }
});

module.exports = TeamPad;
