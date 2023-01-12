/*
 * @Author: duyaoyao
 * @Date: 2020-05-25 15:52:55
 * @LastEditors: duyaoyao
 * @LastEditTime: 2020-06-08 12:11:24
 */ 
import React from 'react';
import _ from 'lodash';
import imageSrc from 'framework/utils/imageSrc';
import './index.less';
//
export default class extends React.Component {
    state = {
        title: ''
    };

    async componentWillMount() {
        const title = await this.getTitle();
        this.setState({ title });
    }

    getTitle = async () => {
        const { data, parentProps } = this.props;
        const { title } = parentProps;
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
        const { data } = this.props;
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
            const { data } = this.props;
            return <div className="detail-footer">{footer(data)}</div>;
        }
    };

    renderImg = () => {
        const showImg = _.get(this, 'props.parentProps.showImg');
        if (typeof showImg === 'function') {
            const { data } = this.props;
            return <div className='cjm-card-img'>{showImg(data)}</div>;
        }
    }
    getImage = (images) => {
        const list = images.split(",");
        if (list.length > 0) {
          return imageSrc(list[0]);
        } else {
          return "";
        }
      };

    render() {
        const { parentProps, onClick, data } = this.props;
        const leftImgUrl = data[parentProps.imgName];
        const { title } = this.state;
        const { columns } = parentProps;
        return (
            <div className="cjm-mobile-card-item" onClick={onClick} style={{ position: 'relative' }}>
                {title && <div className="card-title">{title}</div>}
                <div className="detail-list">
                    {leftImgUrl ? <img src={this.getImage(leftImgUrl)} /> : null}
                    <div className='detail-right-warp'>
                        {columns.map((item, index) => {
                            return (
                                <div className="detail-item" ref={`detail-${index}`} key={index}>
                                    <div className="column-content">
                                        {this.renderColumnContent(item)}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                {this.renderFooter()}
                {this.renderImg()}
            </div>
        );
    }
}
