/*
 * @Descripttion:
 * @version:
 * @Author: yinzi
 * @Date: 2022-04-14 15:11:54
 * @LastEditors: yinzi
 * @LastEditTime: 2022-04-15 17:50:21
 */
import React, { memo, useState, useEffect } from "react";
import { entrepreneurshipPolicyDetail } from "services/news";
import styles from "../index.less";
import { getRouterInfo } from "framework/utils/url";
import { showLoading, hideLoading } from "framework/utils/loading";

document.title = "创业政策";
const eventTypeList = [
  { label: "创业服务", type: 1 },
  { label: "就业服务", type: 2 },
  { label: "个体工商户服务", type: 3 },
];
function Detail() {
  const [detailData, setDetailData] = useState("");

  useEffect(() => {
    showLoading({ duration: 999 });
    const { query } = getRouterInfo();
    const getData = async () => {
      const { state, results } = await entrepreneurshipPolicyDetail({
        policyId: query.policyId,
      });
      if (state === 200) {
        setDetailData(results);
      }
      hideLoading()
      // setDetailData(results)
    };
    getData();
  }, []);

  return (
    detailData && (
      <>
        <div className={styles.entrepreneurshipPolicyDetail}>
          <div className={styles.title}>{detailData.name}</div>
          <div className={styles.secondTit}>
            <div className={styles.time}>{detailData.source}</div>
            <div className={styles.time}>
              {eventTypeList[detailData.type - 1].label}
            </div>
            <div className={styles.time}>{detailData.createTime}</div>
          </div>

          {/* <div className={styles.content}>{detailData.zcnr}</div> */}
          <div
            className={styles.content}
            dangerouslySetInnerHTML={{ __html: detailData.content }}
          ></div>
          <div className={styles.title}>申请流程</div>
          <div
            className={styles.content}
            dangerouslySetInnerHTML={{ __html: detailData.process }}
          ></div>
        </div>
        <div className={styles.count}>阅读量：{detailData.readNumber}</div>
      </>)
  );
}

export default memo(Detail);
