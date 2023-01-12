/*
 * @Author: xutengfeng 基于郑吴行代码
 * @Date: 2019-08-12 14:31:46 
 * @Last Modified by: xutengfeng
 * @Last Modified time: 2019-08-26 17:33:33
 */

import React, { useEffect, useRef, useCallback, useState, memo } from 'react';
import classNames from 'classnames';
import { Icon } from 'antd-mobile';
import styles from './index.less';
//
function Steps({
  data = [], current,
  offsetLeft,
}) {
  // const [contentWidth, setContentWidth] = useState(0);
  const [lineTop, setLineTop] = useState(0);
  const stepGroupRef = useRef(null);


  useEffect(() => {
    const el = document.querySelector(`.${styles.round}`);
    setLineTop(el.getBoundingClientRect().height / 2);
  }, []);

  const stepItem = useCallback((item, i) => {
    const index = data.indexOf(item);
    const lineError = data[i + 1] && data[i + 1].status === 'error';
    const { status, info } = item;
    const isError = status === 'error';
    const isLast = index === data.length - 1;
    // const connectLineStyle = { width: LineWidth };
    let type = 'normal';
    if (index < current) {
      type = 'pass';
    } else if (index == current) {
      type = 'current';
    }
    return (
      <div className={classNames(styles.stepItem, styles[type], { [styles.error]: isError })} key={index}>
        <div className={styles.inner}>
          <div className={classNames(styles.round)}>
            {type === 'pass' && !isError && <Icon className={styles.checkIcon} type="check" />}
            {isError && <Icon size="lg" color="#F76260" type="cross-circle" />}
            {type !== 'pass' && !isError && <span>{index + 1}</span>}
          </div>
          <div className={styles.label}>{item.label}</div>
          {info && <span className={styles.info}>{info.split(/\s/).filter(e => e.trim()).join('\n')}</span>}
        </div>
        {isLast || <div style={{ marginTop: lineTop, background: lineError ? '#F76260' : '' }} className={styles.connectLine} />}
      </div>
    );
  }, [data, current, lineTop]);

  const style = { left: `${offsetLeft}px` };
  return (
    <div ref={stepGroupRef} style={style} className={styles.stepGroup}>
      {data.map(stepItem)}
    </div>
  );
}

export default memo(Steps);