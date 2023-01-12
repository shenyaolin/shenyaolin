import React from 'react';
import ReactDOM from 'react-dom';
import Input from '../Input';
import SearchList from './SearchList';
import {pushUrl, getRouterInfo, historyBack} from 'framework/utils/url';
import uuid from 'framework/utils/uuid';
import _ from 'lodash';
//
//
export default class extends React.Component {
  componentKey = uuid();

  get rootId() {
    return `remote-select-search-list-${this.componentKey}`;
  }

  oldValue = null;
  handleInputClick = () => {
    const {readonly, disabled} = this.props;
    if (!readonly && !disabled) {
      this.setSearchListConfig();
      const routerInfo = getRouterInfo();
      const {rsKey = '1', value} = this.props;
      this.oldValue = Array.isArray(value) ? [...value] : value;
      const query = {...routerInfo.query, search: rsKey};
      pushUrl({pathname: '', query});
    }
  };

  componentWillMount() {
    const div = document.createElement('div');
    div.setAttribute('id', this.rootId);
    document.body.appendChild(div);
    ReactDOM.render(this.renderSearchList(), document.getElementById(this.rootId));
    setTimeout(this.setSearchListConfig, 100);
  }

  setSearchListConfig = () => {
    if (this.searchList) {
      const {multiple, rsKey = '1', remoteUrl, enums, labelKey, valueKey, queryKey, value, renderLabel, params = {}} = this.props;
      this.searchList.setConfig({multiple, rsKey, remoteUrl, enums, labelKey, valueKey, queryKey, value, renderLabel, params});
      this.forceUpdate();
    }
  };

  componentWillUnmount() {
    const div = document.getElementById(this.rootId);
    ReactDOM.unmountComponentAtNode(div);
    document.body.removeChild(div);
  }

  setSearchListRef = (ref) => {
    this.searchList = ref;
  };
  handleOptionsChange = (options) => {
    const {onOptionsChange} = this.props;
    this.forceUpdate();
    onOptionsChange && onOptionsChange(options);
  };
  renderSearchList = () => {
    const props = {
      onOptionsChange: this.handleOptionsChange,
      ref: this.setSearchListRef,
      onOptionClick: this.handleOptionClick,
      onOk: this.handleOk,
      onCancel: this.handleCancel
    };
    return <SearchList {...props}/>
  };
  closeList = () => {
    const { multiple = false } = this.props;
    const routerInfo = getRouterInfo();
    const search = _.get(routerInfo, 'query.search');
    const {rsKey} = this.props;
    if (rsKey && search && rsKey === search && multiple) {
      historyBack();
    } else if (!rsKey && search && multiple) {
      historyBack();
    }
  };
  handleOk = query => {
    const {onChange} = this.props;
    this.closeList();
    onChange && onChange(query);
  };
  handleCancel = () => {
    const {onChange} = this.props;
    onChange && onChange(this.oldValue);
    this.closeList();
  };
  handleOptionClick = (option) => {
    const {multiple = false, valueKey = 'id', onChange} = this.props;
    let {value} = this.props;
    if (multiple) { //多选
      if (value.includes(option[valueKey])) {
        value = value.filter(item => item !== option[valueKey]);
      } else {
        value = [...value, option[valueKey]];
      }
    } else {
      value = option[valueKey];
    }
    onChange && onChange(value, option);
  };

  componentDidUpdate(prevProp) {
    const prevValue = _.get(prevProp, 'value');
    const value = _.get(this, 'props.value');
    if (prevValue !== value && this.searchList) {
      this.searchList.setValue(value);
    }
  }

  setValue(value) {
    this.searchList && this.searchList.setValue(value);
  }

  getValueText = () => {
    const {value, label} = this.props;
    let text = this.searchList ? this.searchList.getValueText() : '';
    if (!text) {
      text = label;
    }
    return text;
  };

  render() {
    const {placeholder = '请选择', inputType = 'text'} = this.props;
    return (
      <Input type={inputType} readonly value={this.getValueText()} placeholder={placeholder} onClick={this.handleInputClick}/>
    );
  }
}
