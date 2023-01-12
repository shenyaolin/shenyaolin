import React, { memo, useEffect, useState, useCallback } from "react";
import styles from './index.less'
import { wxPushUrl } from "framework/utils/url";

import homeIcon1 from '../../../assets/images/newImg/home-icon5.png'
import homeIcon2 from '../../../assets/images/newImg/home-icon2.png'
import homeIcon3 from '../../../assets/images/newImg/home-icon9.png'
import homeIcon4 from '../../../assets/images/newImg/home-icon12.png'
import homeIcon5 from '../../../assets/images/newImg/home-icon10.png'
import homeIcon6 from '../../../assets/images/newImg/home-icon6.png'
import homeIcon7 from '../../../assets/images/newImg/home-icon7.png'
import homeIcon8 from '../../../assets/images/newImg/home-icon11.png'
import message from "framework/utils/message";


const icons = [homeIcon1, homeIcon2, homeIcon3, homeIcon4, homeIcon5, homeIcon6, homeIcon7, homeIcon8]

const tabList = [
    { name: '美丽庭院', path: "/beautifulYard" },
    { name: '智慧党建', path: "/smartPartyBuilding" },
    { name: '信息上报', path: "/informationReport" },
    { name: '随手拍', path: "/clapCasually" },
    { name: '三务公开', path: "/threeServicePublicity" },
    // { name: '补贴申领', path: "" },
    { name: '创业空间', path: "/entrepreneurialSpace" },
    { name: '乡邻圈', path: "/neighborhood" },
    { name: '村贤事迹', path: "/famousVillager" },

]

export default memo(() => {
    const handleClick = useCallback((item1) => {
        if (item1.path) {
            wxPushUrl({ pathname: item1.path });
        } else {
            message.toast("此功能正在开发中...");
        }
    }, []);
    return (
        <div className={styles.tabContainer}>
            {
                tabList.map((item, index) => {
                    return (
                        <div key={index} className={styles.tabItem} onClick={() => handleClick(item)}>
                            <img className={styles.tabImg}
                                src={icons[index]}
                                alt='' />
                            <div className={styles.tabName}>{item.name}</div>
                        </div>
                    )
                })
            }
        </div>
    )
})