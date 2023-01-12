import React, { memo, useState, useRef, useCallback, useEffect } from 'react'
import styles from '../../clapCasually/index.less'
import { wxPushUrl } from "framework/utils/url";
import PagingList from "framework/components/PagingList";
import api from "config/api";
import classnames from 'classnames'
import imageSrc from 'framework/utils/imageSrc';
import RemoteSelect from "framework/components/Form/entry/RemoteSelect";
import Screen from './Screen'
// import nodata from 'assets/images/newImg/NoData.png';

const state = {
    1: "待受理",
    2: "已受理",
    3: "已办结"
}



export default memo(() => {
    const [screenLength, setScreenLength] = useState(0)
    const [show, setShow] = useState(false)
    const [parameter, setParameter] = useState({})

    const listRef = useRef(null)
    const selectRef = useRef(null)

    const imgClass = useCallback((img) => {
        let length = 0
        if (img && typeof img === "string") {
            length = img.split(",").length
        }
        if (length === 1) return "images1"
        else if (length === 2) return "images2"
        else return "images3"
    }, [])

    const refresh = () => {
        listRef.current.refresh()
    }

    const renderItem = useCallback((item, index) => {
        return (
            <div className={styles.listItem} key={index} onClick={() => wxPushUrl({ pathname: "/clapCasually/details", query: { snapshotId: item.snapshotId } })}>
                <div className={styles.box}>
                    <div className={styles.description}>{item.description}</div>
                    <div className={classnames(styles.type, styles[`eventColor${item.eventStatus}`])}>{state[item.eventStatus]}</div>
                </div>
                <div className={styles.box}>
                    <div className={classnames(styles.images, styles[imgClass(item.eventImage)])}>
                        {
                            item.eventImage && item.eventImage.split(',').map((item1, index1) => {
                                return <img src={imageSrc(item1)} key={index1} />
                            })
                        }
                    </div>
                </div>
                <div className={styles.box}>
                    <div className={styles.villageName}>{item.villageName}</div>
                    <div className={styles.createTime}>{item.createTime}</div>
                </div>
            </div>
        )
    }, [])

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

    useEffect(() => {
    }, [])

    return (
        <div className={styles.villagerEnd}>
            {
                <>
                    <div className={styles.topHeader}>
                        <div className={styles.address} onClick={() => selectRef.current.handleInputClick()} >浉河港镇/郝家冲村
                            <RemoteSelect
                                ref={selectRef}
                                rsKey={`${Math.round(new Date() / 1000)}`}
                            />
                        </div>
                        <div className={classnames(styles.screen, screenLength > 0 && styles.screenNum)} onClick={() => setShow(true)}>筛选{screenLength > 0 && <span>{screenLength}</span>}</div>
                    </div>
                    <PagingList
                        dataSource={`${api.myMessage.takePicMess.LIST}`}
                        ref={listRef}
                        renderItem={renderItem}
                        ajaxMethod="get"
                        ajaxParams={parameter}
                    />
                </>
            }
            <Screen show={show} handleScreen={handleScreen}></Screen>
        </div >
    )
})