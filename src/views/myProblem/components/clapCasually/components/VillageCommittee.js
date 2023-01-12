import React, { memo, useState, useCallback, useRef, useEffect } from "react";
import { SearchBar } from 'antd-mobile';
import styles from "../index.less";
import classnames from "classnames";
import PagingList from "framework/components/PagingList";
import { wxPushUrl } from "framework/utils/url";
import api from "config/api";
import Screen from './Screen'

const tabs = [{ label: "待受理", eventStatus: 1 }, { label: "已办结", eventStatus: 3 }];
const main = [
  { label: "事件类型", field: "type" },
  { label: "上报人", field: "userName" },
  { label: "事件描述", field: "description" },
];

const subjectList = [
  { label: '矛盾纠纷', type: 1 },
  { label: '安全隐患', type: 2 },
  { label: '环境卫生', type: 3 },
  { label: '道路安全', type: 4 },
  { label: '疫情防控', type: 5 },
  { label: '消防安全', type: 6 },
  { label: '食品安全', type: 7 },
]

export default memo(() => {
  const [tabIndex, setTabIndex] = useState(0);
  const [screenLength, setScreenLength] = useState(0)
  const [parameter, setParameter] = useState({
    eventStatus: 1
  })
  const [show, setShow] = useState(false)
  const listRef = useRef(null);

  const handleTabClick = useCallback((index) => {
    setTabIndex(index);
  });

  const renderItem = useCallback((item, index) => {
    return (
      <div className={styles.listItem} key={index}>
        <div className={styles.head}>
          <div className={styles.title}>{`${subjectList[item.type - 1].label}事件`}</div>
          <div className={styles.date}>{item.createTime}</div>
        </div>
        <div className={styles.main}>
          {main.map((item1, index1) => {
            return (
              <div key={index1} className={styles.mainItem}>
                <div className={styles.mainLabel}>{item1.label}</div>
                <div className={styles.mainContent}>{
                  item1.label === "事件类型" ? subjectList[item.type - 1].label : item[item1.field]
                }</div>
              </div>
            );
          })}
          <div className={styles.btn}>
            {
              tabIndex === 0 ? <button onClick={() => wxPushUrl({ pathname: "/clapCasually/details", query: { snapshotId: item.snapshotId, eventStatus: String(tabIndex) } })}>去受理</button>
                :
                <div onClick={() => wxPushUrl({ pathname: "/clapCasually/details", query: { snapshotId: item.snapshotId, eventStatus: tabIndex } })}>已办结</div>
            }
          </div>
        </div>
      </div >
    );
  }, [tabIndex]);

  useEffect(() => {
  }, [tabIndex, parameter])

  const refresh = () => {
    listRef.current.refresh()
  }

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
        setParameter({ eventStatus: 1 })
        setScreenLength(0)
      }
      refresh()
      setShow(false);
    }
  }, []);

  const handleInputChange = useCallback((e) => {
    setParameter((prev) => ({
      ...prev,
      search: e
    }))
  }, [])

  return (
    <>
      <div className={styles.villageCommittee}>
        <div className={styles.header}>
          <SearchBar placeholder="搜索" value={(parameter && parameter.search) || ""} onSubmit={() => refresh()} onChange={handleInputChange} />
          <div className={classnames(styles.screen, screenLength > 0 && styles.screenNum)} onClick={() => setShow(true)}>筛选{screenLength > 0 && <span>{screenLength}</span>}</div>
        </div>
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
                      src={require("assets/images/newImg/Underline.png")}
                    />
                  )}
                </span>
              );
            })}
          </div>
          <PagingList
            dataSource={api.list.GET_LIST}
            ref={listRef}
            renderItem={renderItem}
            ajaxMethod="get"
            ajaxParams={parameter}
          />

        </div>
        <Screen show={show} isShow={false} handleScreen={handleScreen}></Screen>
      </div>
    </>
  );
});
