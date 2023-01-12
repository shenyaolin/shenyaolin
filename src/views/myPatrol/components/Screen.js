import React, { useCallback, useState, useImperativeHandle, forwardRef } from 'react'
import styles from '../index.less'
import classnames from 'classnames'
import DatePicker from "framework/components/Form/entry/DatePicker";
import Button from "framework/components/Button";

const taskNameTypeList = [
    { label: '重点户帮扶', type: 1 },
    { label: '重点户看望', type: 2 },
    { label: '重点户巡检', type: 3 },
]

const taskTypeList = [
    { label: '帮扶', type: 1 },
    { label: '看望', type: 2 },
    { label: '巡检', type: 3 }
]

export default forwardRef(({ show, handleScreen }, ref) => {
    const [search, setSearch] = useState({})

    const handleClick = useCallback((item) => {
        setSearch((prev) => ({
            ...prev,
            taskNameType: item.type
        }))
    }, [])

    const handleTaskClick = useCallback((item) => {
        setSearch((prev) => ({
            ...prev,
            taskType: item.type
        }))
    }, [])

    const changeForm = useCallback(name => (e) => {
        setSearch((prev) => ({
            ...prev,
            [name]: e
        }))
    }, [])

    const handleRouter = useCallback((type1) => {
        const { taskNameType, taskType, startDate, endDate } = search
        if (startDate && endDate) {
            var inspectionDate = `${startDate}~${endDate}`
        }
        if (type1 === "search") {
            handleScreen({ taskNameType, taskType, inspectionDate })
        } else if (type1 === "close") {
            handleScreen("close")
        } else {
            setSearch({})
            handleScreen()
        }
    }, [search, handleScreen])

    const clear = () => {
        setSearch({})
    }

    useImperativeHandle(ref, () => {
        return {
            clear
        }
    })

    return (
        show && <div className={styles.screenContainer}>
            <div className={styles.screenBox}>
                <img alt='' src={require('../../../assets/images/newImg/cross.png')} className={styles.close} onClick={() => handleRouter("close")} />
                <div className={styles.state}>
                    <div className={styles.title}>任务名称</div>
                    <div className={styles.content}>
                        {
                            taskNameTypeList.map((item, index) => {
                                return (
                                    <div key={index} className={classnames(styles.options, search.taskNameType == item.type && styles.choose)} onClick={() => handleClick(item)}> {item.label}</div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className={styles.state}>
                    <div className={styles.title}>巡检类型</div>
                    <div className={styles.content}>
                        {
                            taskTypeList.map((item, index) => {
                                return (
                                    <div key={index} className={classnames(styles.options, styles.taskOptions, search.taskType == item.type && styles.choose)} onClick={() => handleTaskClick(item)}> {item.label}</div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className={styles.state}>
                    <div className={styles.title}>巡检时段</div>
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
    )
})