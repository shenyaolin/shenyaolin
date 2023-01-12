import React, { memo, useState, useCallback, useEffect } from "react";
import styles from '../index.less'
import { pushUrl } from "framework/utils/url";
import { getRouterInfo } from "framework/utils/url";
import check from '../../../assets/images/newImg/check.png';
import circle from '../../../assets/images/newImg/circle.png';
import greyCheck from '../../../assets/images/newImg/grey-check.png';
import { date3String } from "framework/utils/date.js";
import Button from "framework/components/Button";
import message from 'framework/utils/message';

const data = [
    { name: "上午", h: "12:00:00", type: "morning" },
    { name: "下午", h: "23:59:59", type: "afternoon" },
]

document.title = "创业空间"
export default memo(() => {
    const { query } = getRouterInfo()
    const [list, setList] = useState({})
    const [active, setActive] = useState({})
    const [radioIndex, setRadioIndex] = useState()
    const [show, setShow] = useState(false)

    useEffect(() => {
        const { query } = getRouterInfo()
        setList(query)
        setShow(true)
    }, [])

    const handleType = useCallback((h) => {
        const timeStamp = new Date(`${date3String(new Date())} ${h}`).getTime()   // 当天上午12点或者下午12点的时间戳
        if (list.time) {
            if (list.time === date3String(new Date())) {
                if (new Date().getTime() > timeStamp) {
                    return true
                }
            }
            else if (new Date(list.time).getTime() < timeStamp) {
                return true
            }
        } else {
            if (new Date().getTime() > timeStamp) {
                return true
            }
        }
        return false
    })
    const image = useCallback((h, index) => {
        if (handleType(h)) {
            return greyCheck
        } else if (index === 0 && query.morning == 1) {
            return greyCheck
        } else if (index === 0 && query.morning == 0) {
            return circle
        } else if (index === 1 && query.afternoon == 1) {
            return greyCheck
        } else if (index === 1 && query.afternoon == 0) {
            return circle
        }
    }, [list, handleType])

    const type = useCallback((index) => {
        if (query.morning == 1 && index === 0) {
            return <>已被<span>{query.booker}</span>预订</>
        }
        else if (query.afternoon == 1 && index === 1) {
            return <>已被<span>{query.booker}</span>预订</>
        }
        else return '已过期'
    }, [list])
    const handleClick = useCallback((index, item) => {
        if (image(item.h, index) === greyCheck) {
            return
        }
        setRadioIndex(index)
        if (index == 0) {
            setList((prev) => ({
                ...prev,
                afternoon: "0",
                morning: "1",
            }))
        } else {
            setList((prev) => ({
                ...prev,
                afternoon: "1",
                morning: "0",
            }))
        }
    }, [radioIndex, image])
    const handleReserve = useCallback(() => {
        if (typeof radioIndex == 'undefined') {
            message.toast('请选择预订时间');
        } else {
            const { name, afternoon, morning, time, spaceId } = list
            pushUrl({ pathname: "/entrepreneurialSpace/reserveContent", query: { name, afternoon, morning, time, spaceId } })
        }
    }, [list, radioIndex])
    return (
        show && <div className={styles.reserveContainer}>
            <div className={styles.reserveBox}>
                <div className={styles.header}>
                    <div className={styles.name}>{list.name}</div>
                    <div className={styles.introduce}>{list.type === "1" ? "活动" : '会议'}</div>
                </div>
                <div className={styles.footer}>
                    {
                        data.map((item, index) => {
                            return (
                                <div className={styles.radioBox} key={index}>
                                    <img src={image(item.h, index) == greyCheck ? greyCheck : radioIndex === index ? check : circle} onClick={() => handleClick(index, item)} />
                                    <div className={styles.name}>
                                        <div>{item.name}</div>
                                        <div>{image(item.h, index) === greyCheck ? type(index) : ""}</div>
                                    </div>
                                </div>
                            )
                        })
                    }
                    <Button style={{ background: (typeof radioIndex == 'undefined' ? '#7DC7FF' : "#26A2FF") }} onClick={handleReserve}>预订</Button>
                </div>
            </div>
        </div >
    )
}) 