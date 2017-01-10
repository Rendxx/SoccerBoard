require('LESS/Team.Pad.less');
var React = require('react');
var Util = require('JS/Util.js');
var PlayerItem = require('TEAM/Team.PlayerItem.js');
var STATUS=require('TEAM/Team.STATUS.js');
var SIDE = require('TEAM/Team.SIDE.js');

var TeamPad = React.createClass({
  /* Public Method *********************************************************************/
  loadPlayer:function(teamDat){
    var playerList = {};
    playerList[STATUS.STARTING] = teamDat.starting||[];
    playerList[STATUS.BENCH] = teamDat.bench||[];
    playerList[STATUS.REST] = teamDat.rest||[];
    this.setState({
      name:teamDat.name||"",
      info:teamDat.info||[],
      playerList:teamDat.playerList
    });
  },
  setPosition:function(margin){
    if (margin==null) return;
    this.refs.container.style.marginLeft = (margin.hasOwnProperty('left')&&margin.left!=null)?margin.left+"px":'auto';
    this.refs.container.style.marginRight = (margin.hasOwnProperty('right')&&margin.right!=null)?margin.right+"px":'auto';
    this.refs.container.style.marginTop =  (margin.hasOwnProperty('top')&&margin.top!=null)?margin.top+"px":'auto';
  },
  getPlayerList:function(){
      return this.state.playerList;
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
    if (this.state.selectedIdx!==null) {
        this._playerUnselect(this.state.selectedIdx);
    }
  },

  /* Private Method *********************************************************************/
  _idxEqual: function (idx1, idx2){
    if (idx1==idx2) return true;
    if (idx1==null||idx2==null) return false;
    return (idx1[0]===idx2[0]&&idx1[1]===idx2[1]);
  },
  _playerUnselect : function (idx){
      this.refs[this._itemIdx(idx[0],idx[1])].unselect();
      this.setState({
          selectedIdx:null
      });
  },
  _onPlayerSelect:function(idx){
      if (this.state.selectedIdx===null){
          this.setState({
              selectedIdx:idx
          });
      }else if (this._idxEqual(idx,this.state.selectedIdx)){
          this._playerUnselect(idx);
          this.setState({
              selectedIdx:null
          });
      } else {
          var idx1 = this.state.selectedIdx;
          var num1 = this.state.playerList[idx1[0]][idx1[1]];
          var num2 = this.state.playerList[idx[0]][idx[1]];
          this.state.playerList[idx1[0]][idx1[1]] = num2;
          this.state.playerList[idx[0]][idx[1]] = num1;
          this.refs[this._itemIdx(idx1[0],idx1[1])].setData(num2,this.state.info[num2].name);
          this.refs[this._itemIdx(idx[0],idx[1])].setData(num1,this.state.info[num1].name);
          this._playerUnselect(idx);
          this._playerUnselect(idx1);
          this.setState({
              selectedIdx:null,
              playerList:this.state.playerList
          });
          this.props.onChanged(this.props.side);
      }
  },

  _itemIdx:function(status,idx){
      return 'item_'+status+'_'+idx;
  },

  /* React Method *********************************************************************/
  getInitialState: function() {
    var playerList = {};
    playerList[STATUS.STARTING] = [];
    playerList[STATUS.BENCH] = [];
    playerList[STATUS.REST] = [];
    return {
      name:"",
      selected: false,
      info:[],
      playerList:playerList,
      selectedIdx: null,
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
    if (this.props.side===SIDE.LEFT) className+=" left";
    else  className+=" right";
    var textAlign=(this.props.side===SIDE.LEFT)?"right":"left";
    var nameClass="teamPad-name "+(textAlign==="left"?"textLeft":"textRight");

    return(
      <div className={className} ref="container">
        <div className="teamPad-cover"></div>
        <div className={nameClass}><span>{this.state.name}</span> </div>
        <div className={"player-starting "+(textAlign==="left"?"textLeft":"textRight")} ref="starting">{
          this.state.playerList[STATUS.STARTING].map((number, idx) => (
              <PlayerItem idx={[STATUS.STARTING,idx]} number={number} name={this.state.info[number].name} ref={this._itemIdx(STATUS.STARTING,idx)} onSelected={this._onPlayerSelect} />
          ))
        }</div>
        <div className={"player-bench "+(textAlign==="left"?"textLeft":"textRight")} ref="bench">{
          this.state.playerList[STATUS.BENCH].map((number, idx) => (
              <PlayerItem idx={[STATUS.BENCH,idx]} number={number} name={this.state.info[number].name} ref={this._itemIdx(STATUS.BENCH,idx)} onSelected={this._onPlayerSelect} />
          ))
        }</div>
        <div className={"player-rest "+(textAlign==="left"?"textRight":"textLeft")} ref="rest">{
          this.state.playerList[STATUS.REST].map((number, idx) => (
              <PlayerItem idx={[STATUS.REST,idx]} number={number} name={this.state.info[number].name} ref={this._itemIdx(STATUS.REST,idx)} onSelected={this._onPlayerSelect} />
          ))
        }</div>
      </div>
    );
  }
});

module.exports = TeamPad;
