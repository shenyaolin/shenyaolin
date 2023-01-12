import React from 'react';
import classNames from 'classnames';
import './index.less';
//
export default class extends React.Component {
  handleChange = (event) => {
    const { onChange } = this.props;
    const value = event.target.value;
    onChange && onChange(value);
  };
  handleFocus = (event) => {
    const { onFocus, readonly } = this.props;
    if (onFocus) {
      onFocus(event);
    } else if (readonly) {
      event.preventDefault();
      event.target.blur();
      console.log(event);
    }
  };
  handleBlur = (event) => {
    const { onBlur } = this.props;
    if (onBlur) {
      onBlur(event);
    }
  };

  render() {
    const { className, style, type = 'text', value = '', maxLength, placeholder = '请输入', readonly = false, disabled, onClick } = this.props;
    const finalProps = {};
    finalProps.className = classNames('cjm-mobile-form-textarea', className);
    finalProps.placeholder = placeholder;
    finalProps.type = type;
    finalProps.style = style;
    finalProps.maxLength = maxLength;
    finalProps.value = value;
    finalProps.onClick = onClick;
    finalProps.onChange = this.handleChange;
    finalProps.readOnly = readonly || disabled;
    finalProps.onFocus = this.handleFocus;
    finalProps.onBlur = this.handleBlur;
    finalProps.resize = 'none';
    finalProps.rows = 3;
    return (
      <textarea {...finalProps} />
    )
  }
}
