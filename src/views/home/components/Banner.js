import React, { memo, useEffect, useState, useCallback } from "react";
import Swiper from "components/Swiper";
import VideoUpload from "framework/components/VideoUpload";

import styles from "./index.less";

export default memo((props) => {
  const { imgList, pagination } = props;

  const renderSwiper = useCallback((SwiperSlide) => {
    return imgList.map((item, index) => {
      return (
        <SwiperSlide key={index}>
          <img src={item} alt={index} srcset="" className={styles.bannerImg} />
        </SwiperSlide>
      );
    });
  }, [imgList]);
  return (
    <div className={styles.bannerContainer}>
      {/* <Swiper
        slidesPerView={1}
        autoplay={true}
        // loop={true}
        spaceBetween={0}
        direction="horizontal"
        uniqueNavElements={false}
        pagination={pagination}
        renderChildren={renderSwiper}
      ></Swiper> */}
      <video controls x5-playsinline="" autoPlay muted x-webkit-airplay="allow" webkit-playsinline="true" playsinline="true" poster={`http://filetest.jgwcjm.com/202206241705439831540259868631908354?vframe/jpg/offset/1`} >
        <source src={'http://filetest.jgwcjm.com/202206241705439831540259868631908354'} type="video/mp4"></source>
      </video>
      {/* <VideoUpload
        className={styles.videoUpload}
        maxLength={1}
        value={"202206241514298791540231875406610433"}
      /> */}
    </div >
  );
});
