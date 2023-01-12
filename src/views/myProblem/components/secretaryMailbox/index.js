/*
 * @Descripttion:
 * @version:
 * @Author: yinzi
 * @Date: 2022-04-11 19:14:36
 * @LastEditors: yinzi
 * @LastEditTime: 2022-04-29 11:00:12
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
import RemoteSelect from "framework/components/Form/entry/RemoteSelect";
import Screen from './components/Screen'
const tabs = [
  { label: "公开信件", villageId: config.villageId },
  { label: "我的信件" },
];
document.title = "书记信箱";
export default memo((props) => {
  const [screenLength, setScreenLength] = useState(0)
  const [tabIndex, setTabIndex] = useState(0);
  const [parameter, setParameter] = useState({});
  const listRef = useRef(null);
  const userId = storage.get('userId')
  const handleTabClick = useCallback((index) => {
    setTabIndex(index);
  }, []);
  const [show, setShow] = useState(false)
  const selectRef = useRef(null)
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
  const refresh = useCallback(() => {
    listRef.current.refresh();
  }, []);

  // useEffect(() => {
  //   setParameter((prev) => {
  //     let obj = { ...prev };
  //     if (tabs[tabIndex].villageId) {
  //       obj = { ...prev, villageId: tabs[tabIndex].villageId || "" };
  //     } else {
  //       delete obj.villageId;
  //     }
  //     return {
  //       ...obj,
  //     };
  //   });
  //   refresh();
  // }, [refresh, tabIndex]);
  const handleScreen = useCallback((data) => {
    if (data === "close") {
      setShow(false);
    } else {
      let newData = {}
      if (data) {
        Object.keys(data).forEach(key => {
          if (data[key] !== undefined) {
            newData[key] = data[key]
          }
        })
        setScreenLength(Object.keys(newData).length)
        setParameter((prev) => (
          {
            ...prev,
            ...newData
          }
        ));
      } else {
        setParameter()
        setScreenLength(0)
      }
      refresh()
      setShow(false);
    }
  }, []);

  return (
    <div className={styles.mailbox}>


      {/* {tabs.map((item, index) => {
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
                    src={require("assets/images/newImg/Underline.png")}
                  />
                )}
              </span>
            );
          })} */}
      <div className={styles.topHeader}>
        {/* <div className={styles.address} onClick={() => selectRef.current.handleInputClick()} >浉河港镇/郝家冲村
          <RemoteSelect
            ref={selectRef}
            rsKey={`${Math.round(new Date() / 1000)}`}
          />
        </div> */}
        <div className={classnames(styles.screen, screenLength > 0 && styles.screenNum)} onClick={() => setShow(true)}>筛选{screenLength > 0 && <span>{screenLength}</span>}</div>
      </div>
      <Screen show={show} handleScreen={handleScreen}></Screen>
      <PagingList
        dataSource={`${api.mailbox.GET_LIST}?userId=${userId}`}
        ref={listRef}
        renderItem={renderItem}
        ajaxMethod="get"
        enableRefresh={true}
        ajaxParams={parameter}
      />
    </div>
  );
});
