/*
 * @Descripttion:
 * @version:
 * @Author: yinzi
 * @Date: 2022-04-14 15:09:55
 * @LastEditors: yinzi
 * @LastEditTime: 2022-04-19 17:07:20
 */
import React, { memo, useRef, useCallback, useEffect, useState } from "react";
import PagingList from "framework/components/PagingList";
import styles from "./index.less";
import api from "config/api";
import { wxPushUrl } from "framework/utils/url";
import imageSrc from "framework/utils/imageSrc";

document.title = "村贤事迹";

export default memo(() => {
  const [data, setData] = useState({ current: 1, pageSize: 5 });
  const listRef = useRef(null);

  const refresh = () => {
    listRef.current.refresh();
  };
  const renderItem = useCallback((item, index) => {
    return (
      <div
        className={styles.listItem}
        key={index}
        onClick={() =>
          wxPushUrl({
            pathname: "/famousVillager/detail",
            query: { talentId: item.talentId },
          })
        }
      >
        <div className={styles.introduce}>
          <div className={styles.name}>{`${item.talentName}:${item.deedsName}`}</div>
          <img src={imageSrc(item.image)} alt="" />
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
    <div className={styles.famousVillager}>
      <PagingList
        dataSource={api.famousVillager.GET_LIST}
        ref={listRef}
        renderItem={renderItem}
        ajaxParams={data}
      />
    </div>
  );
});
