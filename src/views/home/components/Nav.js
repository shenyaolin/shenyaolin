import React, { memo, useCallback, useEffect, useState } from "react";
import storage from "framework/utils/storage";
import styles from "./index.less";
import { wxPushUrl } from "framework/utils/url";
import message from "framework/utils/message";
import config from "config/index";
const MenuList = [
  {
    name: "乡村治理",
    children: [
      { name: "村务在线", icon: "1", path: "/threeServicePublicity" },
      { name: "智慧党建", icon: "2", path: "/smartPartyBuilding" },
      { name: "信息上报", icon: "3", path: "/informationReport" },
      { name: "随手拍", icon: "4", path: "/clapCasually" },
      { name: "书记信箱", icon: "5", path: "/secretaryMailbox" },
      // { name: "信息广播", icon: "6", path: "" },
      { name: "巡检服务", icon: "4", path: "/myPatrol" },
    ],
  },
  {
    name: "乡村产业",
    children: [
      { name: "就业导师", icon: "7", path: "/employmentTutor" },
      { name: "创业空间", icon: "8", path: "/entrepreneurialSpace" },
      { name: "创业政策", icon: "9", path: "/entrepreneurshipPolicy" },
      { name: "云上集市", icon: "10", path: "", type: "linkH5" },
      // { name: "民宿在线", icon: "11", path: "" },
      // { name: "产品展销", icon: "12", path: "" },
    ],
  },
  {
    name: "乡风文明",
    children: [
      { name: "村容风貌", icon: "13", path: "/villageLandscape" },
      { name: "村贤事迹", icon: "14", path: "/famousVillager" },
      { name: "美丽庭院", icon: "15", path: "/beautifulYard" },
      { name: "乡邻圈", icon: "16", path: "/neighborhood" },
    ],
  },
];
export default memo(() => {
  const [menu, setMenu] = useState([]);
  useEffect(() => { });

  const handleClick = useCallback((item1) => {
    if (item1.type === "linkH5") {
      window.location.href = `${config.digitalVillageHref}/#/maket?organizationId=${config.organizationId}&sysId=${config.sysId}`;
    } else if (item1.path) {
      const { userType } = storage.get("userInfo");
      if (item1.path === "/informationReport" && userType === 1) {
        wxPushUrl({ pathname: "/informationReport/cwOpinionBox" });
      } else {
        wxPushUrl({ pathname: item1.path });
      }
    } else {
      message.toast("此功能正在开发中...");
    }
  }, []);

  return (
    <>
      {MenuList.map((item, index) => {
        return (
          <div className={styles.navContainer} key={index}>
            <div className={styles.navTitle}>{item.name}</div>
            <div className={styles.navContent}>
              {(item?.children ?? []).map((item1, index1) => {
                return (
                  <div key={index1} className={styles.navItem}>
                    <div
                      className={styles.icon}
                      onClick={() => handleClick(item1)}
                    >
                      <img
                        src={require(`../../../assets/images/newImg/villagecommittee-icon${item1.icon}.png`)}
                      />
                    </div>
                    <div className={styles.name}>{item1.name}</div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </>
  );
});
