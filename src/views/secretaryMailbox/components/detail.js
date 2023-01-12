/*
 * @Descripttion:
 * @version:
 * @Author: yinzi
 * @Date: 2022-04-12 16:50:31
 * @LastEditors: yinzi
 * @LastEditTime: 2022-06-09 20:30:11
 */
import React, { memo, useState, useEffect, useCallback, useRef } from "react";
import styles from "../index.less";
import { getRouterInfo } from "framework/utils/url";
import { getListDetail } from "services/mailbox";
import imageSrc from "framework/utils/imageSrc";
import classnames from "classnames";
import Button from "framework/components/Button";
import { redirectTo } from "framework/utils/url";
import ImageCoverView from 'framework/components/ImageCoverView';

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
  const viewRef = useRef(null)
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
              <div className={styles.progress_title}>
                <p>{`已回复\n${formData.replyDate}`}</p>
                <div>郝家冲村</div>
              </div>
              <div className={styles.replyContent}>
                {formData.replyContent}
              </div>
            </div>
          ) : (
            <p>暂无回复！</p>
          )}
        </div>
      </>
    );
  }

  const handleImageClick = (item) => {
    const images = item.split(",")
    viewRef.current.show({ images })
  }

  return (
    <>
      {show && (
        <>
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
                    return <img alt="" src={imageSrc(item)} key={index} onClick={() => handleImageClick(item)} />;
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
            {query && query.type === "1" && formData.status === 1 && formData.evaluateType == null && (
              <div
                onClick={() =>
                  redirectTo({
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
          <ImageCoverView ref={viewRef} />
        </>
      )}
    </>
  );
});
