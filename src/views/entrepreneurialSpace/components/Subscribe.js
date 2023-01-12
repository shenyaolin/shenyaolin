import React, { memo, useRef, useState, useCallback } from "react";
import styles from '../index.less'
import { pushUrl } from "framework/utils/url";
import api from 'config/api';
import PagingList from "framework/components/PagingList";
import DatePicker from "framework/components/Form/entry/DatePicker";
import { date3String } from "framework/utils/date.js";
import imageSrc from 'framework/utils/imageSrc';

document.title = '创业空间'
export default memo(() => {
    const [time, setTime] = useState(date3String(new Date()))
    const listRef = useRef(null)

    const handleClick = useCallback((item) => {
        const { afternoon, morning, booker, capacity, spaceId, name, type } = item
        pushUrl({ pathname: "/entrepreneurialSpace/reserve", query: { type, name, booker, capacity, spaceId, afternoon: String(afternoon), morning: String(morning), time: time || date3String(new Date()) } })
    }, [time])

    const renderItem = useCallback((item, index) => {
        return (
            <div className={styles.listItem} key={index} onClick={() => handleClick(item)
            }>
                <div className={styles.topBox}>
                    <div className={styles.topLeft}>
                        <div className={styles.name}>{item.name}</div>
                        <div className={styles.introduce}>{item.type === 1 ? "活动" : '会议'}</div>
                        <div className={styles.address}>
                            <span>
                                <img alt="" src={require('assets/images/newImg/peopleNumber.png')} />
                                <span>{item.capacity}</span>
                            </span>
                            <span>
                                <img alt="" src={require('assets/images/newImg/address.png')} />
                                <span>{item.location}</span>
                            </span>
                        </div>
                    </div>
                    <img alt="" src={imageSrc(item.image)} className={styles.topRight} />
                </div>
                <div className={styles.bottomBox}>
                    <div className={styles.morning}>
                        <div className={styles.morningBox} style={{ background: ((handleType("12:00:00") || item.morning === 1) ? "#E4E4E4" : "#fff") }}>{handleType("12:00:00") ? '已过期' : item.morning === 0 ? "" : '已被预订'}</div>
                        <div>上午</div>
                    </div>
                    <div className={styles.afternoon}>
                        <div className={styles.afternoonBox} style={{ background: ((handleType("23:59:59") || item.afternoon === 1) ? "#E4E4E4" : "#fff") }}>{handleType("23:59:59") ? '已过期' : item.afternoon === 0 ? "" : '已被预订'}</div>
                        <div>下午</div>
                    </div>
                </div>
            </div >
        )
    }, [time]);

    const handlePickerChange = useCallback((e) => {
        setTime(e)
        refresh()
    }, [])
    const handleType = useCallback((h) => {
        const timeStamp = new Date(`${date3String(new Date())} ${h}`).getTime()   // 当天上午12点或者下午12点的时间戳
        if (time) {
            if (time === date3String(new Date())) {
                if (new Date().getTime() > timeStamp) {
                    return true
                }
            }
            else if (new Date(time).getTime() < timeStamp) {
                return true
            }
        } else {
            if (new Date().getTime() > timeStamp) {
                return true
            }
        }
    }, [time])
    const refresh = () => {
        listRef.current.refresh()
    }
    return <div className={styles.subscribeContainer}>
        <div className={styles.date}>
            {/* <img alt="" src={require('assets/images/newImg/date.png')} /> */}
            <DatePicker minDate={new Date()} value={time} placeholder="根据时间查询" onChange={handlePickerChange} />
        </div>

        <PagingList
            dataSource={`${api.entrepreneurialSpace.GET_LIST}?time=${time}`}
            ref={listRef}
            renderItem={renderItem}
            enableEndLoading={false}
            ajaxMethod="get"
        />

    </div>
}) 