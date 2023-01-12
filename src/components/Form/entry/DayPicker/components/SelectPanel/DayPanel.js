import React from 'react';
import moment from 'moment';
import classnames from 'classnames';
import styles from './index.less';

const monthStr = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
const weekStr = ['日', '一', '二', '三', '四', '五', '六'];
const weekRow = [0, 1, 2, 3, 4, 5];

export default class extends React.Component {

  getValue = (row, index) => {
    const { currentDate } = this.props;
    const value = row*7 + index + 1 - Number(currentDate.week);
    if(value > 0 && value <= currentDate.daysNum) {
      return value;
    } else {
      return ''
    }
  }

  chooseDay = (value, isDisabled) => {
    const { changeValue } = this.props;
    if( value && changeValue ) {
      changeValue({'D': value})
    }
  }

  getCurrentNum = () => {
    const { value, focusIndex, currentDate } = this.props;
    const valueArr = typeof value === 'string' ? value.split(' ~ ') : [];
    const current = (focusIndex && valueArr[focusIndex - 1]) ? valueArr[focusIndex - 1] : '';
    const nowDate = moment(current).date();
    return currentDate.date;
  }

  isDisabled = num => {
    const { currentDate, focusIndex } = this.props;
    // const valueArr = typeof value === 'string' ? value.split(' ~ ') : [];
    if(currentDate.date == num) {
      return true;
    }
    return false;
  }

  render() {
    const { currentDate } = this.props;
    const nowDate = this.getCurrentNum();
    // const nowDate = moment(new Date()).format("YYYY-MM-DD").split;
    return (
      <div className={styles.dayPanelWrap}>
        <div className={styles.panelTitle}>
          {monthStr[currentDate.months]} {currentDate.years}
        </div>
        <div className={styles.dayPanelblock}>
          <table cellPadding='0' cellSpacing='0' border='0'>
            <thead>
              <tr>
                {weekStr.map(item => {
                  return <th key={item}>{item}</th>
                })}
              </tr>
            </thead>
            <tbody>
              {weekRow.map(row => {
                return (
                  <tr key={row}>
                    {weekStr.map((item, index) => {
                      const value = this.getValue(row, index);
                      const isDisabled = false;
                      return <td key={index} className={classnames(value&&styles.hasValue, nowDate==value ? styles.chooseValue : '', isDisabled&&value&&styles.dayDisabled)} onClick={() => this.chooseDay(value, isDisabled)}>{value}</td>
                    })}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}