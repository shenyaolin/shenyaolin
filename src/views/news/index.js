import React, { memo, useCallback } from "react";
import styles from "./index.less";
import { pushUrl } from "framework/utils/url";
import PagingList from "framework/components/PagingList";
import api from "config/api";
import imageSrc from 'framework/utils/imageSrc';

document.title = "新闻中心"
export default memo(() => {

    //这里输入的时间戳
    const timeFormat = (createTime) => {
        var timestamp = new Date(createTime.replace(/-/g, '/')).getTime()
        var time = new Date().getTime() - timestamp
        console.log(time);
        if (time < 24 * 60 * 60 * 1000 * 7) {
            var mistiming = Math.round(Number(Date.now() - timestamp) / 1000);
            var arrr = ['年', '个月', '周', '天', '小时', '分钟', '秒'];
            var arrn = [31536000, 2592000, 604800, 86400, 3600, 60, 1];
            for (var i = 0; i < arrn.length; i++) {
                var inm = Math.floor(mistiming / arrn[i]);
                if (inm !== 0) {
                    return inm + arrr[i] + '前';
                }
            }
        } else {
            return createTime.substr(0, 10)
        }
    }

    const renderItem = useCallback((item, index) => {
        const imgs = item.listImage ? item.listImage.split(',') : []
        return (
            <div key={index} className={styles.renderItem} onClick={() => pushUrl({ pathname: '/news/detail', query: { newsId: item.newsId } })}>
                <div>
                    <div className={styles.title}>{item.title}</div>
                    <div className={styles.createTime}>{timeFormat(item.createTime)}</div>
                </div>
                {
                    imgs.length > 0 && imgs.map((img, i) => <img alt="" src={imageSrc(img)} key={i} />)
                }
            </div>
        );
    }, []);

    return (
        <div className={styles.newsContainer}>
            <PagingList
                dataSource={api.news.GET_LIST}
                renderItem={renderItem}
                ajaxMethod="get"
            />
        </div>
    );
});
