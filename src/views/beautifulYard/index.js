/*
 * @Descripttion:
 * @version:
 * @Author: yinzi
 * @Date: 2022-04-14 15:09:55
 * @LastEditors: yinzi
 * @LastEditTime: 2022-04-19 10:26:59
 */
import React, { memo, useRef, useCallback, useEffect, useState } from "react";
import PagingList from "framework/components/PagingList";
import styles from "./index.less";
import api from "config/api";
import { pushUrl } from "framework/utils/url";
import imageSrc from "framework/utils/imageSrc";

document.title = "美丽庭院";

export default memo(() => {
  const [data, setData] = useState({ current: 1, pageSize: 5 });
  const listRef = useRef(null);

  const refresh = () => {
    listRef.current.refresh();
  };
  const renderItem = useCallback((item, index) => {
    const img = item.image && item.image.split(",")[0];
    return (
      <div
        className={styles.listItem}
        key={index}
        onClick={() =>
          pushUrl({
            pathname: "/beautifulYard/detail",
            query: { gardenId: item.gardenId },
          })
        }
      >
        <div className={styles.introduce}>
          <div className={styles.name}>
            <div>{item.householder}家</div>
            <div>评分{item.fraction}</div>
          </div>
          <img src={imageSrc(img)} alt="" />
          <div className={styles.direction}>
            <div>{item.createTime}</div>
          </div>
        </div>
      </div>
    );
  }, []);

  useEffect(() => {
    refresh();
  }, [data]);
  return (
    <div className={styles.beautifulYard}>
      <PagingList
        dataSource={api.beautifulYard.GET_LIST}
        ref={listRef}
        renderItem={renderItem}
        ajaxParams={data}
      />
    </div>
  );
});
