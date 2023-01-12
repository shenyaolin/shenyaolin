import React, { memo, useEffect, useState } from "react";
import styles from './index.less'
import { pushUrl } from "framework/utils/url";
import reportImg from 'assets/images/myMessage/report.png'
import takePicMessImg from 'assets/images/myMessage/take.png'
import messageImg from 'assets/images/myMessage/message.png'
import buSpaceImg from 'assets/images/myMessage/entre.png'
import secreImg from 'assets/images/myMessage/secre.png'
import inspec from 'assets/images/myMessage/inspec.png'
import storage from "framework/utils/storage";
import { getList, getVillList } from "../../services/message"
// document.title = '我的消息'
export default memo(() => {
    const messType = storage.get("userType")//用户类别 村委1 村民2
    const personal = storage.get("userInfo")//个人信息
    const [list, setList] = useState([])
    const listData = [
        { name: "系统消息", title: '身份认证信息通过', icon: reportImg, path: "/myMessage/systemMess", numName: 'sysMessageCount', num: 0 },
        { name: "随手拍", title: '您有随手拍任务待处理', icon: takePicMessImg, path: "/myMessage/takePicMess", numName: 'snapshotCount', num: 0 },
        { name: "信息上报", title: '您上报的意见已审核', icon: messageImg, path: "/myMessage/reportMess", numName: 'messageReportCount', num: 0 },
        { name: "巡检服务", title: '您有巡检服务待处理', icon: inspec, path: "/myMessage/inspecMess", numName: 'inspectionRecordCount', num: 0 },
        { name: "创业空间", title: '您提交的空间预约已审核', icon: buSpaceImg, path: "/myMessage/buSpaceMess", numName: 'appointmentRecordCount', num: 0 },
        { name: "书记信箱", title: '您上报的信息已审核', icon: secreImg, path: "/myMessage/secreMess", numName: 'secretaryMailbox', num: 0 }
    ]
    useEffect(() => {
        (async function () {
            document.title = '我的消息'
            if (messType === 1) {
                const res = await getVillList({ villageId: personal.personal, userId: personal.userId })
                listData.map(item => {
                    for (let k in res.results) {
                        if (item.numName === k) {
                            item.num = res.results[k]
                        }
                    }
                })
                setList(() => {
                    let newArr = listData.filter(item => item.name !== '信息上报')
                    return newArr
                })
            } else if (messType === 2) {
                const res = await getList({ userId: personal.userId })
                listData.map(item => {
                    for (let k in res.results) {
                        if (item.numName === k) {
                            item.num = res.results[k]
                        }
                    }
                })
                setList(() => {
                    let newArr = listData.filter(item => item.name !== '巡检服务')
                    return newArr
                })
            }
        })()
    }, [])
    return (<div className={styles.messBox}>
        {list && list.map((item, index) => {
            return (
                <button className={styles.messBtn} key={index} onClick={() => pushUrl({ pathname: item.path })}>
                    <div className={styles.messCon}>
                        <img className={styles.messIcon} src={item.icon} alt='' />
                        <div className={styles.messText}>
                            <div className={styles.messName}>{item.name}</div>
                            <div className={styles.messTit}>{(messType === 2 && item.name === "随手拍") ? '您上报的随手拍已审核' : item.title}</div>
                        </div>
                    </div>
                    <div className={styles.num}>
                        {item.num > 99 ? '99+' : item.num}
                    </div>
                </button>)
        })}
    </div>)
})