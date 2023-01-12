import React, { memo, useEffect, useState, useCallback } from "react";
import styles from './index.less'
import banner from '../../assets/images/newImg/smartPartyBuilding-banner.png';
import icon1 from '../../assets/images/newImg/smartPartyBuilding-icon1.png';
import icon2 from '../../assets/images/newImg/smartPartyBuilding-icon2.png';
import icon3 from '../../assets/images/newImg/smartPartyBuilding-icon3.png';
import img1 from '../../assets/images/newImg/smartPartyBuilding-img.png';

const tab = [
    { title: "党组织", icon: icon1 },
    { title: "党员情况", icon: icon2 },
    { title: "党建活动", icon: icon3 },
]

document.title = "智慧党建"
export default memo(() => {

    return (
        <div className={styles.smartPartyBuildingContainer}>
            <div className={styles.top}>
                <img alt="" src={banner} className={styles.banner} />
                <div className={styles.tabBox}>
                    {
                        tab.map((item, index) => {
                            return <div key={index} className={styles.tabItem}>
                                <img alt="" src={item.icon} />
                                <div>{item.title}</div>
                            </div>
                        })
                    }
                </div>
            </div>
            <div className={styles.introduce}>
                <div className={styles.title}>浉河港镇郝家冲村党支部</div>
                <img alt="" src={img1} />
                <div>    <p>郝家冲村是浉河港镇政府所在地，总面积24.2平方公里。共有14个村民组，人口715户2966人。
                    全村山林面积2.5万余亩，境内何家寨是“五云、两潭一寨”名茶山头之一，是名优信阳毛尖茶的正宗产区。
                    目前全村现有党员60人，年轻党员居多，近年来，郝家冲村党支部在乡村振兴、脱贫攻坚主战场不断强化党组织的引领力、
                    凝聚力、战斗力，以高质量党建引领全村高质量发展。</p>
                    <p>挑选了2名大专生进入两委班子，村支两委干部达到7人，并重点培养2名村委后备干部，两委战斗力明显增强。</p></div>
            </div>
        </div>
    )
})