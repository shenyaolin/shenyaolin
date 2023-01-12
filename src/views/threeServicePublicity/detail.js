import React, { memo } from "react";
import styles from './index.less'

document.title = "村务公开"
export default memo(() => {

    return (
        <div className={styles.threeServicePublicityDetailContainer}>
            <div className={styles.title}>组织开展慰问帮扶系列活动</div>
            <div className={styles.time}>
                <div>2022-06-10</div>
                <div>112</div>
            </div>
            <div className={styles.introdice}>组织开展系列活动扶志气。结合帮扶单位，通过系列
                活动，宣传脱贫攻坚先进典型，弘扬正能量，激发贫
                困村民脱贫致富的信心，让他们自愿努力起来，拒绝
                “要、靠、等、怨”，自立自强，积极自发地为脱贫
                致富奔小康而加油干。
            </div>
            <img alt="" src={require(`../../assets/images/newImg/village-affairs0.png`)} />
            <img alt="" src={require(`../../assets/images/newImg/village-affairs10.png`)} />
        </div>
    )
})