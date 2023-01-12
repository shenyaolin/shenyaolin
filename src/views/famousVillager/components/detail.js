/*
 * @Descripttion:
 * @version:
 * @Author: yinzi
 * @Date: 2022-04-14 15:11:54
 * @LastEditors: yinzi
 * @LastEditTime: 2022-04-18 17:14:28
 */
import React, { memo, useState, useEffect } from "react";
import { famousVillagerDetail } from "services/news";
import styles from "../index.less";
import { getRouterInfo } from "framework/utils/url";

document.title = "村贤事迹";

function Detail() {
  const [detailData, setDetailData] = useState("");

  useEffect(() => {
    const { query } = getRouterInfo();
    const getData = async () => {
      const { state, results } = await famousVillagerDetail({
        talentId: query.talentId,
      });
      if (state === 200) {
        setDetailData(results);
      }
      // setDetailData(results)
    };
    getData();
  }, []);

  return (
    detailData && (
      <div className={styles.famousVillagerDetail}>
        <div className={styles.title}>{`${detailData.talentName}:${detailData.deedsName}`}</div>
        <div className={styles.secondTit}>
          <div className={styles.time}>村贤：{detailData.talentName}</div>
          <div className={styles.time}>事迹时间：{detailData.deedsDate}</div>
        </div>
        <div
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: detailData.content }}
        ></div>
        <div className={styles.count}>
          <div className={styles.secondTit}>
            <div className={styles.time}>阅读量：{detailData.timeVisited}</div>
            <div className={styles.time}>创建时间：{detailData.createTime}</div>
          </div>
        </div>
      </div>
    )
  );
}

export default memo(Detail);
