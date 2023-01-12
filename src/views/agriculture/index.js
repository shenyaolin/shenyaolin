import React, { memo, useCallback, useState, useEffect, useRef } from "react";
import { showLoading, hideLoading } from "framework/utils/loading";
import styles from "./index.less";
import { Tabs } from "antd-mobile";
import { reLaunch, wxPushUrl } from "framework/utils/url";
import arrowBottom from "assets/images/dfat/arrow-bottom.png";
import arrowTop from "assets/images/dfat/arrow-top.png";
import navigation from "assets/images/dfat/navigation.png";
import noData from "assets/images/dfat/noData.png";
import { getMapList } from "services/common";
import config from "config";
import imageSrc from "framework/utils/imageSrc";
import classnames from 'classnames';

const tabTitle = [
  "景点",
  "民宿",
  "驿站",
  "学校",
  "公厕",
  "示范茶园",
  "党员户",
  "农户",
  "企业",
  "党群服务",
];

const tabTitleList = [
  { name: "景点", index: 1 },
  { name: "民宿", index: 2 },
  { name: "驿站", index: 3 },
  { name: "学校", index: 4 },
  { name: "公厕", index: 5 },
  { name: "示范茶园", index: 6 },
  // { name: "党员户", index: 7 },
  // { name: "农户", index: 8 },
  { name: "企业", index: 9 },
  { name: "党群服务", index: 10 },
];

export default memo(() => {
  const [tabContent, setTabContent] = useState([]);
  const [tabIndex, setTabIndex] = useState(0);
  const [arrow, setArrow] = useState(false);
  const [mapData, setMapData] = useState({});
  const [mapDone, setMapDone] = useState(false);
  const [ele, setele] = useState(null);
  const [show, setShow] = useState(false);
  const [propData, setpropData] = useState({});
  const popover = useRef(null);
  const tabs = tabTitleList.map((item, index) => {
    return {
      title: (
        <div className={styles.tabItem} key={item.index}>
          <img
            alt=""
            src={require(`assets/images/dfat/dfat-${item.index - 1}.png`)}
          />
          <div className={classnames(styles.title, tabIndex === item.index && styles.activeTitle)}>{item.name}</div>
        </div>
      ),
    };
  });

  const getmessage = useCallback((eve) => {
    const type = eve.data.type;
    if (type === "loadFinish") {
      setMapDone(true);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("message", getmessage);
    return () => {
      window.removeEventListener("message", getmessage);
    };
  }, [getmessage]);
  // 显示弹窗 废弃
  const handlerHover = useCallback(
    (item) => {
      setShow(true);
      const point = ele.contentWindow.mapPoint2ScreenPoint(
        item.geometry.coordinates
      );
      for (let key in item.properties) {
        item.properties[key] =
          item.properties[key] === "null" || item.properties[key] === ""
            ? "无"
            : item.properties[key];
      }
      setpropData(item);

      // setTimeout(() => {
      //   setLeftTop(point[0], point[1]);
      // }, 10);
      // setShow(true);
    },
    [ele]
  );

  useEffect(() => {
    const ele = document.getElementById("iframeId");
    setele(ele);
    if (mapDone && mapData.features && mapData.features.length > 0) {
      ele.contentWindow.setSource(mapData);
      window.handleNavigation = handleNavigation;
      window.goDetail = goDetail
    }
  }, [mapDone, mapData]);
  // 弹窗位置 废弃
  const setLeftTop = (left, top) => {
    const [width, height] = [
      popover.current.clientWidth,
      popover.current.clientHeight,
    ];
    let offLeft = left - width / 2;
    let offTop = top < 415 ? 430 - height - 80 : top - height - 80;
    popover.current.style.left = offLeft + "px";
    popover.current.style.top = offTop + "px";
  };

  const handleTabClcik = (index) => {
    setShow(false);
    setTabIndex(tabTitleList[index].index);
    getMapMsg(tabTitleList[index].index);
    ele.contentWindow.onBtnClick(tabTitleList[index].name);
  };

  const handleNavigation = (e, { coordinates }) => {
    e.stopPropagation();
    reLaunch({
      pathname: "/agriculture",
      query: {
        type: "map",
        latitude: coordinates[1],
        longitude: coordinates[0],
      },
    });
  };

  const getMapMsg = async (index) => {
    showLoading({ duration: 999 });
    const { state, results } = await getMapList({
      type: index,
      organizationId: config.organizationId,
      pageSize: 9999,
      current: 1,
      isApp: 1
    });
    if (state === 200) {
      hideLoading();
      if (index === 0) {
        console.log(111);
        setMapData(results);
      }
      // setMapData(results);
      setTabContent(results || []);
    }
  };

  useEffect(() => {
    getMapMsg(0);
  }, []);

  const goDetail = (id) => {
    wxPushUrl({
      pathname: "/agriculture/detail",
      query: { id: id },
    });
  };

  const showMapInfo = (item) => {
    ele.contentWindow.destroy()
    ele.contentWindow.located(item.id);
  };

  return (
    <div className={styles.dfatContainer}>
      <iframe
        id="iframeId"
        src="./map/index.html"
        className={styles.map}
        title="navigation"
        frameBorder="no"
        border="0"
        marginWidth="0"
        marginHeight="0"
        scrolling="no"
        allowtransparency="yes"
      />
      <div
        className={styles.tabsContainer}
        style={{ height: arrow && "294px" }}
      >
        <div className={styles.tabTitle}>
          <Tabs
            tabs={tabs}
            tabBarUnderlineStyle={{ display: "none" }}
            initialPage={0}
            onTabClick={(tab, index) => handleTabClcik(index)}
          ></Tabs>
          <div className={styles.arrow}>
            <img
              alt=""
              src={arrow ? arrowTop : arrowBottom}
              onClick={() => setArrow(!arrow)}
            />
          </div>
        </div>
        {arrow && (
          <div className={styles.tabContent}>
            {tabContent.features && tabContent.features.length > 0 ? (
              tabContent.features.map((item, index) => {
                const imgs =
                  item.properties.image && item.properties.image.split("\n");
                return (
                  <div className={styles.tabContentItem} key={index} onClick={() => showMapInfo(item)}>
                    <img
                      alt=""
                      src={imageSrc(imgs[0])}
                      className={styles.image}
                    />
                    <div className={styles.center}>
                      <div className={styles.name}>{item.properties.name}</div>
                      <div className={styles.address}>
                        {item.properties.address}
                      </div>
                    </div>
                    <div
                      className={styles.navigation}
                      onClick={(e) => handleNavigation(e, item.geometry)}
                    >
                      <img alt="" src={navigation} />
                      <div>导航</div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className={styles.noData}>
                <img alt="" src={noData} />
                <div>暂时没有{tabTitle[tabIndex - 1]}信息~</div>
              </div>
            )}
          </div>
        )}
      </div>
      {show && (
        <div ref={popover}>
          <div className={styles.popover}>
            <div className={styles.content}>
              <img
                src={imageSrc(propData.properties.image.split("\n")[0])}
                alt=""
              />
              <p>{propData.properties.name}</p>
            </div>
            <div className={styles.btns}>
              <div onClick={() => handleNavigation(propData.geometry)}>
                去这里
              </div>
              <div
                onClick={() => {
                  wxPushUrl({
                    pathname: "/agriculture/detail",
                    query: { id: propData.id },
                  });
                }}
              >
                详情
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});
