import React, { memo, useEffect, useRef, useState, useCallback } from "react";
import styles from '../index.less';
import { getListDetails, addComment } from 'services/neighborhood.js';
import storage from 'framework/utils/storage';
import RenderItem from './RenderItem';
import portrait from "assets/images/newImg/portrait.png";
import { getRouterInfo } from "framework/utils/url";
import NoData from 'framework/components/NoData';
import nodata from 'assets/images/newImg/NoData.png';
import Input from "framework/components/Form/entry/Input";
import PagingList from "framework/components/PagingList";
import message from 'framework/utils/message';
import { showLoading, hideLoading } from "framework/utils/loading";
import Button from 'framework/components/Button';
import imageSrc from 'framework/utils/imageSrc';

document.title = '乡邻圈'
export default memo(() => {
    const [item, setItem] = useState({})
    const [show, setShow] = useState(false)
    const [content, setContent] = useState()
    const [neighborhoodId, setNeighborhoodId] = useState()
    const [urlData, setUrlData] = useState(getRouterInfo())
    const [BlurType, setBlurType] = useState(false)

    const listRef = useRef()

    const renderItem = useCallback((item, index) => {
        return (
            <div className={styles.commentItem} key={index}>
                <img alt="" src={imageSrc(item.image) || portrait} />
                <div>
                    <div className={styles.commentTop}>
                        <div className={styles.commentName}>{item.userName || item.nickName}</div>
                        <div></div>
                    </div>
                    <div className={styles.commentContent}>{item.content}</div>
                </div>
            </div>
        )
    }, [item])
    useEffect(() => {
        showLoading({ duration: 999 });
        const { query } = urlData;
        if (query && query.neighborhoodId) {
            setNeighborhoodId(query.neighborhoodId)
        }
    }, [urlData])

    useEffect(() => {
        neighborhoodId && getListDetail()
    }, [neighborhoodId])

    const getListDetail = useCallback(async () => {
        const { state, results } = await getListDetails({ neighborhoodId })
        if (state === 200) {
            setItem(results)
            setShow(true)
            hideLoading()
        }
    }, [neighborhoodId])

    const handlePublish = useCallback(async () => {
        if (!content) {
            message.toast("请输入评论内容")
            return
        }
        const { state } = await addComment({
            content,
            neighborhoodId,
            userId: storage.get('userId'),
            userName: storage.get("userInfo").name || storage.get("userInfo").nickName,
            image: storage.get("userInfo").image
        })
        if (state === 200) {
            setContent("")
            setBlurType(true)
            message.toast('发表成功')
            getListDetail()
            if (item.list.length > 0) {
                refresh()
            }
        }
    }, [content, neighborhoodId, item])

    const refresh = () => {
        listRef.current.refresh()
    }

    return (
        show && <div className={styles.neighborhoodDetailContainer}>
            <RenderItem item={item} refresh={getListDetail} imgShow></RenderItem>
            <div className={styles.comment}>
                <div className={styles.commentTitle}>评论{item && item.list.length}</div>
                {
                    item && item.list.length === 0 ? <NoData text="暂无评论！" image={nodata} />
                        :
                        <PagingList
                            dataSource={item.list}
                            ref={listRef}
                            renderItem={renderItem}
                            otherHeight={62}
                            enableEndLoading={false}
                        />
                }
            </div>
            <div className={styles.footerComment}>
                <Input
                    onBlur={BlurType}
                    placeholder="发表评论"
                    onChange={(e) => setContent(e)}
                    value={content}
                />
                <Button onTouchStart={handlePublish}>发表</Button>
            </div>
        </div>
    )
})  