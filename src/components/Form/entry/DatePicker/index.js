import React from 'react';
import {DatePicker} from 'antd-mobile';
import Input from '../Input';
import {date2String, string2Date, formatDateStr, numFormat} from 'framework/utils/date';
//
const defaultMinDate = new Date(0);
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
    onChange(this.getValueByMode(val));
  };
  handleDismiss = () => {
    this.setState({pickerVisible: false});
  };

  getValueByMode = (valDate) => {
    const value = date2String(valDate);
    let {year, month, day, hour, minutes} = formatDateStr(value);
    year = numFormat(year);
    month = numFormat(month + 1);
    day = numFormat(day);
    hour = numFormat(hour);
    minutes = numFormat(minutes);
    const {mode = 'date'} = this.props;
    if (mode === 'date') { //年月日
      return `${year}-${month}-${day}`;
    } else if (mode === 'time') { //时分秒
      return `${hour}:${minutes}`;
    } else if (mode === 'datetime') { //年月日时分
      return `${year}-${month}-${day} ${hour}:${minutes}`;
    } else if (mode === 'year') { //年
      return `${year}`;
    } else if (mode === 'month') { //年月
      return `${year}-${month}`;
    }
  };

  getPickerValue = (value) => {
    if (value) {
      return string2Date(value);
    } else {
      return new Date();
    }
  };

  render() {
    let {placeholder = '请选择', value = '', mode = 'date', minDate = defaultMinDate, maxDate} = this.props;
    const {pickerVisible} = this.state;
    if (!value || value == null) {
      value = ''
    }
    return (
      <DatePicker value={this.getPickerValue(value)} mode={mode} minDate={minDate} maxDate={maxDate} visible={pickerVisible} onOk={this.handleOk} onDismiss={this.handleDismiss}>
        <Input readonly value={value} placeholder={placeholder} onClick={this.handleInputClick}/>
      </DatePicker>
    )
  }
}
