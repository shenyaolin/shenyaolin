import React, { memo, useCallback, useEffect, useState } from "react";
import styles from "./index.less";
import config from 'config/index';
import imageSrc from 'framework/utils/imageSrc';
import { getAttractions, getTreasure, getHotel } from '../../../services/villagersMart.js';
import arrowRight from 'assets/images/newImg/arrow-right-gray.png';

const data = { current: 1, pageSize: 4, organizationId: config.organizationId, sysId: config.sysId }
const peripheryList = [
  { name: "周边民宿", path: "digitalVillageH5/villagersMart/homestay", englishName: "home" },
  { name: "周边美食", path: "digitalVillageH5/villagersMart/treasure", englishName: "food" },
  { name: "周边景点", path: "digitalVillageH5/siteManagement", englishName: "scenic" },
];
export default memo(() => {
  //景点
  const [scenic, setscenic] = useState([])
  const getAttractionsList = useCallback(
    async () => {
      const { state, results } = await getAttractions(data);
      if (state === 200 && results)
        setscenic(results.list || [])
    },
    [],
  )
  // 酒店
  const [homeList, sethomeList] = useState([])
  const gethomeList = useCallback(
    async () => {
      const { state, results } = await getHotel({ ...data, type: 1 });
      if (state === 200 && results)
        sethomeList(results.list || [])
    },
    [],
  )
  // 美食
  const [foodList, setfoodList] = useState([])
  const getfoodList = useCallback(
    async () => {
      const { state, results } = await getTreasure(data);
      if (state === 200 && results)
        setfoodList(results.list || [])
    },
    [],
  )

  const handleClick = useCallback((path) => {
    window.location.href = `${config.digitalVillageHref}/#/${path}?organizationId=${config.organizationId}&sysId=${config.sysId}`
  }, []);

  const homeClick = useCallback((hotelId)=>{
    window.location.href = `${config.digitalVillageHref}/#/digitalVillageH5/hotelManagement?attractionId=${hotelId}`
  },[])

  const foodClick = useCallback((hotelId)=>{
    window.location.href = `${config.digitalVillageHref}/#/digitalVillageH5/hotelManagement?attractionId=${hotelId}`
  },[])

  const scenicClick = useCallback((attractionId)=>{
    window.location.href = `${config.digitalVillageHref}/#/digitalVillageH5/siteManagementDetails?attractionId=${attractionId}`
  },[])
  
  useEffect(() => {
    getAttractionsList()
    gethomeList();
    getfoodList()
  }, [getAttractionsList, gethomeList, getfoodList])
  const renderHome = useCallback(() => {
    return homeList.map((item, index) => {
      return (
        <div className={styles.homeBox} key={index} onClick={()=>{homeClick(item.hotelId)}}>
          <div className={styles.homeImg}>
            <img src={item.bannerImg ? imageSrc(item.bannerImg.split(',')[0]) : null} alt="" />
          </div>
          <div className={styles.homeInformation}>
            <div className={styles.homeName}>{item.hotelName}</div>
            {/* <div className={styles.homeType}>
              <span>{item.type}</span>
              <span>{item.romm}</span>
              <span>{item.peopleNum}人</span>
            </div> */}
            <div className={styles.homePrice}>
              <span>￥</span>
              <span>{item.price || 0}</span>
              /晚
            </div>
          </div>
        </div>
      );
    });
  }, [homeClick, homeList]);

  const renderFood = useCallback(() => {
    return (
      <div className={styles.foodBox}>
        {foodList.map((item, index) => {
          return (
            <div className={styles.foodItem} key={index}>
              <div className={styles.foodImg}>
                <img src={item.image ? imageSrc(item.image.split(',')[0]) : null} alt="" />
              </div>
              <div className={styles.foodMealName}>{item.babyName}</div>
              <div className={styles.foodPrice}>
                <span>￥</span>
                <span>{item.price}</span>
              </div>
            </div>
          );
        })}
      </div>
    );
  }, [foodList]);

  const renderScenic = useCallback(() => {
    return (
      <div className={styles.scenicBox}>
        {scenic.map((item, index) => {
          return (
            <div className={styles.scenicItem} key={index} onClick={()=>{scenicClick(item.attractionId)}}>
              <div className={styles.scenicImg}>
                <img src={item.images ? imageSrc(item.images.split(',')[0]) : null} alt="" />
                <div className={styles.scenicName}>{item.attractionName}</div>
              </div>
              <div className={styles.scenicIntroduce}>{item.attractionName}</div>
            </div>
          );
        })}
      </div>
    );
  }, [scenic, scenicClick]);
  return (
    <>
      {peripheryList.map((item, index) => {
        return (
          <div key={index} className={styles.peripheryContainer}>
            <div className={styles.peripheryBox}>
              <div className={styles.name}>
                {item.name}
                <img
                  src={require("../../../assets/images/newImg/Underline.png")}
                  alt=""
                />
              </div>
              <div
                className={styles.more}
                onClick={() => {
                  handleClick(item.path);
                }}
              >
                看更多<img alt="" src={arrowRight} />
              </div>
            </div>
            <div>
              {index === 0 && renderHome()}
              {index === 1 && renderFood()}
              {index === 2 && renderScenic()}
            </div>
          </div>
        );
      })}
    </>
  );
});
