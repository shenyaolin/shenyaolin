import React, { memo, useState, useCallback, useRef } from "react";
import styles from '../index.less';
import { wxPushUrl } from "framework/utils/url";
import Tab from '../../../../../components/Tab';
import PagingList from "framework/components/PagingList";
import api from "config/api";
import storage from 'framework/utils/storage';
import imageSrc from "framework/utils/imageSrc";
import classnames from "classnames";
import styBox from "./opinionbox.less"
import Screen from './Screen'
import Picker from "framework/components/Form/entry/Picker";
import RemoteSelect from "framework/components/Form/entry/RemoteSelect";
const tabs = [{ label: "待回复" }, { label: "已采纳" }, { label: '未采纳' }]
const problemType = { 1: "意见建议", 2: "办事服务", 3: "环境卫生", 4: "信访举报", 5: "其他" }
const options = [{ label: "全部", value: 2 }, { label: "已采纳", value: 1 }, { label: "未采纳", value: -1 }]
const typeoptions = [{ label: "意见建议", value: 1 }, { label: "办事服务", value: 2 }, { label: "环境卫生", value: 3 }, { label: "信访举报", value: 4 }, { label: "其他", value: 5 }]

document.title = '意见箱'
export default memo(() => {
    const [screenLength, setScreenLength] = useState(0)
    const { userType } = storage.get('userInfo');
    const [show, setShow] = useState(false)
    const [parameter, setParameter] = useState(userType === 2 && { acceptStatus: 1 });
    const [classification, setClassification] = useState("");
    const listRef = useRef(null)
    const selectRef = useRef(null)
    const refresh = () => {
        listRef.current.refresh()
    }
    const handleImgSize = (img) => {
        if (img.length === 1) return "imgs1"
        if (img.length === 2) return "imgs2"
        if (img.length >= 3) return "imgs3"
    }

    const renderItem = useCallback((item, index) => {
        console.log(item,'++1132356');
        const imgs = item.image ? item.image.split(',') : []
        return (
            <div key={index} className={styles.renderItem} onClick={() => wxPushUrl({ pathname: '/informationReport/detail', query: { messageId: item.messageId } })}>
                <div className={styles.problemType}>
                    <div>{problemType[item.problemType]}</div>
                    {
                        userType === 1 && <div className={classnames(styles.adoptType, item.adoptionStatus === 1 && styles.adoptedType)}>
                            {item.adoptionStatus === 1 && "已采纳" || item.adoptionStatus === -1 && "未采纳"}
                        </div>
                    }
                </div>
                <div className={styles.userMsg}>
                    <span>{item.sendType === 1 ? item.name : "匿名"}</span>
                    <span>{item.createTime}</span>
                </div>
                <div className={styles.imgs}>
                    {
                        imgs.length > 0 ? imgs.map((img, index1) => <img className={classnames(styles[handleImgSize(imgs)])} key={index1} alt="" src={imageSrc(img)} />) : item.detailDescription
                    }
                </div>
            </div>
        );
    }, []);
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

    return <div className={styles.opinionBoxContainer}>
        {/* <Tab tabs={tabs} handleTabIndex={handleTabIndex}></Tab> */}
        <div className={styBox.topHeader}>
            {/* <div className={styBox.address} onClick={() => selectRef.current.handleInputClick()} >浉河港镇/郝家冲村
                <RemoteSelect
                    ref={selectRef}
                    rsKey={`${Math.round(new Date() / 1000)}`}
                />
            </div> */}
            <div className={classnames(styBox.screen, screenLength > 0 && styBox.screenNum)} onClick={() => setShow(true)}>筛选{screenLength > 0 && <span>{screenLength}</span>}</div>
        </div>
        <Screen show={show} handleScreen={handleScreen}></Screen>

        <PagingList
            dataSource={api.informationReport[userType === 2 ? "GET_CM_LIST" : "GET_CW_LIST"]}
            ref={listRef}
            renderItem={renderItem}
            ajaxParams={parameter}
        // otherHeight={userType === 2 ? 55 : 0}
        />
    </div>
})