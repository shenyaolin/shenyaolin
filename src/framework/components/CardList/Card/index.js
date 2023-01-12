import React from 'react';
import _ from 'lodash';
import './index.less';
//
export default class extends React.Component {
  state = {
    title: ''
  };

  async componentWillMount() {
    const title = await this.getTitle();
    this.setState({title});
  }

  getTitle = async () => {
    const {data, parentProps} = this.props;
    const {title} = parentProps;
    if (typeof title === 'string') {
      return title;
    } else if (typeof title === 'function') {
      let result = title(data);
      if (result && result.constructor === Promise) {
        result = await result;
      }
      return result;
    }
  };

  renderColumnContent(column) {
    const {data} = this.props;
    let content = null;
    if (typeof column.render === 'function') {
      content = column.render(data);
    } else if (typeof column.prop === 'string') {
      return data[column.prop];
    }
    return content;
  }

  renderFooter = () => {
    const footer = _.get(this, 'props.parentProps.footer');
    if (typeof footer === 'function') {
      const {data} = this.props;
      return footer(data) && <div className="detail-footer">{footer(data)}</div>;
    }
  };

  renderImg = () =>{
    const showImg = _.get(this, 'props.parentProps.showImg');
    if (typeof showImg === 'function') {
      const {data} = this.props;
      return <div className='cjm-card-img'>{showImg(data)}</div>;
    }
  }

  render() {
    const {parentProps, onClick,data} = this.props;
    const {title} = this.state;
    const {columns} = parentProps;
    return (
      <div className="cjm-mobile-card-item" onClick={onClick} style={{position: 'relative'}}>
        {title && <div className="card-title">{title}</div>}
        <div className="detail-list">
        {
          columns.map((item, index) => {
            if (typeof item.checkEnable === 'function') {
              const isEnable = item.checkEnable(data);
              if(!isEnable){
                return null;
              }
            }
            return (
              <div className="detail-item" ref={`detail-${index}`} key={index}>
              {
                (typeof item.renderItem) ==='function' ? item.renderItem(data, index) : (
                  <React.Fragment>
                    {
                      item.label && (
                        <div className="column-label" ref={`label-${index}`}>
                        {
                          typeof item.label==='function' ? item.label(data) : item.label
                        }
                        </div>
                      )
                    }
                    <div className="column-content">
                      {this.renderColumnContent(item)}
                    </div>
                  </React.Fragment>
                )
              }
              </div>
            );
          })
        }
        </div>
        {this.renderFooter()}
        {this.renderImg()}
      </div>
    );
  }
}
