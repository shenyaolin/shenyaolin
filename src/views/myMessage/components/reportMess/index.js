import React, {
    memo,
    useRef,
    useState,
    useCallback,
    useEffect
} from "react";
import api from 'src/config/api';
import PagingList from "framework/components/PagingList";
import styles from "./index.less"
import getEnums from "../../enums/index"
import { Button } from "antd-mobile";
import { reportUpdate, reportList } from "src/services/myMessUpdate"
import { wxPushUrl } from "framework/utils/url";
// document.title = '信息上报'
export default memo(() => {
    const contentRef = useRef(null);
    const tableRef = useRef(null);
    const enumFn = (num, type) => {
        const list = getEnums(type).data
        for (let i in list) {
            if (Number(list[i]) === num) {
                return i
            }
        }
    }
    const setUpdate = useCallback(async () => {
        const res = await reportList({ readStates: -1 })
        if (res.results.list.length !== 0 && res.state === 200) {
            const utilUpdate = await reportUpdate({ list: res.results.list })
        }
    }, []);
    useEffect(() => {
        document.title = '信息上报'
        setUpdate();
    }, [setUpdate]);
    const renderItem = useCallback((item, index) => {
        return (
            <div key={index} className={styles.outbox}>
                <div className={styles.timeBox}>{item.createTime.split(' ')[0]}</div>
                <div className={styles.conBox}>
                    <div className={styles.theadTit}>
                        {enumFn(item.problemType, '问题类型')}
                    </div>
                    <div className={styles.tbodyTit}>
                        您上报的{enumFn(item.problemType, '问题类型')}已审核，请查看
                    </div>
                    <Button type="button" className={styles.sub} onClick={() => { wxPushUrl({ pathname: '/informationReport/detail', query: { messageId: item.messageId } }) }}>查看</Button>
                </div>
            </div>
        );
    }, []);

    return (
        <>
            <div ref={contentRef}>
                <PagingList
                    ref={tableRef}
                    dataSource={api.myMessage.reportMess.LIST}
                    renderItem={renderItem}
                    renderHeaderAlways
                    ajaxMethod="get"
                    enableRefresh={false}
                />
            </div>
        </>
    )
})