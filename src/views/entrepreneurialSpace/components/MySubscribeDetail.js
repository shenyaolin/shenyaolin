import React, { memo, useState, useCallback, useEffect, useRef } from "react";
import styles from '../index.less'
import { getRouterInfo } from "framework/utils/url";
import { getRecordDetail } from '../../../services/entrepreneurialSpace'


document.title = "创业空间"
export default memo(() => {
    const [record, setRecord] = useState({})
    const getRecordDetails = useCallback(async (recordId) => {
        const { results, state } = await getRecordDetail({ recordId: recordId })
        if (state === 200) {
            setRecord(results)
        }
    }, [])
    useEffect(() => {
        const { query } = getRouterInfo()
        query.recordId && getRecordDetails(query.recordId)
    }, [])

    return (
        <div className={styles.mySubscribeDetailContainer}>
            <div className={styles.header}>
                <div className={styles.activityName}>{record.activityName}</div>
                <div className={styles.recordNo}>预约编号: {record.recordNo}</div>
                <div className={styles.date}>
                    <div className={styles.morning}>
                        <div>{record.morning === 1 ? "上午" : "下午"}</div>
                        <div>{record.appointmentDate && record.appointmentDate.substr(0, 10)}</div>
                    </div>
                    <div className={styles.rod}></div>
                    <div className={styles.afternonn}>
                        <div>{record.morning === 1 ? "上午" : "下午"}</div>
                        <div>{record.appointmentDate && record.appointmentDate.substr(0, 10)}</div>
                    </div>
                </div>
            </div>
            <div className={styles.name}>
                <div>空间名称</div>
                <div>{record.name}</div>
            </div>
            <div className={styles.reservationPerson}>
                <div>预约人</div>
                <div>{record.reservationPerson}</div>
            </div>
            <div className={styles.phone}>
                <div>预约电话</div>
                <div>{record.phone}</div>
            </div>
            <div className={styles.content}>{record.content}</div>
            <div className={styles.audit}>
                <div className={styles.title}>审核信息</div>
                {
                    record.approvalStatus === 0 ? <div className={styles.placeholder}>您提交的空间预约正在审核中！</div>
                        :
                        <div className={styles.auditContent}>
                            <div className={styles.auditResult}>审批结果: <span>{record.status === 0 ? '不通过' : '通过'}</span></div>
                            <div>审批意见: {record.approvalComment}</div>
                        </div>
                }

            </div>
        </div >
    )
})  