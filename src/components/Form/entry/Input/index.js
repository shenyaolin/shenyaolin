import React from 'react';
import classNames from 'classnames';
import './index.less';
//
export default class extends React.Component {
  handleChange = (event) => {
    const {onChange} = this.props;
    const value = event.target.value;
    onChange && onChange(value);
  };
  handleFocus = (event) => {
    const {onFocus, readonly} = this.props;
    this.toggleKeyboard();
    if (onFocus) {
      onFocus(event);
    } else if (readonly) {
      event.preventDefault();
      event.target.blur();
      // console.log(event);
    }
  };

  toggleKeyboard = () => {
    window.setTimeout(() => {
      document.activeElement.scrollIntoView(true);
    }, 50);
  }

  blur = () => {
    const {onBlur} = this.props;
    window.scroll(0, 0);
    onBlur && onBlur();
  }

  render() {
    const {className, style, type = 'text', value = '', placeholder = '请输入', readonly = false, disabled, onClick, onBlur} = this.props;
    const finalProps = {};
    finalProps.className = classNames('cjm-mobile-form-input', className);
    finalProps.placeholder = placeholder;
    finalProps.type = type;
    finalProps.style = style;
    finalProps.value = value;
    finalProps.onClick = onClick;
    finalProps.onChange = this.handleChange;
    finalProps.readOnly = readonly || disabled;
    finalProps.onFocus = this.handleFocus;
    return (
      <input {...finalProps} onBlur={this.blur}/>
    )
  }
}
