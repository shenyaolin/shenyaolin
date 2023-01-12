import React, { memo, useCallback, useState, useEffect } from "react";
import * as _ from "lodash";
import styles from './index.less';
import arrowRight from 'assets/images/newImg/arrow-right-gray.png';
import arrowLeft from 'assets/images/newImg/arrow-left-gray.png';

class DateItem {
    /**
     *
     * @param  dayNum 日数, 如果和 new Date().getDate() 相等则是今天
     * @param  isSignIn=false 是否签到
     */
    constructor({ dayNum, isSignIn = false }) {
        Object.assign(this, {
            dayNum,
            isSignIn,
        });
    }
}

const weeks = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
export default memo((props) => {
    const { handleCalendarChange, Monthlist } = props;
    const [state, setState] = useState({})
    const [show, setShow] = useState(false)
    useEffect(() => {
        const { year, month } = state;
        initState(year, month)
    }, [handleCalendarChange, Monthlist])

    const initState = (y, m) => {
        const date = new Date();
        const year = y || date.getFullYear(); // 本年
        const month = m || date.getMonth() + 1; // 本月


        let date2 = new Date(year, month, 0);
        let days = date2.getDate(); // 本月有多少天

        date2.setDate(1);
        let day = date2.getDay(); // 本月第一天是星期几

        let list = [];
        const nowadays = date.getDate(); // 本日
        const thisMonth = date.getMonth() + 1; // 本月
        const thisYear = date.getFullYear(); // 本年

        // let isShowSignIn = false;
        // const date2GtDate = date2 > date;
        // const isThisMonth = month === thisMonth; // 选择的日期的月份是否是本月
        for (let i = 0; i < days + day; i++) {
            const dayNum = i - day + 1;
            if (i < day) {
                list.push(new DateItem({ dayNum: 0 }));
            } else {
                list.push(new DateItem({ dayNum, isSignIn: Monthlist[list.length - day] && Monthlist[list.length - day].flag }));
            }
        }
        let hlist = getHlist(list);
        setState({
            date,
            year,
            month,
            days,
            day,
            list,
            hlist,
            nowadays,
            thisMonth,
            thisYear
        });
        setShow(true)
    }

    // 把一维日期切成二维日期
    const getHlist = (list) => {
        let hlist = _.chunk(list, 7); // 转化为二维数组
        let len = hlist.length;
        let to = 7 - hlist[len - 1].length;

        // 循环尾部补空格
        for (let i = 0; i < to; i++) {
            hlist[len - 1].push(new DateItem({ dayNum: 0 }));
        }
        return hlist;
    };

    // 上月
    const handlePrevMonth = () => {
        let prevMonth = state.month + -1;
        let prevYear = state.year;
        if (prevMonth < 1) {
            prevMonth = 12;
            prevYear -= 1;
        }
        handleCalendarChange(prevYear, prevMonth);
        initState(
            prevYear,
            prevMonth,
        )
    }

    // 下月
    const handleNextMonth = () => {
        let nextMonth = state.month + 1;
        let nextYear = state.year;
        if (nextMonth > 12) {
            nextMonth = 1;
            nextYear += 1;
        }
        handleCalendarChange(nextYear, nextMonth);
        initState(
            nextYear,
            nextMonth,
        );
    }

    const handleImgType = (data) => {
        const { year, month, nowadays, thisMonth, thisYear } = state;
        if (!data.isSignIn) {
            if (year === thisYear) {
                if (month < thisMonth) {
                    return true
                } else if (month === thisMonth && data.dayNum < nowadays) {
                    return true
                }
                else {
                    return false
                }
            } else if (year < thisYear) {
                return true
            } else {
                return false
            }
        }
    }

    const { year, month, nowadays, thisMonth, thisYear } = state;
    return (
        <>
            {
                show && <div className={styles.calendarContainer}>
                    <div className={styles.calendarTitle}>
                        <img onClick={handlePrevMonth} src={arrowLeft} alt="" />
                        <div>{year}年{month}月</div>
                        <img onClick={handleNextMonth} src={arrowRight} alt="" />
                    </div>
                    <table>
                        <tbody>
                            <tr className={styles.weekName}>
                                {weeks.map(el => (
                                    <th key={el}>{el}</th>
                                ))}
                            </tr>
                            {state.hlist.map((el, i) => {
                                return (
                                    <tr key={i}>
                                        {el.map((dateItem, j) => {
                                            const dayNum = dateItem.dayNum;
                                            return (
                                                <td key={j} style={{ opacity: dayNum === 0 ? 0 : 1, }} className={styles.dayItem}>
                                                    <div style={{ filter: handleImgType(dateItem) && "grayscale(100%)" }}>
                                                        <div className={styles.signStatusBox}>
                                                            {dateItem.isSignIn ? <img alt="" src={require("../../assets/images/newImg/blue-check.png")} /> : "+1"}
                                                        </div>
                                                    </div>
                                                    <div>{(dayNum === nowadays && month === thisMonth && year === thisYear) ? "今天" : month + "." + dayNum}</div>
                                                </td>
                                            );
                                        })}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            }
        </>
    );
})
