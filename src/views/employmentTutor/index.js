import React, { memo, useRef, useCallback, useEffect, useState } from "react";
import { SearchBar } from 'antd-mobile';
import PagingList from "framework/components/PagingList";
import styles from './index.less';
import portrait from "assets/images/newImg/portrait.png";
import config from 'config/index.js'
import { pushUrl } from "framework/utils/url";
import imageSrc from 'framework/utils/imageSrc';
import api from 'config/api';

document.title = "就业导师"
export default memo(() => {
    const [data, setData] = useState({})
    const listRef = useRef(null)
    const renderItem = useCallback((item, index) => {
        return (
            <div className={styles.listItem} key={index} onClick={handleClick(item)}>
                <img src={imageSrc(item.zp) || portrait} alt="" />
                <div className={styles.introduce}>
                    <div className={styles.name}>{item.dsxm}</div>
                    <div className={styles.direction}>
                        <img src={require('assets/images/newImg/tea-ceremony.png')} />
                        <div>{item.zyfx}</div>
                    </div>
                    <div className={styles.phone}>
                        <img src={require('assets/images/newImg/phone.png')} />
                        <div>{item.lxfs}</div>
                        <a href={`tel:${item.lxfs}`} className={styles.dial1} onClick={() => false}>拨打</a>
                    </div>
                </div>
            </div>
        )
    }, [])

    const refresh = () => {
        listRef.current.refresh();
    };

    const handleClick = (item) => (e) => {
        e.stopPropagation();
        if (e.target.nodeName === 'A') return false   // 判断是否是a标签  是的话阻止冒泡
        else {
            pushUrl({ pathname: "/employmentTutor/detail", query: { Id: item.Id } })
        }
    }

    const handleChange = useCallback((e) => {
        setData((prev) => ({
            ...prev,
            search: e
        }));
    })

    const handleCancal = useCallback((e) => {
        setData((prev) => ({
            search: ""
        }));
        refresh()
    })

    const handleSubmit = useCallback(() => {
        refresh()
    }, [data])

    return (
        <div className={styles.employmentTutorContainer}>
            <SearchBar placeholder="搜索" value={data.search} onCancel={handleCancal} onChange={handleChange} onSubmit={handleSubmit} />
            <PagingList
                dataSource={`${api.common.TRACE_DYNAMIC_FUN}?organizationId=${config.organizationId}&functionId=${config.jyds}`}
                ref={listRef}
                ajaxMethod="get"
                renderItem={renderItem}
                ajaxParams={data}
            />
        </div>
    )
})