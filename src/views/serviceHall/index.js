import React, { memo, useCallback, useEffect, useState } from "react";
import styles from "./index.less";
import { wxPushUrl } from "framework/utils/url";
import { addPoints } from "services/myPoints";
import config from "config/index";
import storage from "framework/utils/storage";
import message from "framework/utils/message";

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
  useEffect(() => { });

  const today = () => {
    var today = new Date();
    var dd = today.getDate() + 1;
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    today = `${yyyy}-${mm}-${dd}`;
    return new Date(today).getTime();
  }

  const handleClick = useCallback(async (item1) => {
    if (item1.type === "linkH5") {
      window.location.href = `${config.digitalVillageHref}/#/maket?organizationId=${config.organizationId}&sysId=${config.sysId}`;
    } else if (item1.path) {
      const { userId, name } = storage.get("userInfo");
      const todayTime = storage.get("todayTime");
      if (!todayTime) {
        const { state } = await addPoints({ score: 1, state: 1, type: 6, userId, userName: name });
        state === 200 && storage.set('todayTime', today());
      } else {
        if (new Date().getTime() - todayTime > 0) {
          const { state } = await addPoints({ score: 1, state: 1, type: 6, userId, userName: name });
          state === 200 && storage.set('todayTime', today());
        }
      }
      wxPushUrl({ pathname: item1.path });
    } else {
      message.toast("此功能正在开发中...");
    }
  }, []);

  return (
    <div className={styles.serviceHall}>
      {MenuList.map((item, index) => {
        return (
          <div className={styles.navContainer} key={index}>
            <div className={styles.navTitle}>{item.name}</div>
            <div className={styles.navContent}>
              {(item?.children ?? []).map((item1, index1) => {
                return (
                  <div key={index1} className={styles.navItem} onClick={() => handleClick(item1)}>
                    <div
                      className={styles.icon}
                    >
                      <img
                        alt=""
                        src={require(`../../assets/images/newImg/villagecommittee-icon${item1.icon}.png`)}
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
    </div>
  );
});
