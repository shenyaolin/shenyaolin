import React, { memo, useState, useCallback } from "react";
import Banner from "./Banner";
import styles from './index.less'

const villagerList = [
    { name: '三务公开', path: '', englishName: 'services', rightContent: '了解村务来这里' },
    { name: '惠农政策', path: '', englishName: 'Huinong', rightContent: '惠农政策少补了' },
]

const huiNongList = [
    { title: '关于拟认定浉河港镇郝家冲村居民特色样板名单的公示', img: "1", date: '2022-03-25' },
    { title: '关于拟认定浉河港镇郝家冲村居民特色样板名单的公示', img: "", date: '2022-03-25' },
]

export default memo(() => {
    const [imgList, setImgList] = useState(["1", "2", "3", "4"])

    const renderHuiNong = useCallback(() => {
        return (
            huiNongList.map((item, index) => {
                return (
                    <div className={styles.huiNongBox} key={index}>
                        <div className={styles.huiNongItem} >
                            <div className={styles.title}>{item.title}</div>
                            <div className={styles.date}>{item.date}</div>
                        </div>
                        {item.img && <div className={styles.img}>{item.img}</div>}
                    </div >
                )
            })
        )
    }, [])

    return (
        <>
            {
                villagerList.map((item, index) => {
                    return (
                        <div className={styles.villagerContainer} key={index}>
                            <div className={styles.servicesBox}>
                                <div className={styles.name}>{item.name}
                                    <img alt="" src={require('../../../assets/images/newImg/Underline.png')} />
                                </div>
                                <div className={styles.more}>{item.rightContent}&gt;</div>
                            </div>
                            {index === 0 && <Banner imgList={imgList} pagination={true} />}
                            {index === 1 && renderHuiNong()}
                        </div>
                    )
                })
            }
        </>
    )
})