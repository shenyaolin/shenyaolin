import React from 'react';
import classNames from 'classnames';
//
export default class extends React.Component {
  render() {
    const { children, style, className } = this.props;
    return (
      <div style={style} className={classNames('cjm-mobile-checkbox-group', className)}>{children}</div>
    )
  }
}
