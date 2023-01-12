import React from 'react';
import styles from './index.less';
import defaultNoDataImage from 'framework/assets/images/no-data.png';
import classNames from 'classnames';
//
const defaultText = '没有数据';
//
export default class extends React.Component {
  render() {
    const {image, text} = this.props;
    return (
      <div className={classNames(styles.noData, 'H5ListNoData')}>
        <img src={image || defaultNoDataImage}/>
        <div className={styles.text}>{text || defaultText}</div>
      </div>
    );
  }
}
