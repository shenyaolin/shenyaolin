import React, { useCallback, useState, useImperativeHandle, forwardRef } from 'react'
import styles from '../index.less'
import classnames from 'classnames'
import DatePicker from "framework/components/Form/entry/DatePicker";
import Button from "framework/components/Button";

const stateList = [
    { label: '待受理', type: 1 },
    { label: '已受理', type: 2 },
    { label: '已办结', type: 3 },
]

const eventTypeList = [
    { label: '矛盾纠纷', type: 1 },
    { label: '安全隐患', type: 2 },
    { label: '环境卫生', type: 3 },
    { label: '道路安全', type: 4 },
    { label: '疫情防控', type: 5 },
    { label: '消防安全', type: 6 },
    { label: '食品安全', type: 7 },
]

export default forwardRef(({ show, handleScreen, isShow = true }, ref) => {
    const [search, setSearch] = useState({})
    const handleClick = useCallback((item) => {
        setSearch((prev) => ({
            ...prev,
            eventStatus: item.type
        }))
    }, [])
    const handleEventClick = useCallback((item) => {
        setSearch((prev) => ({
            ...prev,
            type: item.type
        }))
    }, [])
    const changeForm = useCallback(name => (e) => {
        setSearch((prev) => ({
            ...prev,
            [name]: e
        }))
    }, [])
    const handleRouter = useCallback((type1) => {
        const { type, eventStatus, startDate, endDate } = search
        if (startDate && endDate) {
            var createTime = `${startDate}~${endDate}`
        }
        if (type1 === "search") {
            handleScreen({ type, eventStatus, createTime })
        } else if (type1 === "close") {
            handleScreen("close")
        } else {
            setSearch({})
            handleScreen()
        }
    }, [search, handleScreen])
    const stateShow = useCallback(() => {
        return (
            <div className={styles.state}>
                <div className={styles.title}>状态</div>
                <div className={styles.content}>
                    {
                        stateList.map((item, index) => {
                            return (
                                <div key={index} className={classnames(styles.options, search.eventStatus == item.type && styles.choose)} onClick={() => handleClick(item)}> {item.label}</div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }, [search])

    const clear = () => {
        setSearch({})
    }

    useImperativeHandle(ref, () => {
        return {
            clear
        }
    })

    return (
        <>
            {
                show && <div className={styles.screenContainer}>
                    <div className={styles.screenBox}>
                        <img alt='' src={require('../../../assets/images/newImg/cross.png')} className={styles.close} onClick={() => handleRouter("close")} />
                        {isShow && stateShow()}
                        <div className={styles.state}>
                            <div className={styles.title}>事件类型</div>
                            <div className={styles.content}>
                                {
                                    eventTypeList.map((item, index) => {
                                        return (
                                            <div key={index} className={classnames(styles.options, styles.eventOptions, search.type == item.type && styles.choose)} onClick={() => handleEventClick(item)}> {item.label}</div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className={styles.state}>
                            <div className={styles.title}>上报时段</div>
                            <div className={classnames(styles.content, styles.date)}>
                                <DatePicker
                                    placeholder="开始时间"
                                    value={search.startDate}
                                    onChange={changeForm("startDate")}
                                />
                                <div>至</div>
                                <DatePicker
                                    placeholder="结束时间"
                                    value={search.endDate}
                                    onChange={changeForm("endDate")}
                                />
                            </div>
                        </div>
                        <div className={styles.bottomBtn}>
                            <Button onClick={handleRouter}>重置</Button>
                            <Button onClick={() => handleRouter('search')}>确定</Button>
                        </div>
                    </div>
                </div >
            }
        </>
    )
})