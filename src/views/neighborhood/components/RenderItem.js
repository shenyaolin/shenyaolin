import React, { memo, useCallback, useState, useRef } from "react";
import styles from '../index.less'
import { pushUrl } from "framework/utils/url";
import classnames from 'classnames'
import portrait from "assets/images/newImg/portrait.png";
import { addSubscription, addApprove } from 'services/neighborhood.js'
import imageSrc from 'framework/utils/imageSrc';
import storage from 'framework/utils/storage';
import approve from 'assets/images/newImg/approve.png';
import approveRed from 'assets/images/newImg/approveRed.png';
import comment from 'assets/images/newImg/comment1.png';
import plus from 'assets/images/newImg/plus.png';
import checkGray from 'assets/images/newImg/check-gray.png';
import VideoUpload from "framework/components/VideoUpload";
import ImageCoverView from 'framework/components/ImageCoverView';

export default memo(({ item, refresh, handlerefresh, imgShow }) => {
    const [loading, setLoading] = useState(false)
    const viewRef = useRef(null)

    //这里输入的时间戳
    const timeFormat = (timestamp) => {
        var mistiming = Math.round(Number(Date.now() - timestamp) / 1000) === 0 ? 1 : Math.round(Number(Date.now() - timestamp) / 1000);
        var arrr = ['年', '个月', '周', '天', '小时', '分钟', '秒'];
        var arrn = [31536000, 2592000, 604800, 86400, 3600, 60, 1];
        for (var i = 0; i < arrn.length; i++) {
            var inm = Math.floor(mistiming / arrn[i]);
            if (inm !== 0) {
                return inm + arrr[i] + '前';
            }
        }
    }

    // 关注
    const handleAddSubscription = useCallback(async (e) => {
        e.stopPropagation()
        if (!loading) {
            setLoading(true)
            let status = item.subscription ? -1 : 1
            const { state } = await addSubscription({
                subscriberId: item.userId, userId: storage.get('userId'), status
            })
            if (state === 200) {
                refresh()
            }
            setLoading(false)
        }
    }, [loading, item.subscription, item.userId, refresh])

    // 点赞
    const handleLikeCount = useCallback(async (e) => {
        e.stopPropagation()
        if (!loading) {
            setLoading(true)
            let status = item.isApprove ? -1 : 1
            const { state } = await addApprove({
                userName: storage.get('userInfo').name || storage.get('userInfo').nickName, userId: storage.get('userId'), status, neighborhoodId: item.neighborhoodId
            })
            if (state === 200) {
                handlerefresh ? handlerefresh(item.neighborhoodId) : refresh()
            }
            setLoading(false)
        }

    }, [loading, item.isApprove, item.neighborhoodId, refresh])

    const images = item.image && item.image.split(",")

    const handleUploadType = useCallback(({ type }) => {
        if (type === 1) {
            return images && images.length > 0 && <div className={classnames(images.length === 1 ? styles.image1 : styles.image2, imgShow && styles.detailImg)}>
                {
                    images.map((item1, index1) => {
                        return (
                            <img alt="" src={imageSrc(item1)} key={index1} onClick={() => handleImageClick(item1)} />
                        )
                    })
                }
            </div>
        } else if (type === 2) {
            return <div className={styles.videoBox} onClick={(e) => e.stopPropagation()}>
                <VideoUpload
                    className={styles.videoUpload}
                    maxLength={1}
                    value={images[0]}
                />
            </div>
        }
    }, [images, item.type])

    const handleImageClick = (item) => {
        if (!imgShow) return
        const images = item.split(",")
        viewRef.current.show({ images })
    }

    return <>
        <div className={styles.listItem} onClick={() => pushUrl({ pathname: '/neighborhood/detail', query: { neighborhoodId: item.neighborhoodId } })}>
            <div className={styles.header}>
                <div className={styles.headerLeft}>
                    <img alt="" src={imageSrc(item.headPortrait || portrait)} />
                    <div>
                        <div className={styles.name}>{item.name || item.nickName}</div>
                        <div className={styles.createTime}>{timeFormat(new Date(item.createTime.replace(/-/g, '/')).getTime())}</div>
                    </div>
                </div>
                <div className={classnames(styles.headerRight, item.subscription && styles.filterColor)} onClick={handleAddSubscription}>
                    <img alt="" src={item.subscription ? checkGray : plus} />
                    {item.subscription ? "已关注" : "关注"}
                </div>
            </div>
            <div className={styles.content}>{item.content}</div>
            {
                handleUploadType(item)
            }
            {item.location && <div className={styles.location}><img alt="" src={require('../../../assets/images/newImg/address1.png')} />{item.location}</div>}
            <div className={styles.footer}>
                <div className={styles.comment}>
                    <img alt="" src={comment} />
                    {item.commentNumber}</div>
                <div onClick={handleLikeCount} className={classnames(item.likeCount && styles.likeCount)}>
                    <img alt="" src={item.isApprove ? approveRed : approve} />
                    {item.likeCount}</div>
            </div>
        </div>
        <ImageCoverView ref={viewRef} />
    </>
}) 