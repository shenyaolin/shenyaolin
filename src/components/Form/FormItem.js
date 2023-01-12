import React from 'react';
import classNames from 'classnames';
import './FormItem.less';
//
export default class extends React.Component {
  render() {
    const { label, children, className, style, prop, required, subTitle } = this.props;
    return (
      <div data-prop={prop} className={classNames('cjm-mobile-form-item', className)} style={style}>
        <div className="cjm-mobile-form-item-label">{required && (<i className="cjm-mobile-form-item-require-star">*</i>)}
          <div>{label}</div>
          {subTitle && <div className='cjm-mobile-form-item-subTitle'>{subTitle}</div>}
        </div>
        <div className="cjm-mobile-form-item-content">{children}</div>
      </div>
    )
  }
}