import React, { memo, useEffect, useState, useCallback } from "react";
import styles from './index.less'
import { pushUrl } from "framework/utils/url";
import message from "framework/utils/message";
import Tab from '../../components/Tab';

const content = [
    { title: "组织开展慰问帮扶系列活动", creatDate: "2022-06-10", play: 112 },
    { title: "'三清一改'成效显著", creatDate: "2022-06-03", play: 98 },
    { title: "创建“五美庭院”，共筑幸福家园", creatDate: "2022-05-26", play: 78 },
    { title: "'三带四片'全面整治", creatDate: "2022-05-19", play: 80 },
    { title: "搭建茶旅产业信息服务平台", creatDate: "2022-05-12", play: 120 },
    { title: "实施旅游开发项目", creatDate: "2022-05-05", play: 100 },
]

document.title = "三务公开"
export default memo(() => {
    const tabs = [{ label: "村务公开" }, { label: "党务公开" }, { label: "财务公开" }]
    return (
        <div className={styles.threeServicePublicityContainer}>
            <Tab tabs={tabs}></Tab>
            <div className={styles.Tabcontent}>
                {
                    content.map((item, index) => {
                        return <div key={index} onClick={() => {
                            pushUrl({
                                pathname: "/threeServicePublicity/detail",
                                query: { index },
                            })
                        }} className={styles.TabcontentItem}>
                            <div>
                                <div className={styles.title}>{item.title}</div>
                                <div className={styles.botton}>
                                    <div>{item.creatDate}</div>
                                    <div className={styles.play}>{item.play}</div>
                                </div>
                            </div>
                            <img alt="" src={require(`../../assets/images/newImg/village-affairs${index}.png`)} />
                        </div>
                    })
                }
            </div>
        </div>
    )
})