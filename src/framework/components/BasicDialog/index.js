import React from 'react';
import { Modal, List, Button, WingBlank } from 'antd-mobile';
import Styles from './index.less'
export default class extends React.Component {
  state = {
    modal: false
  };

  showModal = key => {
    // e.preventDefault(); // 修复 Android 上点击穿透
    this.setState({
      [key]: true
    });
  };
  onClose = key => {
    this.setState({
      [key]: false
    });
  };

  onWrapTouchStart = e => {
    // fix touch to scroll background page on iOS
    if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
      return;
    }
    const pNode = closest(e.target, '.am-modal-content');
    if (!pNode) {
      e.preventDefault();
    }
  };
  show = () => {
    this.showModal('modal');
  };

  render() {
    const { contentList,changeIndex } = this.props;
    return (
      <WingBlank>
        <Modal popup visible={this.state.modal} onClose={e => this.onClose('modal')} animationType="slide-up" afterClose={() => {}}>
          <List>
            {contentList.map((i, index) => (
              <List.Item key={index} onClick={e => changeIndex(index)}>
                {i}
              </List.Item>
            ))}
            <List.Item>
              <Button type="primary" onClick={e => this.onClose('modal')}>
                取消
              </Button>
            </List.Item>
          </List>
        </Modal>
      </WingBlank>
    );
  }
}
