import React, { memo, useCallback, useState } from 'react'
import styles from './opinionbox.less'
import classnames from 'classnames'
import Button from "framework/components/Button";

const stateList = [
    { label: '待回复', type: -1, acceptStatus: -1 },
    { label: '已回复', type: 1, acceptStatus: 1 },
]
const timeList = [
    { label: '由近到远', type: 1 },
    { label: '由远到近', type: 2 },
]


export default memo(({ show, handleScreen, isShow = true }) => {
    const [search, setSearch] = useState({})
    const handleClick = useCallback((item) => {
        setSearch((prev) => ({
            ...prev,
            sortEnum: item.type
        }))
    }, [])
    const eventClick = useCallback((item) => {
        setSearch((prev) => ({
            ...prev,
            acceptStatus: item.type
        }))
    }, [])
    // const handleEventClick = useCallback((item) => {
    //     setSearch((prev) => ({
    //         ...prev,
    //         type: item.type
    //     }))
    // }, [])
    // const changeForm = useCallback(name => (e) => {
    //     setSearch((prev) => ({
    //         ...prev,
    //         [name]: e
    //     }))
    // }, [])
    const handleRouter = useCallback((type1) => {
        const { acceptStatus, adoptionStatus, sortEnum, type } = search
        if (type1 === "search") {
            handleScreen({ acceptStatus, adoptionStatus, sortEnum, type })
        } else if (type1 === "close") {
            handleScreen("close")
        } else {
            setSearch({})
            handleScreen()
        }
    }, [search, handleScreen])
    const stateShow = useCallback(() => {
        return (
            <>
                <div className={styles.state}>
                    <div className={styles.title}>状态</div>
                    <div className={styles.content}>
                        {
                            stateList.map((item, index) => {
                                return (
                                    <div key={index} className={classnames(styles.options, search.acceptStatus == item.type && styles.choose)} onClick={() => eventClick(item)}> {item.label}</div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className={styles.state}>
                    <div className={styles.title}>创建时间排序</div>
                    <div className={styles.content}>
                        {
                            timeList.map((item, index) => {
                                return (
                                    <div key={index} className={classnames(styles.options, search.sortEnum == item.type && styles.choose)} onClick={() => handleClick(item)}> {item.label}</div>
                                )
                            })
                        }
                    </div>
                </div>
            </>
        )
    }, [search])

    return (
        <>
            {
                show && <div className={styles.screenContainer}>
                    <div className={styles.screenBox}>
                        <img alt='' src={require('assets/images/newImg/cross.png')} className={styles.close} onClick={() => handleRouter("close")} />
                        {isShow && stateShow()}
                        {/* <div className={styles.state}>
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
                        </div> */}

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