/*
 * @Author: xutengfeng 
 * @Date: 2019-08-22 14:16:53 
 * @Last Modified by: xutengfeng
 * @Last Modified time: 2019-08-22 16:27:28
 */

import React, { useState, forwardRef, useImperativeHandle, useCallback } from 'react';
import { Modal } from 'antd-mobile';

function CjmH5Modal({ children, okHandler = () => { }, footer = [], ...restProps }, ref) {
  const [visible, setVisible] = useState(false);
  const handlePress = useCallback(() => {
    okHandler && okHandler();
  }, [okHandler]);
  const handleCancel = useCallback(() => {
    setVisible(false);
  }, []);
  useImperativeHandle(ref, () => ({
    show: () => setVisible(true),
    hide: handleCancel,
  }));
  const buttons = footer && footer.length === 0 ? [
    {
      text: '取消',
      onPress: handleCancel
    },
    {
      text: '确定',
      onPress: handlePress
    },
  ] : footer || [];
  return (
    <Modal
      visible={visible}
      transparent
      maskClosable={false}
      footer={buttons}
      {...restProps}
    >
      {children}
    </Modal>
  )
}

export const operation = Modal.operation;
export const prompt = Modal.prompt;
export const alert = Modal.alert;
export const AntdModal = Modal;

export default forwardRef(CjmH5Modal);