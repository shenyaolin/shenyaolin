import React from 'react';
import moment from 'moment';
import styles from './index.less';

export default class extends React.Component {

  setTime = num => {
    const { type, changeValue } = this.props;
    const obj = {};
    obj[type] = num;
    changeValue && changeValue(obj);
  }

  getCurrentTime = () => {
    const { value, focusIndex, type } = this.props;
    const valueArr = typeof value === 'string' ? value.split(' ~ ') : [];
    const current = (focusIndex && valueArr[focusIndex - 1]) ? valueArr[focusIndex - 1] : '';
    let newTime = ''
    if(type === 'h') {
      newTime = moment(current).hour();
    } else if(type === 'm') {
      newTime = moment(current).minute();
    } else if(type === 's') {
      newTime = moment(current).second();
    }
    return newTime;
  }

  render() {
    const { timeArr } = this.props;
    const newTime = this.getCurrentTime();
    return (
      <div className={styles.timeRowWrap}>
        {timeArr.map(item => {
          return <div key={item} className={(newTime ==item)&&styles.chooseTime} onClick={() => this.setTime(item)}>{item}</div>
        })}
      </div>
    )
  }
}