require('LESS/Team.Loader.Main.less');
var React = require('react');
var Title = require('COMPONENT/Component.Title.js');

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
      hide: true
    };
  },
  componentDidMount:function(){
    this.refs.container.addEventListener('click', function(e) {
      this.hide();
    }.bind(this));
  },
  render:function(){
    var className = "teamLoader-main";
    if (this.state.hide) className+=" hidden";
    return(
      <div className={className} ref="container">
        <div className="teamLoader-wrap">
          <Title content="Choose a Team" width="500" margin="-2" />
          <div className="teamLoader-option teamLoader-option-real"></div>
          <div className="teamLoader-option teamLoader-option-default"></div>
          <div className="teamLoader-option teamLoader-option-no"></div>
        </div>
      </div>
    );
  }
});

module.exports = LoaderMain;
