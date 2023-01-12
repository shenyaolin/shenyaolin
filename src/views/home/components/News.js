import React, { memo, useCallback, useEffect, useState } from "react";
import styles from "./index.less";
import { pushUrl } from "framework/utils/url";
import { getNews } from 'services/new';

export default memo(() => {
    const [title, setTitle] = useState("");

    const getNew = async () => {
        const { state, results } = await getNews()
        if (state === 200) {
            setTitle(results.title)
        }
    }

    useEffect(() => {
        getNew()
    }, []);

    return (
        <div className={styles.newsContainer} onClick={() => pushUrl({ pathname: '/news' })}>
            <img alt="" src={require("assets/images/newImg/news.png")} className={styles.newsImg} />
            <div>{title}</div>
            <img alt="" src={require("../../../assets/images/newImg/arrow-right.png")} className={styles.arrowImg} />
        </div>
    );
});
