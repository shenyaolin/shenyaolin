import React from 'react';
import classnames from 'classnames';
import DayPanel from './DayPanel';
import TimePanel from './TimePanel';
import styles from './index.less';

export default class extends React.Component {
  state = {}

  changeValue = (value) => {
    const { changeValue, focusIndex } = this.props;
    changeValue&& changeValue(value, focusIndex);
  }

  render() {
    const { focusIndex, currentDate, value } = this.props;
    return (
      <div className={styles.selectPanelWrap}>
        <div className={styles.selectPanelcontainer}>
          <DayPanel currentDate={currentDate} value={value} focusIndex={focusIndex}changeValue={this.changeValue} />
          {/* <TimePanel currentDate={currentDate} value={value} focusIndex={focusIndex} changeValue={this.changeValue}/> */}
        </div>
        <div className={classnames(styles.selectPanelArrow, focusIndex&&styles[`arrow${focusIndex}`])}></div>
      </div>
    )
  }
}