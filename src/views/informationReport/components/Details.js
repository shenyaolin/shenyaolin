import React, { memo, useState, useEffect, useRef } from "react";
import styles from "../index.less";
import storage from "framework/utils/storage";
import { getRouterInfo } from "framework/utils/url";
import { getListDetail } from "services/informationReport";
import imageSrc from 'framework/utils/imageSrc';
import classnames from "classnames";
import { showLoading, hideLoading } from "framework/utils/loading";
import Button from "framework/components/Button";
import { reLaunch } from "framework/utils/url";
import ImageCoverView from 'framework/components/ImageCoverView';

const problemType = { 1: "意见建议", 2: "办事服务", 3: "环境卫生", 4: "信访举报", 5: "其他" }
const evaluation = ["非常满意", "满意", "一般", "差", "非常差",]

document.title = "意见箱";
export default memo(() => {
    const [results, setResults] = useState({})
    const [show, setshow] = useState(false)
    const userType = storage.get("userType")
    const viewRef = useRef(null)
    const getListDetails = async (messageId) => {
        const { state, results } = await getListDetail({ messageId })
        if (state === 200) {
            setResults(results)
            setshow(true)
            hideLoading()
        }
    }

    useEffect(() => {
        showLoading({ duration: 999 });
        const { query } = getRouterInfo();
        query && getListDetails(query.messageId)
    }, [])

    const handleImgSize = (img) => {
        const length = results.image.split(',').length
        if (length === 1) return "imgs1"
        if (length === 2) return "imgs2"
        if (length >= 3) return "imgs3"
    }

    const handleImageClick = (item) => {
        const images = item.split(",")
        viewRef.current.show({ images })
    }

    return (
        <>
            {
                show && <>
                    <div className={styles.detailContainer}>
                        <div className={styles.problemType}>{problemType[results.problemType]}</div>
                        <div className={styles.userMsg}>
                            <span>{results.sendType === 1 ? results.name : "匿名"}</span>
                            <span>{results.createTime}</span>
                        </div>
                        <div className={styles.detailDescription}>{results.detailDescription}</div>
                        <div className={styles.imgs}>
                            {
                                results.image && results.image.split(',').map((img, index) => {
                                    return <img className={classnames(styles[handleImgSize(results.image)])} key={index} alt="" src={imageSrc(img)} onClick={() => handleImageClick(img)} />
                                })
                            }
                        </div>
                        <div className={classnames(styles.reply, userType === 2 && results.adoptionStatus === 1 && results.evaluation === 0 && styles.reply1)}>
                            <div className={styles.replyTitle}>回复信息</div>
                            <div className={styles.replyContent}>
                                {
                                    results.adviceReply ?
                                        <div>
                                            <div className={styles.replyContentHeader}>
                                                <div>已回复<span>{results.updateTime}</span></div>
                                                <div>郝家冲村</div>
                                            </div>
                                            <div className={styles.replyContentCenter}>
                                                <div>答复意见</div>
                                                <div style={{ color: results.adoptionStatus === 1 ? "#00B772" : "#FF5C00" }} className={styles.adoptState}>{results.adoptionStatus === 1 ? "已采纳" : '未采纳'}</div>
                                                <div className={styles.adviceReply}>{results.adviceReply}</div>
                                            </div>
                                        </div> :
                                        "暂无回复!"
                                }
                            </div>
                        </div>
                        {
                            results.evaluation > 0 && <div className={styles.evaluate}>
                                <div className={styles.evaluateTitle}>评价</div>
                                <div className={styles.evaluateContent}>处理结果 {evaluation[results.evaluation - 1]}</div>
                            </div>
                        }
                        {
                            userType === 2 && results.adoptionStatus === 1 && results.evaluation === 0 && <div className={styles.acceptanceBtn}><Button onClick={() => reLaunch({
                                pathname: "/informationReport/evaluate",
                                query: { messageId: results.messageId }
                            })}>评价
                            </Button>
                            </div>
                        }
                    </div>
                    < ImageCoverView ref={viewRef} />
                </>
            }
        </>
    );
});
