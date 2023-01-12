import React, { memo, useState, useCallback, useEffect, useRef } from "react";
import styles from "../index.less";
import { getRouterInfo } from "framework/utils/url";
import { getOneList, inspection } from "services/myPatrol";
import { showLoading, hideLoading } from "framework/utils/loading";
import classnames from "classnames";
import Button from "framework/components/Button";
import { wxPushUrl, pushUrl } from "framework/utils/url";
import address from "assets/images/newImg/address3.png";
import taskMessage from "assets/images/newImg/taskMessage.png";
import gridMember from "assets/images/newImg/gridMember.png";
import progressTracking from "assets/images/newImg/progressTracking.png";
import stepActive from "assets/images/newImg/stepActive.png";
import step from "assets/images/newImg/step.png";
import imageSrc from "framework/utils/imageSrc";
import scanQrcode from "framework/common/scanQrcode";
import ImageCoverView from 'framework/components/ImageCoverView';

const taskNameType = {
  1: "重点户帮扶",
  2: "重点户看望",
  3: "重点户巡检",
};

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

const taskType = { 1: "帮扶", 2: "看望", 3: "巡检" };

const tabs = [{ label: "任务信息" }, { label: "巡检纪要" }];
//任务信息
const taskModule = [
  {
    title: "任务基础信息",
    icon: taskMessage,
    children: [
      { name: "巡检日期", field: "inspectionDate" },
      { name: "任务类型", field: "taskType" },
      { name: "巡检对象", field: "inspectionObject" },
      { name: "家庭状态", field: "familyType" },
      { name: "任务说明", field: "explanation" },
    ],
  },
  {
    title: "巡检对象位置",
    icon: address,
    children: [
      { name: "乡镇街道", field: "townshipName" },
      { name: "所在村", field: "villageName" },
      { name: "自然村", field: "naturalVillageName" },
      { name: "门牌号", field: "houseNumber" },
    ],
  },
  {
    title: "网格员信息",
    icon: gridMember,
    children: [{ name: "网格员", field: "name" }],
  },
  {
    title: "进度跟踪",
    icon: progressTracking,
  },
];
// 巡检纪要
const InspectionSummary = [
  { title: "巡检对象", field: "inspectionObject" },
  { title: "家庭状态", field: "familyType" },
  { title: "完成巡检日期", field: "completeTime" },
  { title: "任务类型", field: "taskType" },
  { title: "巡检纪要", field: "summary" },
  { title: "巡检照片", field: "image" },
];

document.title = "巡检记录";
export default memo(() => {
  const [results, setResults] = useState({});
  const [show, setShow] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);
  const viewRef = useRef(null)
  const getList = useCallback(async (recordId) => {
    const { state, results } = await getOneList({ recordId });
    if (state === 200) {
      setResults(results);
      setShow(true);
      hideLoading();
    }
  }, []);

  const handleTabClick = useCallback((index) => {
    setTabIndex(index);
  });
  const handleClick = (item, path) => async (e) => {
    e.stopPropagation();
    if (path === "/myPatrol/summary") {
      let res = await scanQrcode();
      // let res = "http://51cjm.cn/u/14/9000000986535743"
      console.log(res.split("/")[res.split("/").length - 1]);
      if (res) {
        pushUrl({
          pathname: path,
          query: {
            ...item,
            code: res.split("/")[res.split("/").length - 1],
            state: 1,
          },
        });
      }
    } else {
      wxPushUrl({ pathname: path, query: { ...item } });
    }
  };
  const handleField = useCallback(
    (item) => {
      if (item === "familyType") return familyType[results[item]];
      else if (item === "taskType") return taskType[results[item]];
      else if (item === "completeTime") return results[item].substring(0, 10);
      else if (item === "inspectionDate") return results[item].substring(0, 10);
      else if (item === "image") {
        const { image } = results;
        return (
          image.split(",").length > 0 &&
          image.split(",").map((item, index) => {
            return <img alt="" src={imageSrc(item)} key={index} onClick={() => handleImageClick(item)} />;
          })
        );
      } else return results[item];
    },
    [results]
  );

  const handleImageClick = (item) => {
    const images = item.split(",")
    viewRef.current.show({ images })
  }

  useEffect(() => {
    showLoading({ duration: 999 });
    const { query } = getRouterInfo();
    query && query.recordId && getList(query.recordId);
  }, [getList]);

  const handleTabChange = useCallback(() => {
    return tabIndex === 0 ? (
      taskModule.map((item, index) => {
        return (
          <div className={styles.moduleItem} key={index}>
            <div className={styles.moduleTitle}>
              <img alt="" src={item.icon} />
              {item.title}
            </div>
            {item.children &&
              item.children.map((item1, index1) => {
                return (
                  <div className={styles.moduleContent} key={index1}>
                    <div className={styles.moduleContentName}>{item1.name}</div>
                    <div className={styles.moduleContentContent}>
                      {handleField(item1.field)}
                    </div>
                  </div>
                );
              })}
            {!item.children ? (
              results.status === 0 ? (
                <div className={styles.articleSteps}>
                  <div className={classnames(styles.stepItem, styles.active)}>
                    <img alt="" src={stepActive} />
                    <div className={styles.patrolDate}>指定巡检日期</div>
                    <div>{results.inspectionDate}</div>
                  </div>
                  <div className={styles.stepItem}>
                    <img alt="" src={step} />
                    <div className={styles.patrolDate}>创建任务</div>
                    <div>{results.inspectionDate}</div>
                  </div>
                </div>
              ) : (
                <div className={styles.articleSteps}>
                  <div className={classnames(styles.stepItem, styles.active)}>
                    <img alt="" src={stepActive} />
                    <div className={styles.patrolDate}>完成任务</div>
                    <div>{results.completeTime}</div>
                  </div>
                  <div className={styles.stepItem}>
                    <img alt="" src={step} />
                    <div className={styles.patrolDate}>已受理</div>
                    <div>{results.inspectionDate}</div>
                  </div>
                </div>
              )
            ) : null}
          </div>
        );
      })
    ) : (
      <div className={styles.InspectionSummary}>
        {InspectionSummary.map((item, index) => {
          return (
            <div className={styles.summaryItem} key={index}>
              <div className={styles.summaryTitle}>{item.title}</div>
              <div className={styles.summaryContent}>
                {handleField(item.field)}
              </div>
            </div>
          );
        })}
      </div>
    );
  }, [
    tabIndex,
    results.status,
    results.inspectionDate,
    results.completeTime,
    handleField,
  ]);

  return (
    <>
      {show && <>
        <div
          className={styles.detailConfainer}
          style={{ paddingBottom: results.status === 0 && "1.08rem" }}
        >
          <div
            className={classnames(
              styles.positionBox,
              results.status === 2 && styles.positionBox1
            )}
          ></div>
          <div className={styles.header}>
            <div>{results.status === 2 ? "已完成" : "进行中"}</div>
          </div>
          <div className={styles.headerTitle}>
            <div className={styles.title}>
              {taskNameType[results.taskNameType]}
            </div>
            <div className={styles.taskNumber}>
              任务编号<span>{results.recordNo}</span>
            </div>
          </div>
          {results.status === 2 && (
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
                        alt=""
                      />
                    )}
                  </span>
                );
              })}
            </div>
          )}
          {handleTabChange()}
          {results.status === 0 && (
            <div className={styles.bottomBtns}>
              <Button
                onClick={() =>
                  wxPushUrl({
                    pathname: "/myPatrol/signIn",
                    query: { ...results },
                  })
                }
              >
                签到
              </Button>
              <Button onClick={handleClick(results, "/myPatrol/summary")}>
                巡检纪要
              </Button>
            </div>
          )}
        </div>
        <ImageCoverView ref={viewRef} />
      </>}
    </>
  );
});
