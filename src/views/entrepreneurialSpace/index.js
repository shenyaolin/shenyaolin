import React, { memo } from "react";
import styles from './index.less'
import { wxPushUrl } from "framework/utils/url";
import subscribe from 'assets/images/newImg/subscribe.png'
import mySubscribe from 'assets/images/newImg/mySubscribe.png'

const list = [
    { name: "预约创业空间", icon: subscribe, path: "/entrepreneurialSpace/subscribe" },
    { name: "我的预订", icon: mySubscribe, path: "/entrepreneurialSpace/mySubscribe" },
]

document.title = '创业空间'
export default memo(() => {

    return <div className={styles.enterpreneurialContainer}>
        <div className={styles.banner}>
            <div>搭建一站式社区创业就业平台</div>
            <div>创业空间线上预约</div>
        </div>
        <div className={styles.navBox}>
            {list.map((item, index) => {
                return <div className={styles.listItem} key={index}>
                    <img src={item.icon} alt="" className={styles.icon} />
                    <div>{item.name}</div>
                    <div onClick={() => wxPushUrl({ pathname: item.path })}>查看<img src={require('../../assets/images/newImg/arrow-right.png')} alt="" /></div>
                </div>
            })}
        </div>
    </div>
})