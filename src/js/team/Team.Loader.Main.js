require('LESS/Component.BoardTag.less');
var React = require('react');

var LoaderMain = React.createClass({
  /* Public Method *********************************************************************/
  show:function(){
    this.setState({
      hide: false
    });
  },
  hide:function(){
    this.setState({
      hide: true
    });
  },

  /* Private Method *********************************************************************/

  /* React Method *********************************************************************/
  getInitialState: function() {
    return {
      hide: false
    };
  },
  componentDidMount:function(){
    this._renderBg();
  },
  render:function(){
    var className = "teamLoader-main";
    if (this.state.hide) className+=" hidden";
    return(
      <div className={className} ref="container">
        <div className="teamLoader-wrap">
          <div className="teamLoader-title">Load Team</div>
          <div className="teamLoader-option teamLoader-option-real"></div>
          <div className="teamLoader-option teamLoader-option-default"></div>
          <div className="teamLoader-option teamLoader-option-no"></div>
        </div>
      </div>
    );
  }
});

module.exports = LoaderMain;
