/*
 * @Descripttion:
 * @version:
 * @Author: yinzi
 * @Date: 2022-04-12 16:50:31
 * @LastEditors: yinzi
 * @LastEditTime: 2022-04-13 14:39:56
 */
import React, { memo, useState, useEffect, useCallback } from "react";
import styles from "../index.less";
import { getRouterInfo } from "framework/utils/url";
import { getListDetail } from "services/mailbox";
import imageSrc from "framework/utils/imageSrc";
import classnames from "classnames";
import Button from "framework/components/Button";
import { wxPushUrl } from "framework/utils/url";

const radioGroup = {
  0: "非常满意",
  1: "满意",
  2: "一般",
  3: "差",
  4: "非常差",
};
document.title = "信箱详情";
export default memo(() => {
  const { query } = getRouterInfo();
  const [formData, setformData] = useState({});
  const [show, setshow] = useState(false);
  const getListDetails = useCallback(async (mailboxId) => {
    const { state, results } = await getListDetail({ mailboxId });
    if (state === 200) {
      setformData(results);
      setshow(true);
    }
  }, []);

  const imgClass = useCallback((img) => {
    let length = 0;
    if (img && typeof img === "string") {
      length = img.split(",").length;
    }
    if (length === 1) return "images1";
    else if (length === 2) return "images2";
    else return "images3";
  }, []);

  useEffect(() => {
    getListDetails(query.mailboxId);
  }, [getListDetails, query.mailboxId]);

  function renderProgress(formData) {
    return (
      <>
        <div className={styles.progress_content}>
          {formData.status === 1 ? (
            <div>
              <p className={styles.progress_title}>
                {`已回复\n${formData.replyDate}`}
              </p>
              <div className={styles.replyContent}>
                {formData.replyContent}
                技能放入跨了个年太热乐购我过几天日后吉他谱融合鸡腿肉跑回家平台融合就突然破坏鸡腿肉排行鸡腿肉拍好看平台融合就突然跑回家桃皮绒好几天柔和突然好几天人品好鸡腿肉跑回家投入和突然好几天然后就套跑回家土壤耗竭桃皮绒就会疼日计划普通人节后钛合金top和静态裴如海土壤耗竭
              </div>
            </div>
          ) : (
            <p>暂无回复！</p>
          )}
        </div>
      </>
    );
  }
  return (
    <>
      {show && (
        <div className={styles.details}>
          <div className={styles.subject}>
            <div className={styles.headerTitle}>{formData.title}</div>
            <div className={styles.center}>
              <div className={styles.createTime}>{formData.name || "匿名"}</div>
              <div className={styles.createTime}>{formData.createTime}</div>
            </div>
            <div className={styles.description}>{formData.content}</div>
            <div
              className={classnames(
                styles.images,
                styles[imgClass(formData.image)]
              )}
            >
              {formData.image &&
                formData.image.split(",").map((item, index) => {
                  return <img alt="" src={imageSrc(item)} key={index} />;
                })}
            </div>
          </div>
          <div className={styles.steps}>
            <div className={styles.bottomHeader}>回复信息</div>
            <div className={styles.progress_box}>
              {show && renderProgress(formData)}
            </div>
          </div>
          {formData.evaluateType == null ? (
            " "
          ) : (
            <div className={styles.evaluate}>
              <div className={styles.bottomHeader}>评价</div>
              <div className={styles.content}>
                处理结果{radioGroup[formData.evaluateType]}
              </div>
            </div>
          )}
          {query && query.type === "1" && (
            <div
              onClick={() =>
                wxPushUrl({
                  pathname: "/secretaryMailbox/evaluate",
                  query: { mailboxId: formData.mailboxId },
                })
              }
              className={styles.acceptanceBtn}
            >
              <Button>评价</Button>
            </div>
          )}
        </div>
      )}
    </>
  );
});
