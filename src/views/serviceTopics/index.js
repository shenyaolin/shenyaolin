/*
 * @Descripttion:
 * @version:
 * @Author: yinzi
 * @Date: 2022-03-21 20:29:43
 * @LastEditors: yinzi
 * @LastEditTime: 2022-04-18 17:11:38
 */
import React, { memo, useState, useCallback, useRef, useEffect } from "react";
import PagingList from "framework/components/PagingList";
import api from "src/config/api";
import Button from "framework/components/Button";
import Link from "framework/components/Link";
import styles from "./index.less";
import { getRouterInfo } from "framework/utils/url";
import imageSrc from "framework/utils/imageSrc";
import noImg from "../../assets/images/login-icon.png";
import storage from "framework/utils/storage";

function Notice() {
  const [otherHeight, setOtherHeight] = useState(false);
  const [query, setquery] = useState({});
  const contentRef = useRef(null);
  useEffect(() => {
    const query  = storage.get("information");
    document.title = query.name;
    setquery(query);
  }, []);

  const renderItem = useCallback((item, index) => {
    return (
      <div className={styles.noticeItem}>
        <Link key={index} href={`/serviceTopics/detail?id=${item.id}`}>
          <div className={styles.header}>
            <div className={styles.left}>
              <img
                src={require("../../assets/images/informationIcon.png")}
                alt=""
              />
              {item.title}
            </div>
            <div className={styles.click}></div>
          </div>
          <div className={styles.center}>
            <img
              src={item.picList.length > 0 ? imageSrc(item.picList[0]) : noImg}
              alt=""
            />
            {/* <img src={noImg} alt="" /> */}
            <div className={styles.list}>
              {item.subjectName && (
                <div className={styles.lineItem}>
                  <span className={styles.name}>主体名称：</span>
                  <span className={styles.value}>{item.subjectName}</span>
                </div>
              )}
              {item.contactMan && (
                <div className={styles.lineItem}>
                  <span className={styles.name}>联系人：</span>
                  <span className={styles.value}>{item.contactMan}</span>
                </div>
              )}
              {item.mobile && (
                <div className={styles.lineItem}>
                  <span className={styles.name}>联系电话：</span>
                  <span className={styles.value}>{item.mobile}</span>
                </div>
              )}
            </div>
          </div>
          <div className={styles.bottom}>
            {/* {moment(item.SortDateTime).format("YYYY-MM-DD HH:mm:ss")} */}
            {item.detail}
          </div>
        </Link>
      </div>
    );
  }, []);

  return (
    <>
      {query.informationType && (
        <div className={styles.noticeContent} ref={contentRef}>
          <div className={styles.noticeTitle}>信息平台</div>
          <PagingList
            dataSource={api.common.informationList}
            ajaxParams={{
              informationType: query.informationType,
            }}
            renderItem={renderItem}
            renderHeaderAlways
            // renderHeader={renderHeader}
            ajaxMethod="get"
            enableRefresh={false}
            otherHeight={otherHeight}
          />
          <Link
            href="/serviceTopics/add"
            style={{
              color: "#fff",
            }}
          >
            <Button type="bottom">我要发布</Button>
          </Link>
        </div>
      )}
    </>
  );
}

export default memo(Notice);
