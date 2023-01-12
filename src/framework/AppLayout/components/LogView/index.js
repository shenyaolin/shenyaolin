import React from 'react';
import createStore from 'framework/utils/createStore';
import styles from './index.less';

const store = createStore('logMessages');
let msgs = [];
export const log = (msg) => {
  msgs.push(msg + '');
  if (msgs.length > 50) {
    msgs = msgs.filter((item, index) => {
      return index > msg.length - 50;
    })
  }
  store.eventBus.emit('log');
};
//
export default class extends React.Component {
  componentWillMount() {
    store.eventBus.on('log', this.handleLog);
  }

  componentWillUnmount() {
    store.eventBus.off('log', this.handleLog);
  }

  handleLog = () => {
    this.forceUpdate();
  };

  render() {
    const {onClose} = this.props;
    return (
      <div className={styles.logView}>
        <i className={styles.closeLink} onClick={onClose}>关闭</i>
        <div className={styles.list}>
          {msgs.map((msg, index) => {
            return <div key={index} className={styles.msgItem}>{msg}</div>
          })}
        </div>
      </div>
    );
  }
}
