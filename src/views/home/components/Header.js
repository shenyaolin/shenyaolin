import React, { memo, useEffect, useState, useCallback } from "react";
import Banner from "./Banner";
import bannerImg from "../../../assets/images/newImg/banner.png";
import styles from "./index.less";
import { wxPushUrl, pushUrl } from "framework/utils/url";
import scanQrcode from "framework/common/scanQrcode";
const userIdentity = {
  1: "村委",
  2: "村民",
  3: "游客",
};

export default memo((props) => {
  const [imgList, setImgList] = useState([bannerImg]);
  const getList = useCallback(() => {
    // const list =
    // setImgList(list)
  }, []);
  const handleClick = () => async () => {
    let res = await scanQrcode();
    if (res) {
      window.location.href = res;
    }
  };
  useEffect(() => {
    getList();
  }, [getList]);

  const { userType } = props;
  return (
    <div className={styles.headerInfo}>
      <div className={styles.headPosition}>
        <div className={styles.leftPosition}>
          信阳浉河区浉河港镇郝家冲村
          <div className={styles.identity}>{userIdentity[userType]}</div>
        </div>
        {/* <div className={styles.scan} onClick={handleClick}></div> */}
      </div>
      <Banner imgList={imgList} pagination={false} />
    </div>
  );
});
