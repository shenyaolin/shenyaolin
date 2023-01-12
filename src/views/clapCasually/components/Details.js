import React, { memo, useState, useEffect, useCallback, useRef } from "react";
import styles from "../index.less";
import storage from "framework/utils/storage";
import { getRouterInfo } from "framework/utils/url";
import { getListDetail, setAcceptance } from "services/list";
import imageSrc from 'framework/utils/imageSrc';
import classnames from "classnames";
import Button from "framework/components/Button";
import { pushUrl } from "framework/utils/url";
import { showLoading, hideLoading } from "framework/utils/loading";
import ImageCoverView from 'framework/components/ImageCoverView';

const stateList = { 2: '已受理', 3: '已办结' };

const subjectList = [
  { label: '矛盾纠纷', type: 1 },
  { label: '安全隐患', type: 2 },
  { label: '环境卫生', type: 3 },
  { label: '道路安全', type: 4 },
  { label: '疫情防控', type: 5 },
  { label: '消防安全', type: 6 },
  { label: '食品安全', type: 7 },
]

const radioGroup = { 0: "非常满意", 1: "满意", 2: "一般", 3: "差", 4: "非常差" }

document.title = "随手拍";
export default memo(() => {
  const [snapshot, setSnapshot] = useState({})
  const [show, setshow] = useState(false)
  const userType = storage.get("userType")
  const [eventStatus, setEventStatus] = useState();
  const viewRef = useRef(null)
  const getListDetails = useCallback(async (snapshotId) => {
    const { state, results } = await getListDetail({ snapshotId })
    if (state === 200) {
      setSnapshot(results);
      setshow(true)
    }
    hideLoading()
  }, [])

  const handleSetAcceptance = useCallback(async () => {
    const { snapshotId } = snapshot
    const { state } = await setAcceptance({ snapshotId: snapshotId })
    if (state === 200) {
      pushUrl({
        pathname: "/clapCasually/acceptance",
        query: { snapshotId: snapshotId }
      })
    }
  })

  const imgClass = useCallback((img) => {
    let length = 0
    if (img && typeof img === "string") {
      length = img.split(",").length
    }
    if (length === 1) return "images1"
    else if (length === 2) return "images2"
    else return "images3"
  })

  useEffect(() => {
    showLoading({ duration: 999 });
    const { query } = getRouterInfo();
    query && getListDetails(query.snapshotId)
    query.eventStatus && setEventStatus(query.eventStatus)
  }, [getListDetails])

  function reversePeople(array) {
    let newArr = [];
    for (let i = array.length - 1; i >= 0; i--) {
      newArr[newArr.length] = array[i];
    }
    return newArr;
  }

  const renderProgress = useCallback(() => {
    const { list } = snapshot
    var newList = reversePeople(list)
    return (
      <>
        {
          newList && newList.length == 1 ? <li className={styles.progress}>您上报的事件正在处理中~</li> :
            newList.map((item, index) => {
              return (
                <li className={classnames(index === 0 && styles.last_progress, item.image && styles.leavingImgs, newList.length === 2 && styles.acceptd)} key={index}>
                  <div className={classnames(styles.progress_title, styles.active)}>
                    <div className={classnames(styles.stepHeader, index > 0 && styles.stepHeader1)}>
                      <div>
                        <div>{stateList[item.schedule]}</div>
                        <div>{item.createTime}</div>
                      </div>
                      <div>郝家冲村</div>
                    </div>
                    {
                      index === 0 && item.schedule === 3 && <div className={styles.message}>
                        <div className={styles.leavingMessage}>留言:{item.reply}</div>
                        <div className={styles.imgMessage}>
                          {
                            item.image && item.image.split(',').map((item1, index1) => {
                              return <img src={imageSrc(item1)} key={index1} onClick={() => handleImageClick(item1)} />
                            })
                          }
                        </div>
                      </div>
                    }
                  </div>
                </li>
              )
            })
        }
      </>)
  }, [snapshot])

  const handleImageClick = (item) => {
    const images = item.split(",")
    viewRef.current.show({ images })
  }

  return (
    <>
      {
        show && <>
          <div className={classnames(styles.details, (userType === 2 && (snapshot.evaluateType === -1) && snapshot.list.length > 0 && snapshot.list[snapshot.list.length - 1].schedule === 3) && styles.marginBottom)}>
            <div className={styles.subject}>
              <div className={styles.headerTitle}>基础信息</div>
              <div className={styles.center}>
                <div className={styles.subjectList}>
                  {
                    subjectList[snapshot.type - 1].label
                  }
                </div>
                <div className={styles.createTime}>{snapshot.createTime}</div>
              </div>
              <div className={styles.description}>
                {snapshot.description}
              </div>
              <div className={classnames(styles.images, styles[imgClass(snapshot.eventImage)])}>
                {
                  snapshot.eventImage && snapshot.eventImage.split(',').map((item, index) => {
                    return <img src={imageSrc(item)} key={index} onClick={() => handleImageClick(item)} />
                  })
                }
              </div>
              <div className={styles.villageName}>{snapshot.villageName}</div>
            </div>
            <div className={classnames(styles.steps)}>
              <div className={styles.bottomHeader}>事件进度</div>
              <ul className={styles.progress_box}>
                {
                  show && renderProgress(snapshot)
                }
              </ul>
            </div>
            {
              snapshot.evaluateType === -1 ? " " : <div className={styles.evaluate}>
                <div className={styles.bottomHeader}>评价</div>
                <div className={styles.content}>处理结果{radioGroup[snapshot.evaluateType]}</div>
              </div>
            }
            {
              userType === 1 && eventStatus == 0 && <div className={styles.acceptanceBtn}><Button onClick={handleSetAcceptance}>受理</Button></div>
            }
            {
              userType === 2 && (snapshot.evaluateType === -1) && snapshot.list.length > 0 && snapshot.list[snapshot.list.length - 1].schedule === 3 && <div className={styles.acceptanceBtn}><Button onClick={() => pushUrl({
                pathname: "/clapCasually/evaluate",
                query: { snapshotId: snapshot.snapshotId }
              })}>评价
              </Button>
              </div>
            }
          </div>
          <ImageCoverView ref={viewRef} />
        </>
      }
    </>
  );
});
