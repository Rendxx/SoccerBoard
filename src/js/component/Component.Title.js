require('LESS/Component.Title.less');
var React = require('react');

var Title = React.createClass({
  /* Public Method *********************************************************************/

  /* Private Method *********************************************************************/
  _getStyle: function (){
    let style={
      'margin-top':(this.props.margin||0)+'px'
    };
    if (this.props.hasOwnProperty('width')) {
        style.width=this.props.width;
        style.marginLeft=-(this.props.width>>1)+'px';
        style.left='50%';
    }
    if (this.props.hasOwnProperty('height')) {
        style.height=this.props.height+'px';
        style.lineHeight=this.props.height+'px';
        style.top=-this.props.height+'px';
    }
    if (this.props.hasOwnProperty('top')) style.top=this.props.top+'px';
    return style;
  },

  /* React Method *********************************************************************/
  render:function(){
    return(
      <div className="__component_title" style={this._getStyle()}>
          <div className="__component_inner">{this.props.content}</div>
      </div>
    );
  }
});

module.exports = Title;
