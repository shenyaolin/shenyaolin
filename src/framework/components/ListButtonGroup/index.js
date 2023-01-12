import React from 'react';
import Button from 'framework/components/Button';
import Checkbox from 'framework/components/Checkbox';
import './index.less';
//
export default class extends React.Component {
  handleCheckAllClick = () => {
    const {checkAll, onCheckAllChange} = this.props;
    onCheckAllChange && onCheckAllChange(!checkAll);
  };

  render() {
    const {onCancelClick, onOkClick, checkAll} = this.props;
    return (
      <div className="cjm-mobile-list-button-group">
        <div className="cjm-mobile-list-checkall-wrap" onClick={this.handleCheckAllClick}>
          <Checkbox className="cjm-mobile-list-checkall" checked={checkAll}>全选</Checkbox>
        </div>
        <Button onClick={onCancelClick} className="cjm-mobile-list-cancel-button" theme="white">取消</Button>
        <Button onClick={onOkClick} className="cjm-mobile-list-ok-button">确定</Button>
      </div>
    )
  }
}
