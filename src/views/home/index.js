import React, { memo, useEffect, useState, useCallback } from "react";
import Header from "./components/Header";
import Tab from "./components/Tab";
import VillageTab from "./components/villageTab";
import Periphery from "./components/Periphery";
import News from "./components/News";
import Villager from "./components/Villager";
import VillageCommittee from "./components/villageCommittee";
import storage from "framework/utils/storage";
import styles from "./components/index.less";

export default memo(() => {
  const [userType, setuserType] = useState(storage.get("userType"));

  const refresh = useCallback(() => {
    setuserType(storage.get("userType"));
  }, [setuserType]);

  // userType 1. 村委  2. 村民  3.游客
  const renderDisplay = useCallback(() => {
    if (userType === 1) {
      return (
        <>
          <VillageCommittee />
        </>
      );
    } else if (userType === 2) {
      return (
        <>
          <VillageTab />
          {/* <Villager /> */}
          <News />
          <Periphery />
        </>
      );
    } else {
      return (
        <>
          <Tab />
          <News />
          <Periphery />
        </>
      );
    }
  }, [userType]);

  useEffect(() => {
    renderDisplay();
    const watchIndex = storage.watch("userType", 500, refresh);
    setTimeout(() => {
      storage.stopWatch(watchIndex)
    }, 6000)
    return () => {
      storage.stopWatch(watchIndex);
    };
  }, [refresh, renderDisplay]);
  return (
    userType && (
      <div className={styles.homeContainer}>
        <Header userType={userType} />
        {renderDisplay()}
      </div>
    )
  );
});
