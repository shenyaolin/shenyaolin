import React, { memo, useState, useEffect, useCallback, useMemo } from "react";
import { TabBar } from "antd-mobile";
import { reLaunch, getRouterInfo } from "framework/utils/url";
import Home from "../home";
import Mine from "../mine";
import ServiceHall from "../serviceHall";
import Agriculture from "../agriculture";
import styles from "./index.less";
import homeIcon from "assets/images/img/home.png";
import homeActiveIcon from "assets/images/img/home-active.png";
import mineIcon from "assets/images/img/mine.png";
import mineActiveIcon from "assets/images/img/mine-active.png";
import serviceIcon from "assets/images/img/service.png";
import serviceActiveIcon from "assets/images/img/service-active.png";
import agricultureIcon from "assets/images/img/agriculture.png";
import agricultureActiveIcon from "assets/images/img/agriculture-active.png";
import storage from "framework/utils/storage";
import { getUserMsg } from "services/user";

const ykcomponentList = [
  {
    key: "home",
    title: "首页",
    headerTitle: "乐帮农",
    component: Home,
    icon: homeIcon,
    selectedIcon: homeActiveIcon,
    showIcon: true,
    header: "首页",
  },
  {
    key: "agriculture",
    title: "数融农旅",
    headerTitle: "乐帮农",
    component: Agriculture,
    icon: agricultureIcon,
    selectedIcon: agricultureActiveIcon,
    showIcon: true,
    header: "首页",
  },
  {
    key: "mine",
    title: "我的",
    headerTitle: "我的",
    component: Mine,
    icon: mineIcon,
    selectedIcon: mineActiveIcon,
    header: "我的",
  },
];

const cmcomponentList = [
  {
    key: "home",
    title: "首页",
    headerTitle: "乐帮农",
    component: Home,
    icon: homeIcon,
    selectedIcon: homeActiveIcon,
    showIcon: true,
    header: "首页",
  },
  {
    key: "serviceHall",
    title: "服务大厅",
    headerTitle: "乐帮农",
    component: ServiceHall,
    icon: serviceIcon,
    selectedIcon: serviceActiveIcon,
    showIcon: true,
    header: "首页",
  },
  {
    key: "agriculture",
    title: "数融农旅",
    headerTitle: "乐帮农",
    component: Agriculture,
    icon: agricultureIcon,
    selectedIcon: agricultureActiveIcon,
    showIcon: true,
    header: "首页",
  },
  {
    key: "mine",
    title: "我的",
    headerTitle: "我的",
    component: Mine,
    icon: mineIcon,
    selectedIcon: mineActiveIcon,
    header: "我的",
  },
];

const cwcomponentList = [
  {
    key: "home",
    title: "首页",
    headerTitle: "乐帮农",
    component: Home,
    icon: homeIcon,
    selectedIcon: homeActiveIcon,
    showIcon: true,
    header: "首页",
  },
  {
    key: "agriculture",
    title: "数融农旅",
    headerTitle: "乐帮农",
    component: Agriculture,
    icon: agricultureIcon,
    selectedIcon: agricultureActiveIcon,
    showIcon: true,
    header: "数融农旅",
  },
  {
    key: "mine",
    title: "我的",
    headerTitle: "我的",
    component: Mine,
    icon: mineIcon,
    selectedIcon: mineActiveIcon,
    header: "我的",
  },
];

function Layout() {
  const { pathname, query } = getRouterInfo();
  const [selectedTab, setSelectedTab] = useState("");
  const [componentList, setcomponentList] = useState([]);
  const pageKey = useMemo(() => pathname.split("/")[1] || "home", [pathname]);
  const [userType, setuserType] = useState(storage.get("userType"));
  const [userInfo, setuserInfo] = useState(storage.get("userInfo") || []);
  const [openid, setopenid] = useState(storage.get("openid"));
  const changeComponentList = useCallback(() => {
    if (userType === 1) {
      setcomponentList(cwcomponentList);
    } else if (userType === 2) {
      setcomponentList(cmcomponentList);
    } else {
      setcomponentList(ykcomponentList);
    }
  }, [userType, setcomponentList]);

  const refresh = useCallback(() => {
    setuserType(storage.get("userType"));
  }, [setuserType]);
  const getUser = useCallback(
    async (id) => {
      let minType,
        userInfo = [],
        typeList = [];
      const { state, results } = await getUserMsg({ openId: id });
      if (state === 200) {
        storage.remove("userId")
        storage.remove("userInfo")
        storage.remove("userInfoList")
        storage.remove("typeList")
        storage.remove("userType")
        storage.set("userInfoList", results);
        if (results && results.length > 0) {
          results.map((item) => {
            typeList.push(item.userType);
          });
          minType = userType !== 3 ? userType : Math.min.apply(0, typeList);
          userInfo = results.filter((item) => {
            return item.userType === minType;
          });
        }
        storage.set("typeList", typeList);
        setuserType(minType || 3);
        storage.set("userType", minType || 3);
        setuserInfo(userInfo[0]);
        storage.set("userInfo", userInfo[0] || {});
        storage.set("userId", userInfo[0]?.userId || null);
      }
    },
    [userType]
  );

  useEffect(() => {
    if (openid) {
      // if (query.refresh) {
      getUser(openid);
      // }
    } else {
      if (query.openid) {
        storage.set("openid", query.openid);
        getUser(query.openid);
      } else {
        !userType && storage.set("userType", 3);
        changeComponentList();
      }
    }

    const watchIndex = storage.watch("userType", 500, refresh);
    setTimeout(() => {
      storage.stopWatch(watchIndex);
    }, 6000);
    return () => {
      storage.stopWatch(watchIndex);
    };
  }, [
    changeComponentList,
    query.openid,
    query.refresh,
    query.villageId,
    refresh,
    userType,
    openid,
    getUser,
  ]);

  useEffect(() => {
    changeComponentList();
  }, [changeComponentList]);

  useEffect(() => {
    setSelectedTab(pageKey);
  }, [setSelectedTab, pageKey]);

  const changePage = useCallback(
    (item) => {
      document.title = item.title;
      const userId = userInfo && userInfo.userId ? userInfo.userId : "";
      if (item.key === "mine" && !userId) {
        window.wx.miniProgram.redirectTo({
          url: "../authorize/index",
        });
      } else {
        reLaunch({ pathname: `/${item.key}` });
      }
    },
    [userInfo]
  );

  return (
    <>
      <TabBar
        unselectedTintColor="#949494"
        tintColor="#33A3F4"
        barTintColor="white"
      >
        {componentList.map((item, index) => {
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
    </>
  );
}

export default memo(Layout);
