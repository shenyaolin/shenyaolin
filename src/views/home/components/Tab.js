import React, { memo, useEffect, useState, useCallback } from "react";
import styles from "./index.less";
import config from 'config/index'
import homeIcon1 from "../../../assets/images/newImg/home-icon1.png";
import homeIcon2 from "../../../assets/images/newImg/home-icon2.png";
// import homeIcon3 from "../../../assets/images/newImg/home-icon3.png";
// import homeIcon4 from "../../../assets/images/newImg/home-icon4.png";
import homeIcon3 from "../../../assets/images/newImg/home-icon5.png";
import homeIcon5 from '../../../assets/images/newImg/home-icon10.png'
import homeIcon6 from "../../../assets/images/newImg/home-icon14.png";
import homeIcon7 from "../../../assets/images/newImg/home-icon7.png";
import homeIcon8 from "../../../assets/images/newImg/home-icon13.png";
import { wxPushUrl } from "framework/utils/url";
import message from "framework/utils/message";
const icons = [
  homeIcon1,
  homeIcon2,
  homeIcon3,
  // homeIcon4,
  // homeIcon5,
  homeIcon6,
  homeIcon7,
  homeIcon8,
  homeIcon5
];

const tabList = [
  { name: "村容风貌", path: "/villageLandscape" },
  { name: '智慧党建', path: "/smartPartyBuilding" },
  // { name: "民宿在线", path: "" },
  // { name: "线上展销", path: "" },
  { name: "美丽庭院", path: "/beautifulYard" },
  { name: "村贤事迹", path: "/famousVillager" },
  { name: "乡邻圈", path: "/neighborhood" },
  { name: "云上集市", icon: "10", path: "", type: "linkH5" },
  { name: '三务公开', path: "/threeServicePublicity" },
];

export default memo(() => {
  const handleClick = useCallback((item1) => {
    if (item1.type === "linkH5") {
      window.location.href = `${config.digitalVillageHref}/#/maket?organizationId=${config.organizationId}&sysId=${config.sysId}`
    } else if (item1.path) {
      wxPushUrl({ pathname: item1.path });

    } else {
      message.toast("此功能正在开发中...");
    }
  }, []);
  return (
    <div className={styles.tabContainer}>
      {tabList.map((item, index) => {
        return (
          <div
            key={index}
            className={styles.tabItem}
            onClick={() => handleClick(item)}
          >
            <img className={styles.tabImg} src={icons[index]} alt="" />
            <div className={styles.tabName}>{item.name}</div>
          </div>
        );
      })}
    </div>
  );
});
