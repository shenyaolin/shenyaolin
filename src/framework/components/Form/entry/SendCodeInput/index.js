import React from 'react';
import Input from '../Input';
import classNames from 'classnames';
import {sendCode, getSendSeconds} from 'framework/utils/sendSmsCode';
import native from 'framework/common/native';

import './index.less';

const { showToast } = native;
//
export default class extends React.Component {
  state = {
    sendSeconds: 0
  };

  handleSendClick = async () => {
    const { value: v, onSendCode } = this.props;
    const value = Number(v);
    const reg2 = /^1[3|4|5|6|7|8|9]\d{9}$/;
    if(reg2.test(value)) {
      await sendCode(value);
      await onSendCode && onSendCode(value);
    } else {
      showToast('请输入正确的手机号');
    }
  };

  componentWillMount() {
    const setSec = () => {
      const sec = getSendSeconds();
      const {sendSeconds} = this.state;
      if (sec > 0) {
        this.setState({sendSeconds: sec});
      } else if (sendSeconds > 0) {
        this.setState({sendSeconds: 0});
      }
    };
    this.interval = setInterval(setSec, 1000);
    setSec();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const {placeholder, value, onChange, className, style} = this.props;
    const {sendSeconds} = this.state;
    return (
      <div className={classNames('cjm-mobile-send-code-input-wrap', className)} style={style}>
        <div className="cjm-mobile-send-code-input">
          <Input placeholder={placeholder} value={value} onChange={onChange}/>
        </div>
        {sendSeconds > 0 && <span className={classNames('cjm-mobile-send-code-link', 'disabled')}>{sendSeconds}秒后重试</span>}
        {sendSeconds <= 0 && <a onClick={this.handleSendClick} className="cjm-mobile-send-code-link">发送验证码</a>}
      </div>
    )
  }
}
