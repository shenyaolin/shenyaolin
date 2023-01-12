/*
 * @Descripttion:
 * @version:
 * @Author: yinzi
 * @Date: 2022-03-21 20:30:11
 * @LastEditors: yinzi
 * @LastEditTime: 2022-03-22 18:00:34
 */
import React, { memo, useEffect, useCallback, useRef, useState } from "react";
import Swiper from "components/Swiper";
import storage from "framework/utils/storage";
import styles from "./index.less";
import config from "config";
import { getRouterInfo } from "framework/utils/url";
import { getInformation } from "services/common";
const { fileDomain } = config;
export default memo(() => {
  const [imgList, setimgList] = useState([]);
  const [form, setForm] = useState({});
  useEffect(() => {
    const { query } = getRouterInfo();
    const info = storage.get("information");
    document.title = info.name;
    (async function () {
      const { success, res } = await getInformation(query.id);
      if (success && res.results) {
        setForm(res.results);
        if (res.results.picList && res.results.picList.length > 0) {
          setimgList(res.results.picList);
        }
      }
    })();
  }, []);

  const renderSwiper = useCallback(
    (SwiperSlide) => {
      return imgList.map((item, index) => {
        return (
          <SwiperSlide key={index}>
            <img
              className={styles.bannerImg}
              src={`${fileDomain}/${item}`}
              alt=""
            />
          </SwiperSlide>
        );
      });
    },
    [imgList]
  );
  return (
    <div className={styles.detail}>
      <div className={styles.title}>
        <img src={require("../../assets/images/informationIcon.png")} alt="" />
        {form.title}
      </div>
      <div className={styles.bannerContainer}>
        {/* <Swiper
          slidesPerView={1}
          autoplay={true}
          loop={true}
          spaceBetween={0}
          direction="horizontal"
          uniqueNavElements={false}
          // pagination
          renderChildren={renderSwiper}
        ></Swiper> */}
        <img src={`${fileDomain}/${imgList[0]}`} alt="" />
      </div>
      <div className={styles.infoList}>
        {form.subjectName && (
          <div className={styles.lineItem}>
            <span className={styles.name}><img src={require("../../assets/images/img/infoIcon1.png")}/>主体名称：</span>
            <span className={styles.value}>{form.subjectName}</span>
          </div>
        )}
        {form.contactMan && (
          <div className={styles.lineItem}>
            <span className={styles.name}><img src={require("../../assets/images/img/infoIcon3.png")}/>联系人：</span>
            <span className={styles.value}>{form.contactMan}</span>
          </div>
        )}
        {form.mobile && (
          <div className={styles.lineItem}>
            <span className={styles.name}><img src={require("../../assets/images/img/infoIcon1.png")}/>联系电话：</span>
            <span className={styles.value}>{form.mobile}</span>
          </div>
        )}
        {form.address && (
          <div className={styles.lineItem}>
            <span className={styles.name}><img src={require("../../assets/images/img/infoIcon3.png")}/>地址：</span>
            <span className={styles.value}>{form.address}</span>
          </div>
        )}
        {form.detail && (
          <div className={styles.lineItem}>
            <div className={styles.name}><img src={require("../../assets/images/img/infoIcon1.png")}/>详细信息：</div>
            <div className={styles.detailvalue}>{form.detail}</div>
          </div>
        )}
      </div>
      <a href={`tel:${form.mobile}`} className={styles.tel}>
        <img src={require('../../assets/images/img/callMe.png')} alt="" />
      </a>
    </div>
  );
});
