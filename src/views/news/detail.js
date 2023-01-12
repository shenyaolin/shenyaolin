import React, { memo, useEffect, useState } from "react";
import styles from "./index.less";
import { showLoading, hideLoading } from "framework/utils/loading";
import { getRouterInfo } from "framework/utils/url";
import imageSrc from 'framework/utils/imageSrc';
import { getNewsDetail } from 'services/new';

document.title = "详情"
export default memo(() => {
    const [results, setResults] = useState({});
    const [show, setShow] = useState(false);

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

    const getNews = async (newsId) => {
        const { state, results } = await getNewsDetail({ newsId })
        if (state === 200) {
            setResults(results)
            setShow(true)
            hideLoading()
        }
    }

    useEffect(() => {
        showLoading({ duration: 999 });
        const { query } = getRouterInfo()
        query && query.newsId && getNews(query.newsId)
    }, []);

    return (
        show && <div className={styles.newsDetailContainer}>
            <div className={styles.title}>{results.title}</div>
            <div className={styles.createTime}>{timeFormat(results.createTime)}</div>
            {
                results.listImage && <img alt="" src={imageSrc(results.listImage)} />
            }
            <div dangerouslySetInnerHTML={{ __html: results.content }} className={styles.innerHtml}></div>
        </div>
    );
});
