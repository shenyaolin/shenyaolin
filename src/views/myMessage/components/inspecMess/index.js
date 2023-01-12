import React, {
    memo,
    useRef,
    useEffect,
    useCallback
} from "react";
import api from 'src/config/api';
import PagingList from "framework/components/PagingList";
import styles from "./index.less"
import getEnums from "../../enums/index"
import { Button } from "antd-mobile";
import { wxPushUrl } from "framework/utils/url";
import storage from "framework/utils/storage";
// document.title = '巡检任务'
export default memo(() => {
    const messType = storage.get("userType")//用户类别 村委1 村民2
    const personal = storage.get("userInfo")//个人信息
    const tableRef = useRef(null);
    const enumFn = (num, type) => {
        const list = getEnums(type).data
        for (let i in list) {
            if (Number(list[i]) === num) {
                return i
            }
        }
    }
    const renderItem = useCallback((item, index) => {
        return (
            <div key={index} className={styles.outbox}>
                <div className={styles.timeBox}>{item.createTime.split(' ')[0]}</div>
                <div className={styles.conBox}>
                    <div className={styles.theadTit}>
                        巡检任务
                    </div>
                    <div className={styles.tbodyTit}>
                        您有一个{enumFn(item.taskNameType, '巡检任务')}任务需要处理，请查看
                    </div>
                    <Button type="button" className={styles.sub} onClick={() => { wxPushUrl({ pathname: "/myPatrol" }) }}>查看</Button>
                </div>
            </div>
        );
    }, []);

    useEffect(() => {
        document.title = '巡检服务'
    }, []);
    return (
        <>
            {messType === 1 && <PagingList
                ref={tableRef}
                dataSource={`${api.myMessage.inspecMess.LIST}?villageId=${personal.villageId}`}
                renderItem={renderItem}
                renderHeaderAlways
                ajaxMethod="get"
                enableRefresh={false}
            />}
        </>
    )
})