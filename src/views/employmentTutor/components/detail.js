import React, { memo, useState, useEffect, useCallback } from "react";
import { traceDynamicFunDetail } from '../../../services/common';
import config from '../../../config/index.js'
import styles from '../index.less'
import { getRouterInfo } from "framework/utils/url";
import portrait from "assets/images/newImg/portrait.png";
import imageSrc from 'framework/utils/imageSrc';
import { showLoading, hideLoading } from "framework/utils/loading";
import Button from "framework/components/Button";

document.title = '就业导师'
export default memo(() => {
    const [data, setData] = useState({})
    const getTraceDynamicFunDetail = useCallback(async (id) => {
        const data = await traceDynamicFunDetail(config.jyds, id)
        setData(data)
        hideLoading()
    }, [])
    useEffect(() => {
        showLoading({ duration: 999 });
        const { query } = getRouterInfo()
        if (query && query.Id) {
            getTraceDynamicFunDetail(query.Id)
        }
    }, [getTraceDynamicFunDetail])
    return <div className={styles.employmentDetailContainer}>
        <div className={styles.positionBox}></div>
        <div className={styles.content}>
            <div className={styles.header}>
                <img src={imageSrc(data.zp) || portrait} />
                <div className={styles.right}>
                    <div className={styles.name}>{data.dsxm}</div>
                    <div className={styles.lxfs}><img src={require('assets/images/newImg/phone-white.png')} />{data.lxfs}</div>
                    <div className={styles.direction}>{data.zyfx}</div>
                </div>
            </div>
            <div className={styles.briefIntroduction}>
                <div>个人简介</div>
                <div>{data.dsjj}</div>
            </div>
            <div className={styles.footer}>
                <a href={`tel:${data.lxfs}`} className={styles.dial}>一键沟通</a>
            </div>
        </div>
    </div>
})