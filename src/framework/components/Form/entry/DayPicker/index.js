import React from 'react';
import InputPicker from './components/InputPicker';
import SelectPanel from './components/SelectPanel';
import moment from 'moment';
import styles from './index.less';
import { string } from 'prop-types';

// 用法： <DayPicker 
// value={form.time}
// defaultYearMonth={getYearMonth()}
// setFormData={setFormData}
// valueKey='time'
// isShowTime
// />

export default class extends React.Component {

  state={
    currentDate: {},
    focusIndex: '',
    showPanel: false
  }

  componentDidMount() {
    document.addEventListener('click', e => {
      this.changeFocusIndex('');
      this.clearDate();
    })
  }

  clearDate = () => {
    const { value = '', setFormData, valueKey } = this.props;
    const valueArr = value.split(' ~ ');
    if(valueArr.length !== 2) {
    setFormData && setFormData(valueKey)('');
    }
  }
  componentDidMount(){
    this.getCurrentDate(this.props.defaultYearMonth);
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.defaultYearMonth !== nextProps.defaultYearMonth) {
      this.getCurrentDate(nextProps.defaultYearMonth);
    }
  }

  stopEvent = e => {
    e.stopPropagation()
    e.nativeEvent.stopImmediatePropagation();
  }

  getCurrentDate = async defaultYearMonth => {
    const { value } = this.props;
    const currentDate = moment(value[0] || undefined).toObject();
    const week = moment([currentDate.years, currentDate.months]).format('d');
    const daysNum = moment([currentDate.years, currentDate.months]).daysInMonth();
  
    Object.assign(currentDate, { week, daysNum });

    const{ years, months} = currentDate;
    await this.changeValue({'y': years, 'M': months, 'D': value[0].split('-')[2]}, 1, currentDate);
    // await this.changeValue({'y': years, 'M': months, 'D': daysNum, 'h': 23, 'm':59, 's': 59}, 2, currentDate);

    this.setState({
      currentDate
    })
  }

  changeFocusIndex = index => {
    this.setState({
      focusIndex: index,
      showPanel: !!index
    })
  }

  getValue = (newValue, focusIndex, newCurrentDate) => {
    const { value = '' } = this.props;
    const { currentDate } = this.state;
    const newDate = newCurrentDate || currentDate;
    // const valueArr = typeof value === 'string' ? value.split(' ~ ') : [];
    // const momentValue = moment(valueArr[focusIndex-1] || [newDate.years, newDate.months]);

    // valueArr[focusIndex-1] = momentValue.set(newValue);
    // valueArr[focusIndex-1] = valueArr[focusIndex-1].format('YYYY-MM-DD HH:mm:ss');
    return newValue;
  }

  // newValue  {type: value, type: value} 
  // year (years, y)、month (months, M)、date (dates, D)、hour (hours, h)、minute (minutes, m)、second (seconds, s)、millisecond (milliseconds, ms)
  changeValue = async (newValue, focusIndex, newCurrentDate) => {
    const { valueKey, setFormData } = this.props;
    const defaultDate = await this.getValue(newValue, focusIndex, newCurrentDate);
    setFormData && setFormData(newValue);
  }

  render() {
    const { value } = this.props;
    const { currentDate, focusIndex, showPanel } = this.state;

    return(
      <div className={styles.dayPickerWrap} id='dayPicker' onClick={e => this.stopEvent(e)}>
        {/* <InputPicker 
          value={value || []}
          focusIndex={focusIndex}
          currentDate={currentDate}
          changeFocusIndex={this.changeFocusIndex}
        /> */}
        
          <SelectPanel 
            focusIndex={focusIndex}
            currentDate={currentDate}
            value={value || []}
            changeFocusIndex={this.changeFocusIndex}
            changeValue={this.changeValue}
          />
        
      </div>
    )
  }
}