import React from 'react';
import {Picker} from 'antd-mobile';
import Input from '../Input';
//
export default class extends React.Component {
  state = {
    pickerVisible: false
  };
  handleInputClick = () => {
    const {readonly, disabled} = this.props;
    if (!readonly && !disabled) {
      this.setState({pickerVisible: true});
    }
  };
  handleOk = (val) => {
    this.setState({pickerVisible: false});
    const {onChange} = this.props;
    onChange(val[0] ? val[0] : '');
  };
  handleDismiss = () => {
    this.setState({pickerVisible: false});
  };

  render() {
    const {value, placeholder = '请选择', options} = this.props;
    const {pickerVisible} = this.state;
    const noData = options.length > 0 ? options:[{label:'暂无数据',value:''}];
    const matchItem = options.find(item => item.value === value);
    const valueText = matchItem ? matchItem.label : '';
    return (
      <Picker visible={pickerVisible} data={noData} cols={1} value={value ? [value] : []} onOk={this.handleOk} onDismiss={this.handleDismiss}>
        <Input readonly value={valueText} placeholder={placeholder} onClick={this.handleInputClick}/>
      </Picker>
    )
  }
}
