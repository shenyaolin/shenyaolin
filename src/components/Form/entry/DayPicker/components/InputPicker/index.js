import React from 'react';
// import { Icon } from 'components';
import classnames from 'classnames';
// import div from 'framework/components/normal/div';
import styles from './index.less';

export default class extends React.Component {

  setInputIndex = index => {
    const { changeFocusIndex } = this.props;
    changeFocusIndex && changeFocusIndex(index)
  }

  changeValue = () => {}

  render() {
    const { value='', focusIndex } = this.props;
    const valueArr = typeof value === 'string' ? value.split(' ~ ') : [];

    return (
      <div className={classnames(styles.inputWrap, String(focusIndex)&&styles.inputWrapFocus)}>
        <div title = {valueArr.length > 0 ? valueArr[0] : ''} overlayStyle={{minWidth: '90px'}}>
          <input 
            value={valueArr.length > 0 ? valueArr[0] : ''} 
            onFocus={() => this.setInputIndex(1)}
            onChange={() => this.changeValue(1)}
            placeholder='开始时间'
          />
        </div>
        {/* <i className={styles.icon}>
          <Icon type="swap-right" />
        </i> */}
        <div title = {valueArr.length > 1 ? valueArr[1] : ''} overlayStyle={{minWidth: '90px'}}>
          <input 
            value={valueArr.length > 1 ? valueArr[1] : ''}
            onFocus={() => this.setInputIndex(2)}
            onChange={() => this.changeValue(2)}
            placeholder='结束时间'
          />
        </div>
      </div>
    )
  }
}