import React, { memo } from "react";
import styles from '../index.less'
import { wxPushUrl } from "framework/utils/url";
import comment from 'assets/images/newImg/comment.png';

const list = [
    { name: "留言上报", icon: comment, path: "/informationReport/messageReport" },
]

document.title = '信息上报'
export default memo(() => {
    return <div className={styles.informationReportContainer}>
        <div className={styles.banner}>
            <div>搭建一站式信息上报平台</div>
            <div>信息线上上报</div>
        </div>
        <div className={styles.navBox}>
            {list.map((item, index) => {
                return <button key={index} onClick={() => wxPushUrl({ pathname: item.path })}>
                    <div className={styles.leftBox}>
                        <img src={item.icon} />
                        <div>{item.name}</div>
                    </div>
                    <div className={styles.rightBox}>
                        <img src={require('assets/images/newImg/arrow-right.png')} />
                    </div>
                </button>
            })}
        </div>
    </div>
})