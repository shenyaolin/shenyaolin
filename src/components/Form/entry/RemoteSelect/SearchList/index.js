import React from 'react';
import SearchBar from 'framework/components/SearchBar';
import './index.less';
import { getRouterInfo, historyBack, replaceUrl } from 'framework/utils/url';
import { HashRouter } from 'react-router-dom';
import Button from 'framework/components/Button';
import _ from 'lodash';
import ajax from 'framework/utils/ajax';
import classNames from 'classnames';
import trim from 'framework/utils/trim';
import NoData from 'framework/components/NoData';

//
class SearchBarWrap extends React.Component {
  state = {
    query: '',
    options: [],
    config: {}
  };
  
  historyBackFix() {
    const oldHref = window.location.href;
    historyBack();
    // 解决微信8.0.3 history.back不生效的bug
    // 如果执行了historyBack之后,浏览器地址没有变化,那么就执行replaceUrl把url中的search去掉
    setTimeout(() => {
      const newHref = window.location.href;
      const { query } = getRouterInfo();
      const { search } = query;
      if (oldHref === newHref && search) {
        const newQuery = Object.assign({}, query, { search: undefined });
        replaceUrl({
          pathname: '', query: newQuery
        });
      }
    }, 200);
  }
  
  getSearchStatus = () => {
    const routerInfo = getRouterInfo();
    return _.get(routerInfo, 'query.search');
  };
  
  componentWillMount() {
    this.loadOptions();
  }
  
  getConfig = () => {
    const { config } = this.state;
    const rsKey = _.get(this, 'state.config.rsKey') || '1';
    const queryKey = _.get(this, 'state.config.queryKey') || 'search';
    const labelKey = _.get(this, 'state.config.labelKey') || 'name';
    const valueKey = _.get(this, 'state.config.valueKey') || 'id';
    const params = _.get(this, 'state.config.params') || {};
    const multiple = _.get(this, 'state.config.multiple') || false;
    let value = _.get(this, 'state.config.value');
    if (!value) {
      value = multiple ? [] : '';
    }
    return { ...config, rsKey, queryKey, labelKey, valueKey, params, multiple, value };
  };
  getAjaxParams = (query = '') => {
    const { queryKey, params } = this.getConfig();
    const defaultParams = { pageSize: 50, current: 1 };
    const finalParams = { ...defaultParams, ...params };
    finalParams[queryKey] = query;
    return finalParams;
  };
  loadOptions = async (query = '') => {
    this.setState({ query });
    const { remoteUrl, enums } = this.getConfig();
    if (enums) {
      const options = Object.keys(enums.getData()).map(key => ({ name: key, id: enums.get(key) }));
      this.setStateOptions(options);
      return;
    }
    const params = this.getAjaxParams(query);
    if (remoteUrl) {
      const { res } = await ajax.get(remoteUrl, params);
      const results = _.get(res, 'results');
      let options = _.get(res, 'results.list');
      if (!Array.isArray(options)) {
        options = Array.isArray(results) ? results : [];
      }
      this.setStateOptions(options);
    }
  };
  
  setStateOptions = (setOptions) => {
    const { onOptionsChange } = this.props;
    const { options } = this.state;
    const { valueKey } = this.getConfig();
    const newOptions = [...options];
    setOptions.forEach(option => {
      const matchOption = newOptions.find(opt => opt[valueKey] === option[valueKey]);
      const index = newOptions.indexOf(matchOption);
      // console.log(newOptions)
      if (matchOption) {
        newOptions[index] = option;
      } else {
        newOptions.push(option);
      }
    });
    this.setState({ options: newOptions }, () => {
      onOptionsChange && onOptionsChange(newOptions);
    });
  };
  
  handleOptionClick = (opt) => {
    return () => {
      const { multiple, value } = this.getConfig();
      if (!multiple && this.isOptionActive(opt)) {
        this.setValue(value);
      } else {
        const { onOptionClick } = this.props;
        onOptionClick(opt);
      }
    };
  };
  setConfig = (config) => {
    const oldRemoteUrl = this.getConfig().remoteUrl;
    this.setState({ config }, () => {
      const newRemoteUrl = this.getConfig().remoteUrl;
      if (oldRemoteUrl !== newRemoteUrl) {
        this.setState({ options: [] }, this.loadOptions)
      } else {
        this.loadOptions();
      }
    });
  };
  closeList = () => {
    const routerInfo = getRouterInfo();
    const { rsKey } = this.getConfig();
    const search = _.get(routerInfo, 'query.search');
    // console.log(rsKey)
    // console.log(search)
    if (rsKey && search && rsKey === search) {
      this.historyBackFix();
    } else if (!rsKey && search) {
      this.historyBackFix();
    }
  };
  setValue = (value) => {
    const { config } = this.state;
    config.value = value;
    const { multiple } = this.getConfig();
    this.setState({ config }, () => {
      if (!multiple) {
        this.closeList()
      }
    });
  };
  getValueText = () => {
    const { options } = this.state;
    const { value, multiple, labelKey, valueKey } = this.getConfig();
    if (multiple) {
      return value.map(item => options.find(opt => opt[valueKey] === item)).map(item => item ? item[labelKey] : '').filter(item => !!item).join(',');
    } else {
      const matchOpt = options.find(opt => opt[valueKey] === value);
      return matchOpt ? matchOpt[labelKey] : '';
    }
  };
  isOptionActive = (option) => {
    const { value, multiple, valueKey } = this.getConfig();
    if (multiple) {
      return value.includes(option[valueKey]);
    } else {
      // console.log(option[valueKey]);
      return value === option[valueKey];
    }
  };
  
  renderOptions = () => {
    const { options, query } = this.state;
    const { labelKey, valueKey, renderLabel } = this.getConfig();
    const viewOptions = options.filter(opt => {
      let label = opt[labelKey];
      if (label == null) {
        label = ''
      }
      label = label+'';
      return label.indexOf(trim(query)) >= 0;
    });
    if (viewOptions.length === 0) {
      return (
        <div style={{ backgroundColor: '#f5f5f5' }}>
          <NoData />
        </div>
      )
    }
    
    return (
      <React.Fragment>
        {viewOptions.map((opt, index) => {
          let label = opt[labelKey];
          if (label == null) {
            label = ''
          }
          label = label+'';
          if (label.indexOf(trim(query)) < 0) {
            return null;
          }
          const key = `${opt[labelKey]}-${opt[valueKey]}-${index}`;
          const isActive = this.isOptionActive(opt);
          // console.log(isActive);
          const className = classNames('cjm-mobile-search-item', isActive && 'active');
          return (
            <div key={key} className={className} onClick={this.handleOptionClick(opt)}>
              <span>{typeof renderLabel === 'function' ? renderLabel(label, opt) : label}</span>
              {isActive && <i className="active-primary-icon"></i>}
            </div>
          );
        })}
      </React.Fragment>
    );
  };
  handleSearch = (query) => {
    this.loadOptions(query);
  };
  handleClear = () => {
    this.handleQueryChange('');
  };
  handleQueryChange = (query) => {
    this.setState({ query });
    this.searchTimeout();
  };
  timeout = null;
  searchTimeout = () => {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      const { query } = this.state;
      this.loadOptions(query);
    }, 500);
  };
  
  render() {
    const { query } = this.state;
    const { rsKey, multiple, enums } = this.getConfig();
    const isShow = this.getSearchStatus() === rsKey;
    const { onCancel, onOk } = this.props;
    return isShow ? (
      <div className="cjm-mobile-search-list cjm-mobile-search-bar-wrap">
        {!enums && <SearchBar placeholder="搜索" value={query} onClear={this.handleClear} onChange={this.handleQueryChange} onSubmit={this.handleSearch} onCancel={onCancel} />}
        <div className="cjm-mobile-search-options">{this.renderOptions()}</div>
        {multiple && <Button type="bottom" onClick={onOk}>确定</Button>}
      </div>
    ) : null;
  }
}

//
export default class extends React.Component {
  setConfig = (config) => {
    this.searchBar.setConfig(config);
  };
  setValue = (value) => {
    this.searchBar.setValue(value);
  };
  getValueText = () => {
    return this.searchBar.getValueText();
  };
  getSearchBar = (ref) => {
    this.searchBar = ref;
  };
  
  render() {
    return (
      <HashRouter>
        <SearchBarWrap {...this.props} ref={this.getSearchBar} />
      </HashRouter>
    );
  }
}
