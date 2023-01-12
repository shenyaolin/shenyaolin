import React from 'react';
import { Modal, WingBlank } from 'antd-mobile';
import Button from 'framework/components/Button';
import Styles from './index.less';

const alert = Modal.alert;
export default class extends React.Component {
  show = (event) => {
    event.stopPropagation()
    const { title, subTitle } = this.props;
    alert(title, subTitle, [
      {
        text: '取消',
        onPress: () => console.log('cancel')
      },
      {
        text: '确定',
        onPress: this.submit
      }
    ]);
  };

  submit = () => {
    const { onDelClick } = this.props;
    onDelClick && onDelClick();
  };

  render() {
    const { title } = this.props;
    return (
      <React.Fragment>
        {/*<WingBlank size="lg" />*/}
        <Button onClick={this.show} className={Styles.delBtn}>
          {title}
        </Button>
      </React.Fragment>
    );
  }
}
