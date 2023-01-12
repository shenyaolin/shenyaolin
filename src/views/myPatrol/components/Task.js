import React, { memo, useState, useCallback, useRef } from "react";
import { SearchBar } from "antd-mobile";
import styles from "../index.less";
import classnames from "classnames";
import PagingList from "framework/components/PagingList";
import { pushUrl } from "framework/utils/url";
import api from "config/api";
import scanQrcode from "framework/common/scanQrcode";
import Screen from './Screen';

const tabs = [
  { label: "进行中", status: 0 },
  { label: "已完成", status: 2 },
];
const main = [
  { label: "任务编号", field: "recordNo" },
  { label: "巡检日期", field: "inspectionDate" },
  { label: "任务类型", field: "taskType" },
  { label: "巡检对象", field: "inspectionObject" },
  { label: "家庭状态", field: "familyType" },
];
const completedMain = [
  { label: "任务编号", field: "recordNo" },
  { label: "完成巡检日期", field: "completeTime" },
  { label: "巡检对象", field: "inspectionObject" },
  { label: "家庭状态", field: "familyType" },
];

const familyType = {
  1: "扶贫户",
  2: "低保户",
  3: "扶贫低保户",
  4: "五保户",
  5: "一般贫困户",
  6: "建档立卡户",
  7: "一般农户",
  8: "特困户",
  9: "低保边缘户",
};

const taskType = {
  1: "帮扶",
  2: "看望",
  3: "巡检",
};

const taskNameType = {
  1: "重点户帮扶",
  2: "重点户看望",
  3: "重点户巡检",
};

export default memo(() => {
  const [tabIndex, setTabIndex] = useState(0);
  const [screenLength, setScreenLength] = useState(0);
  const [parameter, setParameter] = useState({ status: 0 });
  const [screenShow, setScreenShow] = useState(false);
  const listRef = useRef(null);
  const screenRef = useRef(null);

  const handleTabClick = useCallback((index) => {
    setTabIndex(index);
    setParameter({ status: tabs[index].status });
    screenRef.current.clear()
    setScreenLength(0)
    refresh();
  }, []);

  const handleClick = (item, path) => async (e) => {
    e.stopPropagation();
    if (path === "/myPatrol/summary") {
      let res = await scanQrcode();
      // let res = "http://51cjm.cn/u/14/9000000279957181"
      console.log(res.split("/")[res.split("/").length - 1]);
      if (res) {
        let query = {
          ...item,
          code: res.split("/")[res.split("/").length - 1],
          state: 1,
        }
        pushUrl({
          pathname: path,
          query: {
            ...query
          },
        });
      }
    } else {
      pushUrl({ pathname: path, query: { ...item } });
    }
  };

  const handleField = useCallback((data, field) => {
    if (field === "familyType") return familyType[data[field]];
    else if (field === "taskType") return taskType[data[field]];
    else if (field === "completeTime") return data[field] && data[field].substring(0, 10);
    else if (field === "inspectionDate") return data[field] && data[field].substring(0, 10);
    else return data[field];
  }, []);

  const handleJump = (item) => (e) => {
    e.stopPropagation();
    if (e.target.nodeName === "A") return false;
    pushUrl({
      pathname: "/myPatrol/detail",
      query: { recordId: item.recordId },
    });
  };

  const handleScreen = useCallback((data) => {
    if (data === "close") {
      setScreenShow(false);
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
        setParameter({ status: tabs[tabIndex].status })
        setScreenLength(0)
      }
      refresh()
      setScreenShow(false);
    }
  }, [tabIndex]);

  const renderItem = useCallback(
    (item, index) => {
      return (
        <div className={styles.listItem} key={index} onClick={handleJump(item)}>
          <div className={styles.head}>
            <div className={styles.title}>
              {taskNameType[item.taskNameType]}
            </div>
            <div
              className={classnames(
                styles.status,
                item.status === 2 && styles.complateStatus
              )}
            >
              {item.status === 2 ? "已完成" : "进行中"}
            </div>
          </div>
          <div className={styles.main}>
            {tabIndex === 0
              ? main.map((item1, index1) => {
                return (
                  <div key={index1} className={styles.mainItem}>
                    <div className={styles.mainLabel}>{item1.label}</div>
                    <div className={styles.mainContent}>
                      {handleField(item, item1.field)}
                    </div>
                  </div>
                );
              })
              : completedMain.map((item1, index1) => {
                return (
                  <div key={index1} className={styles.mainItem}>
                    <div className={styles.mainLabel}>{item1.label}</div>
                    <div className={styles.mainContent}>
                      {handleField(item, item1.field)}
                    </div>
                  </div>
                );
              })}
            <div className={styles.btn}>
              {tabIndex === 0 ? (
                <>
                  <button
                    onClick={handleClick(item, "/myPatrol/signIn")}
                    className={styles.signBtn}
                  >
                    签到
                  </button>
                  <a
                    href={`tel:${item.phone}`}
                    className={styles.dial}
                    onClick={() => false}
                  >
                    通知对象
                  </a>
                  <button onClick={handleClick(item, "/myPatrol/summary")}>
                    巡检纪要
                  </button>
                </>
              ) : (
                <button
                  onClick={() =>
                    pushUrl({
                      pathname: "/myPatrol/detail",
                      query: { recordId: item.recordId, status: item.status },
                    })
                  }
                  className={styles.see}
                >
                  查看
                </button>
              )}
            </div>
          </div>
        </div>
      );
    },
    [handleField, tabIndex]
  );

  const refresh = () => {
    listRef.current.refresh();
  };

  const handleInputChange = useCallback((e) => {
    setParameter((prev) => ({
      ...prev,
      search: e,
    }));
  }, []);

  // 搜索框清除事件
  const handleCancal = useCallback(() => {
    setParameter((prev) => ({
      ...prev,
      search: "",
    }));
    refresh();
  }, []);

  return (
    <div className={styles.taskContainer}>
      <div className={styles.header}>
        <SearchBar
          placeholder="搜索"
          value={(parameter && parameter.search) || ""}
          onCancel={handleCancal}
          onSubmit={() => refresh()}
          onChange={handleInputChange}
        />
        <div
          className={classnames(
            styles.screen,
            screenLength > 0 && styles.screenNum
          )}
          onClick={() => setScreenShow(true)}
        >
          筛选{screenLength > 0 && <span>{screenLength}</span>}
        </div>
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
                    src={require("../../../assets/images/newImg/Underline.png")}
                  />
                )}
              </span>
            );
          })}
        </div>
        <PagingList
          dataSource={api.myPatrol.GET_LIST}
          ref={listRef}
          renderItem={renderItem}
          ajaxMethod="get"
          ajaxParams={parameter}
        />
      </div>
      <Screen show={screenShow} handleScreen={handleScreen} ref={screenRef}></Screen>
    </div>
  )
});
