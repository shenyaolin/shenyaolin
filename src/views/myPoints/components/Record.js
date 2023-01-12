import React, { memo, useState, useRef, useCallback } from 'react';
import styles from '../index.less';
import DatePicker from '../../../components/DatePicker';
import { date4String } from 'framework/utils/date.js';
import NewPagingList from "../../../components/NewPagingList";
import api from "config/api";
import imageSrc from 'framework/utils/imageSrc';
import { wxPushUrl } from "framework/utils/url";

document.title = "兑换记录"
export default memo(() => {
    const [createTime, setCreateTime] = useState(date4String(new Date()))
    const listRef = useRef(null)

    const handleChange = useCallback((e) => {
        setCreateTime(e)
        refresh()
    }, [createTime])

    const handleVerificationCertificate = (data) => {
        const time = new Date(data).getTime() - new Date().getTime()
        if (time < 0) {
            return true
        } else {
            return false
        }
    }

    const refresh = () => {
        listRef.current.refresh();
    };

    const renderItem = useCallback((item, index) => {
        return (
            item.name ? <div className={styles.date} key={index}>{item.name}</div> :
                <div className={styles.recordItem} key={index} onClick={() => wxPushUrl({ pathname: "/myPoints/exchange", query: { orderNo: item.orderNo } })}>
                    <div className={styles.recordItemTop}>
                        {item.image && <img alt='' src={imageSrc(item.image.split(',')[0])} /> || <img alt='' src={require('../../../assets/images/newImg/neighborhood.png')} />}
                        <div className={styles.recordRight}>
                            <div className={styles.recordRightTop}>
                                <div className={styles.tradeName}>{item.merchandiseName}</div>
                                <img alt="" src={require('../../../assets/images/newImg/arrow-right-gray.png')} />
                            </div>
                            <div className={styles.recordRightBottom}>
                                <div className={styles.integral}>{item.integralNumber}积分</div>
                                <div className={styles.exchangeTime}>{item.createTime}兑换</div>
                            </div>
                        </div>
                    </div>
                    {handleVerificationCertificate(item.effectiveTime) && <div className={styles.recordItemBottom}>已失效</div>}
                </div>
        );
    }, []);

    return (
        <div className={styles.recordContainer}>
            <DatePicker mode={"month"} placeholder="" value={createTime} onChange={handleChange}></DatePicker>
            <NewPagingList
                dataSource={api.myPoints.GET_EXCHANGE_LIST}
                ref={listRef}
                renderItem={renderItem}
                ajaxMethod="get"
                ajaxParams={{ createTime }}
            />
        </div >
    )
})