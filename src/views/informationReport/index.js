import React, { memo, useState, useCallback, useMemo, useEffect } from "react";
import { TabBar } from "antd-mobile";
import styles from "./index.less";
import InformationIcon from 'assets/images/newImg/Information-icon.png'
import InformationActiveIcon from 'assets/images/newImg/Information-active-icon.png'
import OpinionBoxIcon from 'assets/images/newImg/opinionBox-icon.png'
import OpinionBoxActiveIcon from 'assets/images/newImg/opinionBox-active-icon.png'
import Information from './components/Information';
import OpinionBox from './components/OpinionBox';
import { redirectTo, getRouterInfo } from "framework/utils/url";

const myPatrolList = [
    {
        key: "information",
        component: Information,
        icon: InformationIcon,
        selectedIcon: InformationActiveIcon,
        title: "信息上报",
    },
    {
        key: "opinionBox",
        component: OpinionBox,
        icon: OpinionBoxIcon,
        selectedIcon: OpinionBoxActiveIcon,
        title: "意见箱",
    },
];

document.title = "信息上报"
export default memo(() => {
    const { pathname, query } = getRouterInfo();
    const [selectedTab, setSelectedTab] = useState("");

    const pageKey = useMemo(() => pathname.split("/")[2] || "information", [pathname]);
    const changePage = useCallback(
        (item) => {
            if (item.key === 'information') redirectTo({ pathname: `/informationReport/${item.key}` });
            else redirectTo({ pathname: `/informationReport/${item.key}` });
        },
        [pageKey, query]
    );
    useEffect(() => {
        setSelectedTab(pageKey);
    }, [setSelectedTab, pageKey])

    return (
        <>
            <div className={styles.enterpreneurial}>
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
