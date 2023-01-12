import React, { memo, useState, useEffect, useCallback } from "react";
import { traceDynamicFunDetail } from "../../../services/common";
import config from "../../../config/index.js";
import styles from "../index.less";
import { getRouterInfo } from "framework/utils/url";
import moment from 'moment'

document.title = "村容风貌";
export default memo(() => {
  const [data, setData] = useState({});
  const getTraceDynamicFunDetail = useCallback(async (id) => {
    const data = await traceDynamicFunDetail(config.crfm, id);
    setData(data);
  }, []);
  useEffect(() => {
    const { query } = getRouterInfo();
    if (query && query.Id) {
      getTraceDynamicFunDetail(query.Id);
    }
  }, [getTraceDynamicFunDetail]);
  return (
    <div className={styles.villageLandscapeDetail}>
      <div
        className={styles.title}
      >{data.bt}</div>
      <div className={styles.secondTit}>
        <div className={styles.time}>{moment(data.SortDateTime).format("YYYY-MM-DD HH:mm:ss")}</div>
      </div>
      <div
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: data.nr }}
      ></div>
    </div>
  );
});
