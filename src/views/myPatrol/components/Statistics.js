import React, { memo, useState, useCallback, useRef, useEffect } from "react";
import DatePicker from "framework/components/Form/entry/DatePicker";
import styles from "../index.less";
import classnames from "classnames";
import { getInspectionOverview, getAllOverview, getAllInspection, getMyInspection } from 'services/myPatrol';
import { wxPushUrl } from "framework/utils/url";
import { showLoading, hideLoading } from "framework/utils/loading";
import Tab from '../../../components/Tab';
import echarts from 'echarts'

const tabs = [{ label: "全局统计" }, { label: "我的统计" }];

const taskNum = [
    { label: '未签到巡检', field: "notSignIn", status: "1" },
    { label: '进行中巡检', field: "inProgress", status: "0" },
    { label: '已完成巡检', field: "completed", status: "2" },
]

document.title = "统计"
export default memo(() => {
    const [tabIndex, setTabIndex] = useState(0);
    const [AllOverview, setAllOverview] = useState({})
    const [AllInspection, setAllInspection] = useState([])
    const [echartsData, setEcharts] = useState([])
    const [year, setYear] = useState(`${new Date().getFullYear()}`)
    const echartRef = useRef(null)

    const handleTabIndex = useCallback((index) => {
        setTabIndex(index)
        setYear(`${new Date().getFullYear()}`)
    })

    const handleChangeYear = useCallback((e) => {
        setYear(e)
    }, [])

    const getInspection = async () => {
        const { state, results } = await getAllOverview({ year })
        if (state === 200) {
            setAllOverview(results)
            setEcharts([
                { value: results.help, name: '重点户帮扶', itemStyle: { color: "#662EEA" } },
                { value: results.look, name: '重点户看护', itemStyle: { color: "#FF775B" } },
                { value: results.inspection, name: '重点户巡检', itemStyle: { color: "#33D1AB" } },
            ])
        }
    };

    const getAllInspection1 = async () => {
        const { state, results } = await getAllInspection({ year })
        if (state === 200) {
            setAllInspection(results)
            hideLoading()
        }
    };

    const getMyInspection1 = async () => {
        const { state, results } = await getInspectionOverview({ year })
        if (state === 200) {
            setAllOverview(results)
        }
    };

    const getMyInspection2 = async () => {
        const { state, results } = await getMyInspection({ year })
        if (state === 200) {
            setAllInspection(results)
            hideLoading()
        }
    };

    useEffect(() => {
        var globalEchart;
        if (globalEchart === undefined) {
            globalEchart = echarts.init(echartRef.current);
        } else {
            globalEchart.clear()
        }
        var option = {
            title: {
                text: '巡检分析',
                left: "center",
                top: "center",
                textStyle: {
                    color: '#333',
                    fontWeight: 700,
                    fontSize: 14,
                },
            },
            tooltip: {
                trigger: 'item',
                formatter: "{b}: {d}%"
            },
            legend: {
                bottom: 'bottom',
                icon: "circle"
            },
            series: [
                {
                    type: 'pie',
                    radius: ['50%', '70%'],
                    avoidLabelOverlap: false,
                    startAngle: 180, //起始角度
                    itemStyle: {
                        normal: {
                            borderColor: '#fff',
                            borderWidth: 8,
                        }
                    },
                    labelLine: {
                        normal: {
                            show: true,
                            length: 10, // 修改引导线第一段的长度
                            length2: 10, // 修改引导线第二段的长度
                            // lineStyle: {
                            //     color: "red" // 修改引导线的颜色
                            // }
                        },
                    },
                    label: {
                        normal: {
                            show: true,
                            position: 'outside',
                            textStyle: {
                                color: '#333',
                                fontSize: 13,
                                fontFamily: "SourceHanSansCN-Regular"
                            },
                            formatter: "{b}\n{d}%",
                            distanceToLabelLine: 3
                        },
                    },
                    data: echartsData
                }
            ]
        };
        globalEchart.setOption(option);
        return () => {
            //  销毁实例。实例销毁后无法再被使用
            globalEchart.dispose()
        }
    }, [echartsData])

    useEffect(() => {
        // showLoading({ duration: 999 });
        if (tabIndex === 0) {
            getInspection()
            getAllInspection1()
        } else {
            getMyInspection1()
            getMyInspection2()
        }
    }, [year, tabIndex])

    const handleJump = (index) => {
        if (tabIndex === 1) {
            wxPushUrl({ pathname: "/myPatrol/statistics/details", query: { status: taskNum[index].status } })
        }
    }
    console.log(AllInspection);
    return (
        <>
            <div className={styles.staisticsContainer}>
                <Tab tabs={tabs} handleTabIndex={handleTabIndex}></Tab>
                <DatePicker mode="year" value={year} placeholder="" onChange={handleChangeYear}></DatePicker>
                <div className={styles.task}>
                    <div className={styles.circleBox}>
                        <div className={styles.circle}>
                            <div className={styles.circleContent}>
                                <div className={styles.taskData}>{AllOverview.all}<span>个</span></div>
                                <div className={styles.taskLable}>全部任务</div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.bottomBox}>
                        {
                            taskNum.map((item, index) => {
                                return (
                                    <div className={styles.bottomItem} key={index}>
                                        <div className={styles.taskData}>{AllOverview[item.field]}<span>个</span></div>
                                        <div className={classnames(styles.taskLable, tabIndex === 1 && styles.taskLableAfter)} onClick={() => handleJump(index)}>{item.label}</div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                {
                    tabIndex === 0 && <div className={styles.echarts}>
                        <div ref={echartRef} className={styles.echartsBox}></div>
                    </div>
                }
                {
                    AllInspection.length > 0 && AllInspection.map((item, index) => {
                        return (
                            <div className={styles.allInspectionItem} key={index}>
                                <div className={styles.month}>{item.month}月</div>
                                <div className={styles.content}>
                                    {
                                        taskNum.map((item1, index1) => {
                                            return (
                                                <div className={styles.taskItem} key={index1}>
                                                    <div className={styles.taskData}>{AllInspection[index][item1.field]}<span>个</span></div>
                                                    <div className={classnames(styles.taskLable, tabIndex === 1 && styles.taskLableAfter)} onClick={() => handleJump(index1)}>{item1.label}</div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </>
    );
});
