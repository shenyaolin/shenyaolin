import React, { memo, useCallback, useState, useEffect, useRef } from "react";
import styles from "./index.less";
import { wxPushUrl } from "framework/utils/url";
import arrowBottom from '../../assets/images/newImg/arrow-bottom.png';
import arrowTop from '../../assets/images/newImg/arrow-top.png';
import camera from '../../assets/images/newImg/camera.png';
import information from '../../assets/images/newImg/information.png';
import neighborhood from '../../assets/images/newImg/neighborhood.png';
import application from '../../assets/images/newImg/application.png';
import rmbSmall from '../../assets/images/newImg/rmb-small.png';
import Calendar from '../../components/Calendar';
import Tab from '../../components/Tab';
import { addSign, getSign, getMonthSign, getScoreRank, getCheckExchange, getTotalScore } from 'services/myPoints';
import classnames from 'classnames';
import message from 'framework/utils/message';
import PagingList from "framework/components/PagingList";
import NewPagingList from "../../components/NewPagingList";
import api from "config/api";
import imageSrc from 'framework/utils/imageSrc';
import { showLoading, hideLoading } from "framework/utils/loading";

const tabs = [{ label: '赚积分' }, { label: '积分排行' }, { label: '积分明细' }, { label: '花积分' }]
const tabOne = [
    { title: "发布随手拍", icon: camera, subtitle: "发布一条随手拍", path: "/clapCasually/release", field: 2 },
    { title: "上报一条信息", icon: information, subtitle: "发布一条信息", path: '/informationReport/messageReport', field: 3 },
    { title: "发布乡邻圈", icon: neighborhood, subtitle: "乡邻圈发布一条生活动态", path: "/neighborhood/release", field: 4 },
    { title: "浏览应用", icon: application, subtitle: "浏览任意应用获得积分", path: "/serviceHall", field: 6 },
]
const type = { 1: "签到", 2: "随手拍", 3: "问题上报", 4: "发布乡领圈", 5: "积分兑换", 6: "浏览应用" }

document.title = "我的积分"
export default memo(() => {
    const date = new Date()
    const [tabIndex, setTabIndex] = useState(0);
    const [seven, setSenvne] = useState([])
    const [isCalendar, setIsCalendar] = useState(true)
    const [senvenResults, setSenvenResults] = useState({})
    const [isShow, setIsShow] = useState(false)
    const [scoreList, setScoreList] = useState({})
    const [exchange, setExchange] = useState([])
    const [TotalScore, setTotalScore] = useState(0)
    const listRef = useRef(null);
    const newListRef = useRef(null);
    const sevenDays = (day) => {
        var arr = []
        for (let i = 0; i < 7; i++) {
            var date = new Date()
            var str = day + i   //当前日期的后6天
            date.setDate(str)   // setDate 如果str超过当月天数  自动顺延下一个月
            var num = `${date.getMonth() + 1}.${date.getDate()}`
            if (date.getDate() === new Date().getDate()) {   //顺延7天这么写没问题  只是比较天
                num = "今天"
            }
            arr.push(num)
        }
        setSenvne(arr)
    }

    const handleTabIndex = async (index) => {
        setTabIndex(index)
        if (index === 1) {
            showLoading({ duration: 999 });
            const { state, results } = await getScoreRank()
            if (state === 200) {
                setScoreList(results)
                hideLoading()
            }
        }
    }

    const handleClick = (item) => {
        wxPushUrl({ pathname: item.path })
    }

    useEffect(() => {
        showLoading({ duration: 999 });
        getSignIn(new Date())
        getCheck()
    }, [])

    // 判断积分任务是否完成
    const getCheck = async () => {
        const { state, results } = await getCheckExchange()
        if (state === 200) {
            setExchange(results)
        }
    }
    //获取7天的签到
    const getSignIn = async (date) => {
        const { state, results } = await getSign({ day: date.getDate(), month: date.getMonth() + 1, year: date.getFullYear() })
        if (state === 200) {
            setSenvenResults(results)
            sevenDays((results.list.length === 2 && results.list[0].flag) ? new Date().getDate() - 1 : new Date().getDate())
            setIsShow(true)
            hideLoading()
        }
    }
    //签到
    const handleAddSign = async () => {
        const { state } = await addSign({ day: date.getDate(), month: date.getMonth() + 1, year: date.getFullYear() })
        if (state === 200) {
            message.toast("签到成功")
            getSignIn(new Date())
        }
    }
    // 切换日历和7天
    const handleIsCalendar = useCallback(async () => {
        showLoading({ duration: 999 });
        const { state, results } = await (isCalendar ? getMonthSign({ month: date.getMonth() + 1, year: date.getFullYear() }) : getSign({ month: date.getMonth() + 1, year: date.getFullYear(), day: date.getDate() }))
        if (state === 200) {
            setSenvenResults(results)
            !isCalendar && sevenDays((results.list.length === 2 && results.list[0].flag) ? new Date().getDate() - 1 : new Date().getDate())
            setIsCalendar(!isCalendar)
            hideLoading()
        }
    }, [isCalendar])
    // 日历月份切换
    const handleCalendarChange = async (year, month) => {
        const { state, results } = await getMonthSign({ month, year })
        if (state === 200) {
            setSenvenResults(results)
        }
    }

    const handleRenderTabContent = useCallback(() => {
        switch (tabIndex) {
            case 0:
                return (
                    <div className={styles.tabContentOne}>
                        {
                            tabOne.map((item, index) => {
                                return (
                                    <div key={index} className={styles.tabOneItem}>
                                        <div style={{ display: "flex" }}>
                                            <img src={item.icon} alt="" />
                                            <div className={styles.titleBox}>
                                                <div className={styles.title}>{item.title}<img alt="" src={rmbSmall} /><div>{index === 3 ? "+1" : "+2"}</div></div>
                                                <div className={styles.subtitle}>{item.subtitle}</div>
                                            </div>
                                        </div>
                                        {
                                            exchange.length > 0 && exchange[item.field - 1][item.field] ? <div className={styles.completed}>已完成</div> : <button onClick={() => handleClick(item)}>前往</button>
                                        }
                                    </div>
                                )
                            })
                        }
                    </div>
                )
            case 1:
                return (
                    <div className={styles.tabContentTwo}>
                        {
                            handleScoreContent()
                        }
                    </div>
                )
            case 2:
                return (
                    <div className={styles.tabContentThree}>
                        <NewPagingList
                            dataSource={api.myPoints.GET_POINTS_LIST}
                            ref={newListRef}
                            renderItem={renderItem1}
                            ajaxMethod="get"
                        />
                    </div>
                )
            case 3:
                return (
                    <div className={styles.tabContentFour}>
                        <div className={styles.header}>我能兑换</div>
                        <PagingList
                            dataSource={api.myPoints.GET_PRODUCT_LIST}
                            ref={listRef}
                            renderItem={renderItem}
                            ajaxMethod="get"
                        />
                    </div>
                )
        }
    }, [tabIndex, scoreList, exchange])
    // 花积分列表
    const renderItem = useCallback((item, index) => {
        return (
            <div className={styles.commodity} key={index}>
                <div className={styles.commodityItem} onClick={() => wxPushUrl({ pathname: "/myPoints/commodity", query: { merchandiseId: item.merchandiseId } })}>
                    <img src={imageSrc(item.image.split(',')[0])} alt="" />
                    <div className={styles.commodityName}>{item.merchandiseName}</div>
                    <div className={styles.commodityBottom}>
                        <div>{item.integralNumber}</div>
                        <button>立即兑</button>
                    </div>
                </div>
            </div>
        );
    }, [tabIndex]);
    //积分明细列表
    const renderItem1 = useCallback((item, index) => {
        return (
            <div className={styles.pointsDetailsItem} key={index}>
                {
                    item.name ?
                        <div className={styles.pointsDetailsItemMonth}>
                            <div>{`${item.name.split('-')[0]}年${item.name.split('-')[1]}月`}</div>
                            <div className={styles.pointsDetailsItemMonthRight}>
                                <span>获取<span>+{item.obtain}</span></span>
                                <span>消耗{item.consumption}</span>
                            </div>
                        </div>
                        : <div className={styles.pointsDetailsItemItem}>
                            <div>
                                <div className={styles.pointsDetailsItemItemType}>{type[item.type]}</div>
                                <div>{item.createTime}</div>
                            </div>
                            <div className={classnames(item.state === 1 && styles.consumption)}>
                                {item.state === 1 ? "+" : ""}{item.score}
                            </div>
                        </div>
                }
            </div>
        );
    }, [tabIndex]);
    // 签到以及日历
    const handleCalendar = useCallback(() => {
        return (
            <div className={styles.sevenBox}>
                {
                    isCalendar ? seven.map((item, index) => {
                        return <div key={index} className={styles.sevenItem}>
                            <div className={styles.signStatus}>
                                <div className={styles.signStatusBox}>
                                    {
                                        seven[0] === "今天" ? (senvenResults.list[index + 1]?.flag ? <img alt="" src={require("../../assets/images/newImg/blue-check.png")} /> : "+1") :
                                            (senvenResults.list[index]?.flag ? <img alt="" src={require("../../assets/images/newImg/blue-check.png")} /> : "+1")
                                    }
                                </div>
                            </div>
                            <div >{item}</div>
                        </div>
                    }) : <Calendar handleCalendarChange={handleCalendarChange} Monthlist={senvenResults.list}></Calendar>
                }
            </div>
        )
    }, [seven, isCalendar, senvenResults])

    //积分排行
    const handleScoreContent = useCallback(() => {
        return (
            <>
                <div className={styles.header}>
                    <div className={styles.ranking}>
                        {
                            scoreList.flag ? <>当前排名<span>{scoreList.rank}</span></> : "当前无排名"
                        }
                    </div>
                    <div className={styles.defaultExhibition}>默认展示前50名</div>
                </div>
                <table>
                    <tbody>
                        <tr>
                            <th>排名</th>
                            <th>姓名</th>
                            <th>积分</th>
                        </tr>
                        {
                            scoreList.list && scoreList.list.map((item, index) => {
                                return (
                                    <tr key={index} className={styles.scoreItem}>
                                        {
                                            handleScoreImgRank(index)
                                        }
                                        <td>{item.name}</td>
                                        <td>{item.score}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </>
        )
    }, [scoreList])

    const handleScoreImgRank = (index) => {
        if (index === 0) {
            return <td><img src={require("../../assets/images/newImg/the-first.png")} alt="" /></td>
        } else if (index === 1) {
            return <td><img src={require("../../assets/images/newImg/the-second.png")} alt="" /></td>
        } else if (index === 2) {
            return <td><img src={require("../../assets/images/newImg/the-third.png")} alt="" /></td>
        } else {
            return <td><div className={styles.scoreRank}>{index + 1}</div></td>
        }
    }

    useEffect(() => {
        const total = async () => {
            const { state, results } = await getTotalScore()
            if (state === 200) {
                setTotalScore(results)
            }
        }
        total()
    }, [])

    return (
        <>
            {isShow && <div className={styles.myPointsContainer}>
                <div className={styles.positionBox}></div>
                <div className={styles.header}>
                    <div className={styles.headerTop}>
                        <div className={styles.headerTopLeft}>{TotalScore}<span>积分</span></div>
                        <div className={styles.headerTopRight}>
                            <div className={styles.pointRule} onClick={() => wxPushUrl({ pathname: '/myPoints/rule' })}>积分规则</div>
                            <div className={styles.exchangeRecord} onClick={() => wxPushUrl({ pathname: '/myPoints/record' })}>兑换记录</div>
                        </div>
                    </div>
                    <div className={styles.headerBottom}>
                        <div className={styles.headerBottomTop}>
                            <div className={styles.signDays}>已累计签到<span>{senvenResults.countDay}</span>天</div>
                            <div className={classnames(styles.signBtn, senvenResults.signFlag && styles.SignedInBtn)} onClick={handleAddSign}>{senvenResults.signFlag ? "已签到" : "签到"}</div>
                        </div>
                        {
                            handleCalendar()
                        }
                        <div className={styles.headerBottomBottom}>
                            <img alt="" src={isCalendar ? arrowBottom : arrowTop} onClick={handleIsCalendar} />
                        </div>
                    </div>
                </div>
                <Tab tabs={tabs} handleTabIndex={handleTabIndex}></Tab>
                {
                    handleRenderTabContent()
                }
            </div>}
        </>
    );
});
