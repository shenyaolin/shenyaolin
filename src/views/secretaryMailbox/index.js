/*
 * @Descripttion:
 * @version:
 * @Author: yinzi
 * @Date: 2022-04-11 19:14:36
 * @LastEditors: yinzi
 * @LastEditTime: 2022-06-08 19:23:07
 */
import React, { memo, useState, useCallback, useRef, useEffect } from "react";
import styles from "./index.less";
import classnames from "classnames";
import Button from "framework/components/Button";
import PagingList from "framework/components/PagingList";
import { wxPushUrl } from "framework/utils/url";
import api from "config/api";
import config from "src/config/index.js";
import imageSrc from "framework/utils/imageSrc";
import storage from "framework/utils/storage";

const tabs = [
  { label: "公开信件", villageId: config.villageId },
  { label: "我的信件" },
];
document.title = "书记信箱";
export default memo((props) => {
  const [tabIndex, setTabIndex] = useState(0);
  const [parameter, setParameter] = useState({});
  const listRef = useRef(null);
  const refresh = useCallback(() => {
    listRef.current.refresh();
  }, []);
  const handleTabClick = useCallback(
    (index) => {
      setTabIndex(index);
      setParameter((prev) => {
        let obj = { ...prev };
        if (!tabs[index].villageId) {
          obj = { ...obj, userId: storage.get("userId") };
        } else {
          delete obj.userId;
        }
        return {
          ...obj,
        };
      });
      refresh();
    },
    [refresh]
  );
  const imgClass = useCallback((img) => {
    let length = 0;
    if (img && typeof img === "string") {
      length = img.split(",").length;
    }
    if (length === 1) return "images1";
    else if (length === 2) return "images2";
    else return "images3";
  }, []);

  const renderItem = useCallback(
    (item, index) => {
      return (
        <div
          className={styles.listItem}
          key={index}
          onClick={() =>
            wxPushUrl({
              pathname: "/secretaryMailbox/detail",
              query: { mailboxId: item.mailboxId, type: tabIndex },
            })
          }
        >
          <div className={styles.box}>
            <div className={styles.description}>{item.title}</div>
          </div>
          <div className={styles.box1}>
            <div className={styles.name}>{item.name ? item.name : "匿名"}</div>
            <div className={styles.createTime}>{item.createTime}</div>
          </div>
          <div className={styles.box}>
            <div
              className={classnames(
                styles.images,
                styles[imgClass(item.image)]
              )}
            >
              {item.image &&
                item.image.split(",").map((item1, index1) => {
                  return <img alt="" src={imageSrc(item1)} key={index1} />;
                })}
            </div>
          </div>
        </div>
      );
    },
    [imgClass, tabIndex]
  );

  // useEffect(() => {
  //   console.log(111);

  // }, [refresh, tabIndex]);

  return (
    <div className={styles.mailbox}>
      <div className={styles.content}>
        <div className={styles.tabs}>
          {tabs.map((item, index) => {
            return (
              <span
                key={index}
                className={classnames(
                  styles.tab,
                  tabIndex === index && styles.tabActive
                )}
                onClick={() => {
                  handleTabClick(index);
                }}
              >
                {item.label}
                {tabIndex === index && (
                  <img
                    alt=""
                    src={require("../../assets/images/newImg/Underline.png")}
                  />
                )}
              </span>
            );
          })}
        </div>
        <PagingList
          dataSource={api.mailbox.GET_LIST}
          ref={listRef}
          renderItem={renderItem}
          ajaxMethod="get"
          enableRefresh={true}
          ajaxParams={parameter}
        />
        <div className={styles.bottomBtn}>
          <Button
            onClick={() => wxPushUrl({ pathname: "/secretaryMailbox/add" })}
          >
            写信
          </Button>
        </div>
      </div>
    </div>
  );
});
