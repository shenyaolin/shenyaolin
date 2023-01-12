/*
 * @Author: xutengfeng 
 * @Date: 2020-04-16 15:26:27 
 * @Last Modified by: xutengfeng
 * @Last Modified time: 2020-04-16 16:09:34
 */
import React, { memo, useMemo } from 'react';
import { uniqueId } from 'lodash';
import styles from './index.less';

/**
 * radio组件
 */
export default memo(({ name = 'radio', checked, key, style, label, onChange, value }) => {
  const id = useMemo(() => key || uniqueId('radio'), [key]);
  return (
    <div className={styles.radio} style={style}>
      <input
        type="radio"
        value={value}
        checked={checked ? 'checked' : ''}
        onChange={onChange}
        id={id}
        name={name}
      />
      <label htmlFor={id} />
      <span>{label}</span>
    </div>
  );
});