/*
 * @Author: xutengfeng 
 * @Date: 2019-08-12 13:58:07 
 * @Last Modified by: xutengfeng
 * @Last Modified time: 2019-08-19 15:02:50
 */

import React, { memo, useState, useEffect, useRef, useCallback } from 'react';
import Button from 'framework/components/Button';
import Input from 'framework/components/Form/entry/Input';

import styles from './index.less';

function useInterval(callback, delay, count) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }

    const id = setInterval(tick, delay);
    return () => clearInterval(id);
  }, [delay, count]);
}

function Captcha({ startCount = 60, handleSendCaptcha, onChange = () => {}, value = '', placeholder = '' }) {
  const [count, setCount] = useState(0);
  useInterval(() => {
    setCount(count - 1);
  }, 1000, count);
  const handleCaptchaClick = useCallback(() => {
    console.log('click', count);
    if(count <= 0) {
      setCount(startCount);
      handleSendCaptcha && handleSendCaptcha();
    }
  }, [handleSendCaptcha]);
  return (
    <div className={styles.captcha}>
      <Input className={styles['captcha-input']} onChange={onChange} value={value} placeholder={placeholder} />
      <Button disabled={count > 0} className={styles['captcha-button']} theme="primary" onClick={handleCaptchaClick}>
        {
          count > 0 ? `已发送${count}秒` : '发送验证码'
        }
      </Button>
    </div>
  );
}


export default memo(Captcha);