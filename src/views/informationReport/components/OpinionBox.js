import React, { memo, useState, useCallback, useRef } from "react";
import styles from '../index.less';
import { pushUrl } from "framework/utils/url";
import Tab from '../../../components/Tab';
import PagingList from "framework/components/PagingList";
import api from "config/api";
import storage from 'framework/utils/storage';
import imageSrc from "framework/utils/imageSrc";
import classnames from "classnames";
import Picker from "framework/components/Form/entry/Picker";

const tabs = [{ label: "待回复" }, { label: "已采纳" }, { label: '未采纳' }]
const problemType = { 1: "意见建议", 2: "办事服务", 3: "环境卫生", 4: "信访举报", 5: "其他" }
const options = [{ label: "全部", value: 2 }, { label: "已采纳", value: 1 }, { label: "未采纳", value: -1 }]
const typeoptions = [{ label: "意见建议", value: 1 }, { label: "办事服务", value: 2 }, { label: "环境卫生", value: 3 }, { label: "信访举报", value: 4 }, { label: "其他", value: 5 }]

document.title = '意见箱'
export default memo(() => {
    const { userType } = storage.get('userInfo');
    const [parameter, setParameter] = useState(userType === 2 && { acceptStatus: -1 });
    const [classification, setClassification] = useState("");
    const listRef = useRef(null)

    const handleTabIndex = (index) => {
        if (index === 0) {
            setParameter({
                acceptStatus: -1
            })
        } else if (index === 1) {
            setParameter({
                acceptStatus: 1,
                adoptionStatus: 1
            })
        } else if (index === 2) {
            setParameter({
                acceptStatus: 1,
                adoptionStatus: -1
            })
        }
        refresh()
    }

    const refresh = () => {
        listRef.current.refresh()
    }

    const handleImgSize = (img) => {
        if (img.length === 1) return "imgs1"
        if (img.length === 2) return "imgs2"
        if (img.length >= 3) return "imgs3"
    }

    const handlePickerChange = useCallback(
        (fieldName) => (e) => {
            console.log(e);
            const value = e && e.target ? e.target.value : e;
            if (fieldName === "classification") {
                setClassification(value)
                setParameter((prev) => ({
                    ...prev,
                    adoptionStatus: value === 2 ? null : value,
                }))
            } else {
                setParameter((prev) => ({
                    ...prev,
                    [fieldName]: value,
                }));
            }
            refresh()
        },
        []
    );

    const renderItem = useCallback((item, index) => {
        const imgs = item.image ? item.image.split(',') : []
        return (
            <div key={index} className={styles.renderItem} onClick={() => pushUrl({ pathname: '/informationReport/detail', query: { messageId: item.messageId } })}>
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

    return <div className={styles.opinionBoxContainer}>
        {
            userType === 2 ?
                <Tab tabs={tabs} handleTabIndex={handleTabIndex}></Tab>
                :
                <div className={styles.cwHeader}>
                    <div>
                        <Picker
                            placeholder="全部意见状态"
                            options={options}
                            value={classification}
                            onChange={handlePickerChange("classification")}
                        />
                    </div>
                    <div>
                        <Picker
                            placeholder="全部问题类型"
                            options={typeoptions}
                            value={parameter.problemType}
                            onChange={handlePickerChange("problemType")}
                        />
                    </div>
                </div>
        }
        <PagingList
            dataSource={api.informationReport[userType === 2 ? "GET_CM_LIST" : "GET_CW_LIST"]}
            ref={listRef}
            renderItem={renderItem}
            ajaxParams={parameter}
            otherHeight={userType === 2 ? 55 : 0}
        />
    </div>
})