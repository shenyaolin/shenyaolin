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
import { picUpdate, picList } from "src/services/myMessUpdate"
import getEnums from "../../enums/index"
import { Button } from "antd-mobile";
import storage from "framework/utils/storage";
import { wxPushUrl } from "framework/utils/url";
// document.title = '随手拍'
export default memo(() => {
    const messType = storage.get("userType")//用户类别 村委1 村民2
    const personal = storage.get("userInfo")//个人信息
    const contentRef = useRef(null);
    const tableRef = useRef(null);
    const listAPi = messType === 1 ? `${api.myMessage.takePicMess.VILL_LIST}?villageId=${personal.villageId}` : `${api.myMessage.takePicMess.LIST}?readStates=-1`;
    const enumFn = (num, type) => {
        const list = getEnums(type).data
        console.log(list);
        for (let i in list) {
            if (Number(list[i]) === num) {
                return i
            }
        }
    }
    const pushBtn = (item) => {
        console.log(item);
        if (messType === 2) {
            wxPushUrl({ pathname: "/clapCasually/details", query: { snapshotId: item.snapshotId } })
        } else if (messType === 1) {
            wxPushUrl({ pathname: "/clapCasually" })
        }
    }
    const setUpdate = useCallback(async () => {
        if (messType === 2) {
            const res = await picList({ readStates: -1 })
            if (res.results.list.length !== 0 && res.state === 200) {
                const utilUpdate = await picUpdate({ list: res.results.list })
            }
        }
    }, []);
    useEffect(() => {
        document.title = '随手拍'
        setUpdate();
    }, [setUpdate]);
    const renderItem = useCallback((item, index) => {
        return (
            <div key={index} className={styles.outbox}>
                <div className={styles.timeBox}>{item.createTime.split(' ')[0]}</div>
                <div className={styles.conBox}>
                    <div className={styles.theadTit}>
                        {enumFn(item.type, '事件纠纷')}
                    </div>
                    <div className={styles.tbodyTit}>
                        您有一个随手拍任务需要处理，请查看
                    </div>
                    <Button type="button" className={styles.sub} onClick={() => pushBtn(item)}>查看</Button>
                </div>
            </div>
        );
    }, []);
    return (
        <>
            <div ref={contentRef}>
                <PagingList
                    ref={tableRef}
                    dataSource={listAPi}
                    renderItem={renderItem}
                    renderHeaderAlways
                    ajaxMethod="get"
                    enableRefresh={false}
                />
            </div>
        </>
    )
})