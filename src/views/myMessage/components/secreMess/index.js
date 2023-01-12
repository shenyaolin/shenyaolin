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
import { secreUpdate, secreList,secreVillList } from "src/services/myMessUpdate"
import { Button } from "antd-mobile";
import storage from "framework/utils/storage";
import { wxPushUrl } from "framework/utils/url";
// document.title = '书记信箱'
export default memo(() => {
    const messType = storage.get("userType")//用户类别 村委1 村民2
    const personal = storage.get("userInfo")//个人信息
    const userId = storage.get("userId")
    const contentRef = useRef(null);
    const tableRef = useRef(null);
    const listAPi = messType === 1 ? `${api.myMessage.secreMess.VILL_LIST}?villageId=${personal.villageId}` : `${api.myMessage.secreMess.LIST}?readStates=-1&userId=${userId}&status=1`;
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
                        {item.title}
                    </div>
                    <div className={styles.tbodyTit}>
                        您上报的{item.title}已审核，请查看
                    </div>
                    <Button type="button" className={styles.sub} onClick={() => { wxPushUrl({ pathname: '/secretaryMailbox/detail', query: { mailboxId: item.mailboxId } }) }}>查看</Button>
                </div>
            </div>
        );
    }, []);
    const setUpdate = useCallback(async () => {
        let res;
        if (messType === 2) {
            res = await secreList({ readStates: -1, userId: userId })
        } else {
            res = await secreVillList({ villageId: personal.villageId })
        }
        if (res.results.list.length !== 0 && res.state === 200) {
            const utilUpdate = await secreUpdate({ list: res.results.list })
        }
    }, []);
    useEffect(() => {
        document.title = '书记信箱'
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