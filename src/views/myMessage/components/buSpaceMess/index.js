import React, {
    memo,
    useRef,
    useState,
    useCallback,
    useEffect
} from "react";
import api from 'src/config/api';
import { spaceUpdate, spaceList, spaceVillList } from "src/services/myMessUpdate"
import PagingList from "framework/components/PagingList";
import styles from "./index.less"
import getEnums from "../../enums/index"
import { Button } from "antd-mobile";
import storage from "framework/utils/storage";
import { wxPushUrl } from "framework/utils/url";
// document.title = '创业空间'
export default memo(() => {
    const messType = storage.get("userType")//用户类别 村委1 村民2
    const personal = storage.get("userInfo")//个人信息
    const contentRef = useRef(null);
    const tableRef = useRef(null);
    const listAPi = messType === 1 ? `${api.myMessage.buSpaceMess.VILL_LIST}?villageId=${personal.villageId}` : `${api.myMessage.buSpaceMess.LIST}?readStates=-1&approvalStatus=2`;
    const enumFn = (num, type) => {
        const list = getEnums(type).data
        for (let i in list) {
            if (Number(list[i]) === num) {
                return i
            }
        }
    }

    const renderItem = useCallback((item, index) => {
        console.log(item);
        return (
            <div key={index} className={styles.outbox}>
                <div className={styles.timeBox}>{item.appointmentDate ? item.appointmentDate.split(' ')[0] : ''}</div>
                <div className={styles.conBox}>
                    <div className={styles.theadTit}>
                        空间预约
                    </div>
                    <div className={styles.tbodyTit}>
                        您预约的空间已审核，请查看
                    </div>
                    <Button type="button" className={styles.sub} onClick={() => { wxPushUrl({ pathname: "/entrepreneurialSpace/mySubscribeDetail", query: { recordId: item.recordId } }) }}>查看</Button>
                </div>
            </div>
        );
    }, []);
    const setUpdate = useCallback(async () => {
        let res;
        if (messType === 2) {
            res = await spaceList({ readStates: -1, approvalStatus: 2 })
        } else {
            res = await spaceVillList({ villageId: personal.villageId })
        }
        if (res.results.list.length !== 0 && res.state === 200) {
            const utilUpdate = await spaceUpdate({ list: res.results.list })
        }
    }, []);
    useEffect(() => {
        document.title = '创业空间'
        setUpdate();
    }, [setUpdate]);
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