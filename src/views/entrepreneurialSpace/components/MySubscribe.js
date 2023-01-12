import React, { memo, useCallback, useRef } from "react";
import styles from '../index.less'
import { pushUrl } from "framework/utils/url";
import api from 'config/api';
import PagingList from "framework/components/PagingList";
const list = [
    "审核中",
    "进行中",
    "已结束"
]

document.title = "创业空间"
export default memo(() => {
    const handleClick = (recordId) => {
        pushUrl({ pathname: "/entrepreneurialSpace/mySubscribeDetail", query: { recordId } })
    }
    const listRef = useRef(null)

    const handleApproveStatus = (item) => {
        let time = `${item.appointmentDate} ${item.morning === 1 ? "12:00:00" : "23:59:59"}`
        if (new Date(time).getTime() < new Date().getTime()) {
            console.log(1);
            return "已结束"
        } else {
            return list[item.approvalStatus]
        }
    }

    const renderItem = useCallback((item, index) => {
        return (
            <div className={styles.listItme} key={index}>
                <div className={styles.header}>
                    <div className={styles.name}>{item.name}</div>
                    <div className={styles.approvalStatus}>{handleApproveStatus(item)}</div>
                </div>
                <div className={styles.appointmentDate}>开始时间: <span>{item.appointmentDate && item.appointmentDate.substr(0, 10)}</span>{item.morning === 1 ? "上午" : "下午"}</div>
                <div className={styles.appointmentDate}>结束时间: <span>{item.appointmentDate && item.appointmentDate.substr(0, 10)}</span>{item.morning === 1 ? "上午" : "下午"}</div>
                <div className={styles.location}>地点: {item.location || "无"}</div>
                <div className={styles.btn}><button onClick={() => handleClick(item.recordId)}>预约详情</button></div>
            </div>
        )
    }, [])
    return (
        <div className={styles.mySubscribeContainer}>
            <PagingList
                dataSource={api.entrepreneurialSpace.GET_RECORD}
                ref={listRef}
                renderItem={renderItem}
                ajaxMethod="get"
            />
        </div >
    )
}) 