import React from 'react';
import TimeRow from './TimeRow';
import styles from './index.less';

export default class extends React.Component {

  getTimeArr = number => {
    const arr  = [];
    for(let i = 0; i< number; i++) {
      const value = i < 10 ? `0${i}` : i;
      arr.push(value);
    }
    return arr;
  }

  getTime = () => {
    const { value = '', focusIndex } = this.props;
    const valueArr = typeof value === 'string' ? value.split(' ~ ') : [];
    const date = (focusIndex && valueArr[focusIndex-1]) ? valueArr[focusIndex-1] : '';
    const dateArr = date.split(' ');
    if(dateArr.length > 1) {
      return dateArr[1];
    }
    return '';
  }

  render() {
    const { changeValue, value, focusIndex } = this.props;
    return (
      <div className={styles.timePanelWrap}>
        <div className={styles.panelTitle}>
          {this.getTime()}
        </div>
        <div className={styles.timePanelContent}>
          <TimeRow timeArr={this.getTimeArr(24)} type='h' changeValue={changeValue} focusIndex={focusIndex} value={value}/>
          <TimeRow timeArr={this.getTimeArr(60)} type='m' changeValue={changeValue} focusIndex={focusIndex} value={value}/>
          <TimeRow timeArr={this.getTimeArr(60)} type='s' changeValue={changeValue} focusIndex={focusIndex} value={value}/>
        </div>
      </div>
    )
  }
}