import React, { memo, useRef, useCallback, useEffect, useState } from "react";
import { SearchBar } from 'antd-mobile';
import PagingList from "framework/components/PagingList";
import styles from './index.less';
import { traceDynamicFun } from '../../services/common';
import config from '../../config/index.js'
import { wxPushUrl } from "framework/utils/url";
import imageSrc from 'framework/utils/imageSrc';
import moment from 'moment'

document.title = "村容风貌"
export default memo(() => {
    const [list, setList] = useState([])
    const [data, setData] = useState({ current: 1, pageSize: 5 })
    const listRef = useRef(null)
    const renderItem = useCallback((item, index) => {
      return (
        <div
          className={styles.listItem}
          key={index}
          onClick={() =>
            wxPushUrl({
              pathname: "/villageLandscape/detail",
              query: { Id: item.Id },
            })
          }
        >
          <div className={styles.introduce}>
            <div className={styles.name}>{item.bt}</div>
            <img src={imageSrc(item.fm)} alt="" />
            <div className={styles.direction}>
              <div> {moment(item.SortDateTime).format("YYYY-MM-DD HH:mm:ss")}</div>
            </div>
          </div>
        </div>
      );
    }, []);
    const getTraceDynamicFun = useCallback(async () => {
        const { list } = await traceDynamicFun(config.crfm, data)
        setList(list)
    }, [data])

    useEffect(() => {
        getTraceDynamicFun()
    }, [getTraceDynamicFun])
    return (
        <div className={styles.villageLandscapeContainer}>
            {
                list && list.length > 0 && <PagingList
                    dataSource={list}
                    ref={listRef}
                    renderItem={renderItem}
                />
            }
        </div>
    )
})