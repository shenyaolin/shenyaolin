import React, { memo, useState, useCallback, useRef, useEffect } from "react";
import styles from "../index.less";
import { getRouterInfo } from "framework/utils/url";
import api from "config/api";
import { wxPushUrl } from "framework/utils/url";
import PagingList from "framework/components/PagingList";
import classnames from 'classnames';

const taskNameType = {
    1: "重点户帮扶",
    2: "重点户看望",
    3: "重点户巡检",
}

const familyType = {
    1: "扶贫户", 2: "低保户", 3: "扶贫低保户", 4: "五保户", 5: "一般贫困户", 6: "建档立卡户", 7: "一般农户", 8: "特困户", 9: "低保边缘户"
}

const main = [
    { label: "任务编号", field: "recordNo" },
    { label: "完成巡检日期", field: "completeTime" },
    { label: "巡检对象", field: "inspectionObject" },
    { label: "家庭状态", field: "familyType" }
]

document.title = "统计明细"
export default memo(() => {
    const { query } = getRouterInfo();
    const [status, setStatus] = useState()
    const listRef = useRef(null);
    const refresh = () => {
        listRef.current.refresh()
    }

    const handleClick = (item, path) => (e) => {
        e.stopPropagation()
        if (e.target.nodeName === 'A') return false
        else if (path === '/myPatrol/detail') {
            wxPushUrl({ pathname: path, query: { recordId: item.recordId } })
        } else {
            wxPushUrl({ pathname: path, query: { ...item } })
        }
    }

    const handleField = (data, field) => {
        if (field === 'familyType') return familyType[data[field]]
        else return data[field]
    }

    const renderItem = useCallback((item, index) => {
        return (
            <div className={styles.listItem} key={index} onClick={handleClick(item, '/myPatrol/detail')}>
                <div className={styles.listTitle}>
                    <div>{taskNameType[item.taskNameType]}</div>
                    <div className={classnames(styles.titleStatus, item.status === 0 && styles.titleStatus1)}>{item.status === 2 ? '已完成' : '进行中'}</div>
                </div>
                <div className={styles.listContent}>
                    {main.map((item1, index1) => {
                        return (
                            <div className={styles.mainItem} key={index1}>
                                <div className={styles.mainLabel}>{item1.label}</div>
                                <div>{handleField(item, item1.field)}</div>
                            </div>
                        )
                    })}
                    <div className={styles.btn}>
                        {
                            item.status === 0 ?
                                <>
                                    <button onClick={handleClick(item, '/myPatrol/signIn')} className={styles.signBtn}>签到</button>
                                    <a href={`tel:${item.phone}`} className={styles.dial} onClick={() => false}>通知对象</a>
                                    <button onClick={handleClick(item, '/myPatrol/summary')}>巡检纪要</button>
                                </>
                                :
                                <button onClick={() => wxPushUrl({ pathname: "/myPatrol/detail", query: { recordId: item.recordId, status: item.status } })} className={styles.see}>查看</button>
                        }
                    </div>
                </div>
            </div >
        );
    }, [query]);

    useEffect(() => {
        query && query.status && setStatus(query.status)
    }, [query])

    return (
        <div className={styles.statisticalDetailsContainer}>
            {
                status && <PagingList
                    dataSource={`${api.myPatrol.GET_INSPECTIONDETAILLIST}?status=${status}`}
                    ref={listRef}
                    renderItem={renderItem}
                    ajaxMethod="get"
                />
            }
        </div>
    );
});
