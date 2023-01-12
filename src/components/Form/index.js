import React from 'react';
import './index.less';
import classNames from 'classnames';
import FormItem from './FormItem';
import allRules from './rules';
import _ from 'lodash';
//
export default class extends React.Component {
  static FormItem = FormItem;
  static rules = allRules;

  errFormat = (err) => {
    if (err) {
      console.log(err)
      if (typeof err === 'string') {
        return new Error(err);
      } else if (typeof err === 'object' && err.message) {
        return new Error(err.message);
      }
    }
    return null;
  };

  getMessageStr = (msg) => {
    if (typeof msg === 'object' && msg.message) {
      return msg.message;
    }
    return msg;
  };

  getFormItems = (source) => {
    let results = [];
    if (Array.isArray(source)) {
      source.forEach(item => {
        if (item) {
          if (item.type === FormItem) {
            results.push(item);
          } else if (Array.isArray(item)) {
            results = results.concat(this.getFormItems(item));
          } else {
            const children = _.get(item, 'props.children') || [];
            let childSource = [];
            if (Array.isArray(children)) {
              childSource = children;
              const childrenFormItems = this.getFormItems(childSource);
              results = [...results, ...childrenFormItems];
            } else if (typeof children === 'object' && children.type === FormItem) {
              results.push(children);
            }
          }
        }
      });
    }
    else if (typeof (source) == 'object' && source.props && source.props.prop) {
      results.push(source);
    }
    return results;
  };

  getLabel = (prop) => {
    const { children } = this.props;
    const formItems = this.getFormItems(children);
    let label = '';
    formItems.forEach(item => {
      if (!label && item.props.prop === prop) {
        label = item.props.label;
      }
    });
    return label;
  };

  validateField = async (key) => {
    const { model, rules } = this.props;
    const rule = rules[key];
    const value = model[key];
    let errMsg = null;
    await Promise.all(rule.map(item => {
      return new Promise(resolve => {
        item.validator(item, value, (err) => {
          if (!errMsg && err) {
            const label = this.getLabel(key);
            errMsg = this.getMessageStr(err);
            errMsg = label ? `${label}: ${errMsg}` : errMsg;
            resolve(errMsg);
          } else {
            resolve();
          }
        });
      })
    }));
    return errMsg;
  };

  validate = async () => {
    const { rules } = this.props;
    let errMsg = null;
    for (let key in rules) {
      if (!errMsg) {
        errMsg = await this.validateField(key);
      }
    }
    return this.errFormat(errMsg);
  };

  render() {
    const { children, className, style } = this.props;
    return (
      <div className={classNames('cjm-mobile-form', className)} style={style}>{children}</div>
    )
  }
}
