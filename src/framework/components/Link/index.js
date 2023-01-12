import React from 'react';
import {pushUrl} from 'framework/utils/url'
import {isWxMiniProgram} from 'framework/config'
//
const url = require('url');
//
export default class extends React.Component {

  getRealHref = () => {
    const localPath = window.location.hash.replace(/^#/, '').split('?')[0];
    const {href} = this.props;
    const path = url.resolve(localPath, href || '');
    return `#${path}`;
  };
  handleClick = (event) => {
    const {onClick} = this.props;
    if (onClick) {
      onClick(event);
    } else if (isWxMiniProgram()) {
      event.preventDefault();
      window.wx.miniProgram.navigateTo({url: `index?src=${encodeURIComponent(this.getRealHref())}`});
    }
  };

  render() {
    const {target, title, style, className, children} = this.props;
    const finalProps = {target, title, style, className};
    finalProps.href = this.getRealHref();
    return (
      <a {...finalProps} onClick={this.handleClick}>{children}</a>
    )
  }
}
