import React, { memo, useState, useCallback, useMemo, useEffect } from "react";
import { TabBar } from "antd-mobile";
import styles from "./index.less";
import taskIcon from 'assets/images/newImg/taskIcon.png'
import taskActiveIcon from 'assets/images/newImg/taskActiveIcon.png'
import statisticsIcon from 'assets/images/newImg/statisticsIcon.png'
import statisticsActiveIcon from 'assets/images/newImg/statisticsActiveIcon.png'
import Task from './components/Task';
import Statistics from './components/Statistics';
import { reLaunch, getRouterInfo } from "framework/utils/url";

const myPatrolList = [
    {
        key: "task",
        component: Task,
        icon: taskIcon,
        selectedIcon: taskActiveIcon,
        title: "任务",
    },
    {
        key: "statistics",
        component: Statistics,
        icon: statisticsIcon,
        selectedIcon: statisticsActiveIcon,
        title: "统计",
    },
];

document.title = "巡检服务"
export default memo(() => {
    const { pathname, query } = getRouterInfo();
    const [selectedTab, setSelectedTab] = useState("");

    const pageKey = useMemo(() => pathname.split("/")[2] || "task", [pathname]);
    const changePage = useCallback(
        (item) => {
            if (item.key === 'task') reLaunch({ pathname: `/myPatrol/${item.key}` });
            else reLaunch({ pathname: `/myPatrol/${item.key}` });
        },
        [pageKey, query]
    );
    useEffect(() => {
        setSelectedTab(pageKey);
    }, [setSelectedTab, pageKey])

    return (
        <>
            <div className={styles.myPatrolContainer}>
                <TabBar
                    unselectedTintColor="#949494"
                    tintColor="#33A3F4"
                    barTintColor="white"
                    tabBarPosition="bottom"
                >
                    {myPatrolList.map(item => {
                        return (
                            <TabBar.Item
                                icon={{ uri: item.icon }}
                                selectedIcon={{ uri: item.selectedIcon }}
                                title={item.title}
                                key={item.key}
                                selected={selectedTab === item.key}
                                onPress={() => {
                                    changePage(item);
                                }}
                            >
                                <div className={styles.contentWrap}>
                                    {pageKey === item.key ? (
                                        <item.component key={item.key} />
                                    ) : null}
                                </div>
                            </TabBar.Item>
                        );
                    })}
                </TabBar>
            </div>
        </>
    );
});
