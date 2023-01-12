import React from 'react';
import Group from './Group';
import classNames from 'classnames';
import './index.less';
//
export default class extends React.Component {
  static Group = Group;
  handleChange = () => {
    const {checked, onChange} = this.props;
    onChange && onChange(!checked);
  };

  render() {
    const {checked, children, className, style} = this.props;
    const checkboxClassName = classNames('cjm-mobile-checkbox', checked && 'cjm-mobile-checked', className);
    return (
      <div onClick={this.handleChange} className={checkboxClassName} style={style}>
        <div className="cjm-mobile-checkbox-icon"><i className="check-icon"></i></div>
        <span className="cjm-mobile-checkbox-text">{children}</span>
      </div>
    );
  }
}
