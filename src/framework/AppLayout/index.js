import React from 'react';
import LogView from './components/LogView';
//
export default class extends React.Component {
  state = {
    showLog: false
  };
  clickTimes = 0;
  timeout = null;
  handleAppClick = () => { //连续点击20次,就显示log输出
    this.clickTimes++;
    if (this.clickTimes >= 20) {
      this.setState({showLog: true});
    }
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.clickTimes = 0;
    }, 200)
  };
  closeLog = () => {
    this.setState({showLog: false});
  };

  render() {
    const {children, className, style} = this.props;
    const {showLog} = this.state;
    return (
      <React.Fragment>
        <div onClick={this.handleAppClick} className={className} style={style}>{children}</div>
        {showLog && <LogView onClose={this.closeLog}/>}
      </React.Fragment>
    )
  }
}
