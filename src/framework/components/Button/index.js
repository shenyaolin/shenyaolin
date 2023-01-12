import React from 'react';
import './index.less';
import classNames from 'classnames';
//
export default class extends React.Component {
  render() {
    const { theme = 'primary', type, block = false, disabled = false, children, style, className, onClick, onTouchStart } = this.props;
    const buttonClassName = classNames(
      'cjm-mobile-button', className,
      `cjm-mobile-button-theme-${theme}`,
      block && 'cjm-mobile-button-block',
      disabled && 'cjm-mobile-button-disabled',
      type && `cjm-mobile-button-type-${type}`
    );
    return (
      <button onClick={disabled ? undefined : onClick} onTouchStart={onTouchStart} style={style} className={buttonClassName}>{children}</button>
    )
  }
}
