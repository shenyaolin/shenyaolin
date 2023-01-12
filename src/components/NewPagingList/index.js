import React from 'react';
import { ajaxSync } from 'utils/ajax';
import request from 'utils/request';
import _ from 'lodash';
import uuid from 'framework/utils/uuid';
import { PullToRefresh } from 'antd-mobile';
import classNames from 'classnames';
import './index.less';
import sleep from 'framework/utils/sleep';
import { showLoading, hideLoading } from 'framework/utils/loading';
import { hasClass } from 'framework/utils/dom';
import NoData from 'framework/components/NoData';
//
export default class extends React.Component {
  state = {
    height: 'auto',
    refreshing: false,
    loading: false,
    endLoading: false,
    preventEndLoading: false,
    dataList: [], //显示的数据
    currentPage: 1, //当前页码
    pageSize: 10, //每页的数据量
    total: 0, //总数据量
    key: uuid(),
    signKey: uuid(),
    month: ""
  };

  get totalPage() { //总页数
    const { pageSize, total } = this.state;
    const totalPage = Math.ceil(total / pageSize);
    return totalPage < 1 ? 1 : totalPage;
  }

  get isEnd() { //是否已经到最后页
    const { currentPage } = this.state;
    return currentPage >= this.totalPage;
  }

  calcHeight = () => {
    const { otherHeight = 0 } = this.props;
    let height = window.innerHeight;
    const wrap = document.querySelector(`.${this.signClass}`);
    const bottomButton = document.querySelector('.cjm-mobile-button-type-bottom');
    if (bottomButton) {
      height = height - bottomButton.offsetHeight;
    }
    if (wrap) {
      height = height - wrap.offsetTop;
    }
    this.setState({ height: height - otherHeight });
  };

  async componentWillMount() {
    showLoading({ duration: 999 });
    await this.loadData();
    this.calcHeight();
    hideLoading();
  }

  getParams = () => {
    const { currentPage: current, pageSize } = this.state;
    const { ajaxParams = {} } = this.props;
    return { current, pageSize, ...ajaxParams };
  };

  loadData = async (clear = false) => {
    let dataList = [];
    let total = 0;
    const { dataSource, ajaxMethod = 'get', ajaxOptions, dataFormat } = this.props;
    const { loading } = this.state;
    const dataSourceType = typeof dataSource;
    const params = this.getParams();
    if (loading) {
      return;
    }
    this.setState({ loading: true });
    if (Array.isArray(dataSource)) {
      dataList = [...dataSource];
      total = dataList.length;
    } else if (dataSourceType === 'string') {
      // const { res } = await ajaxSync[ajaxMethod](dataSource, params, ajaxOptions);
      const res = await request({
        url: dataSource,
        method: ajaxMethod,
        data: params,
        options: ajaxOptions
      });
      if (res.results?.list) {
        dataList = _.get(res, 'results.list', []) || [];
      }
      else {
        dataList = _.get(res, 'results', []) || [];
      }
      // dataList = _.get(res, 'results.list', []) || _.get(res, 'results', []) || [];
      dataFormat && (dataList = dataFormat(dataList, res));
      dataList = this.newDataList(dataList)
      total = _.get(res, 'results.pagination.total', dataList.length) || dataList.length;
    } else if (dataSourceType === 'function') {
      dataList = await dataSource(params);
      total = dataList.length;
    }
    if (!clear) {
      dataList = [...this.state.dataList, ...dataList];
    }
    this.setState({ dataList, total, loading: false }, this.calcHeight);
  };

  newDataList = (dataList) => {
    var arr = []
    dataList.forEach((item, index) => {
      if (index === 0 && item.time !== this.state.month) {
        arr.push({ name: item.time, consumption: item.consumption || 0, obtain: item.obtain })
        this.setState({ month: item.time })
      } else if (index > 0 && item.time !== dataList[index - 1].time) {
        arr.push({ name: item.time, consumption: item.consumption || 0, obtain: item.obtain })
        this.setState({ month: item.time })
      }
      arr.push(item)
    })
    return arr
  }

  refresh = async () => {
    if (hasClass(document.body, 'body-show-image-cover-view')) {
      return;
    }
    this.setState({ refreshing: true, currentPage: 1, month: "" });
    await sleep(500);
    await this.loadData(true);
    this.setState({ refreshing: false, key: uuid() });
  };
  handleScrollEnd = async () => {
    const { endLoading, preventEndLoading } = this.state;
    // enableEndLoading对于不分页的列表，此属性设为false，则不会上拉加载
    const { enableEndLoading = true } = this.props;
    if (!this.isEnd && !endLoading && !preventEndLoading) {
      const { currentPage } = this.state;
      this.setState({ currentPage: currentPage + 1, endLoading: true }, () => {
        const wrap = document.querySelector(`.${this.signClass}`);
        const maxScrollTop = wrap.scrollHeight - wrap.offsetHeight;
        wrap.scrollTop = maxScrollTop;
      });
      if (enableEndLoading) {
        await this.loadData();
      }
      await sleep(500);
      this.setState({ endLoading: false, preventEndLoading: true });
      await sleep(200);
      this.setState({ preventEndLoading: false });
    }
  };

  handleScroll = _.throttle(async () => {
    const wrap = document.querySelector(`.${this.signClass}`);
    if (wrap) {
      const { damping = 200 } = this.props;
      const [scrollTop, maxScrollTop] = [wrap.scrollTop, wrap.scrollHeight - wrap.offsetHeight];
      if (maxScrollTop - scrollTop < damping) {
        await this.handleScrollEnd();
        //wrap.scrollTop = scrollTop;
      }
    }
  }, 200, { leading: true, trailing: true });

  bindScroll = () => {
    const wrap = document.querySelector(`.${this.signClass}`);
    wrap.addEventListener('scroll', this.handleScroll);
  };
  unBindScroll = () => {
    const wrap = document.querySelector(`.${this.signClass}`);
    wrap.removeEventListener('scroll', this.handleScroll);
  };

  componentDidMount() {
    this.bindScroll();
  }

  componentWillUnmount() {
    this.unBindScroll();
  }

  get signClass() {
    const { signKey } = this.state;
    return `list-wrap-${signKey}`;
  }

  handleClickCard = (card) => {
    return (e) => {
      const { onClickCard } = this.props;
      onClickCard && onClickCard(card, e);
    };
  };

  render() {
    const { dataList, key, height, refreshing, endLoading, loading } = this.state;
    const className = classNames('cjm-mobile-card-list-wrap', this.signClass);
    const style = { height };
    const props = { className, style, refreshing };
    const { enableRefresh = true, CardType = '', renderHeader, renderHeaderAlways, renderFooter, renderFooterAlways, disableStyle, renderItem } = this.props;
    if (disableStyle) {
      delete props.style;
    }
    let Component = PullToRefresh;
    if (!enableRefresh) {
      Component = 'div';
    }
    return (
      <Component {...props}>
        {renderHeader && dataList.length === 0 && renderHeaderAlways && renderHeader()}
        {dataList.length === 0 && !loading && <NoData />}
        <div className="cjm-mobile-card-list" key={key}>
          {renderHeader && dataList.length > 0 && renderHeader()}
          {dataList.map((item, index) => {
            return (
              renderItem ? renderItem(item, index) : '例子'
            );
          })}
          {endLoading && <div className="end-loading">loading...</div>}
          {dataList.length > 0 && renderFooter && renderFooter()}
          {(!dataList || dataList.length === 0) && renderFooterAlways && renderFooter && renderFooter()}
        </div>
      </Component>
    )
  }
}
