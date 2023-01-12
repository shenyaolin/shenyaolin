/*
 * @Descripttion:
 * @version:
 * @Author: yinzi
 * @Date: 2022-04-14 15:11:54
 * @LastEditors: yinzi
 * @LastEditTime: 2022-06-01 15:39:59
 */
import React, { memo, useState, useEffect } from "react";
import { beautifulYardDetail, getAddress } from "services/news";
import styles from "../index.less";
import { getRouterInfo } from "framework/utils/url";
import imageSrc from "framework/utils/imageSrc";
import { showLoading, hideLoading } from "framework/utils/loading";
import { Carousel } from 'antd-mobile';

document.title = "美丽庭院";

function Detail() {
  const [detailData, setDetailData] = useState("");

  useEffect(() => {
    showLoading({ duration: 999 });
    const { query } = getRouterInfo();
    const getData = async () => {
      const { state, results } = await beautifulYardDetail({
        gardenId: query.gardenId,
      });
      if (state === 200 && results) {
        const { state: state1, results: results1 } = await getAddress({ areaCode: results.villageId });
        if (state1 === 200) {
          results.villageName = `${results1.provinceName}${results1.cityName}${results1.countyName}${results1.streetName}${results.villageName}`;
          setDetailData(results);
          hideLoading();
        }
      }
      // setDetailData(results)
    };
    getData();
  }, []);

  return (
    detailData && (
      <div className={styles.beautifulYardDetail}>
        <div className={styles.top}>
          <Carousel autoplay infinite dots={false}>
            {
              detailData.image.split(",").map((item, index) => {
                return (
                  <img src={imageSrc(item)} key={index} alt="" />
                )
              })
            }
          </Carousel>
          <div className={styles.title}>
            <div>{detailData.householder}家庭院</div>
            <div>评分{detailData.fraction}</div>
          </div>
          <div className={styles.yardInfo}>
            <div className={styles.item}><div>户主</div><div>{detailData.householder}</div></div>
            <div className={styles.item}><div>门牌号</div><div>{detailData.houseNumber}</div></div>
            <div className={styles.item}><div>位置</div><div>{detailData.villageName}</div></div>
          </div>
        </div>
        <div className={styles.top}>
          <div className={styles.title}>庭院介绍</div>
          <div
            className={styles.content}
            dangerouslySetInnerHTML={{ __html: detailData.content }}
          ></div>
          <div className={styles.count}>
            <div className={styles.secondTit}>
              <div className={styles.time}>阅读量：{detailData.readNumber}</div>
              <div className={styles.time}>
                创建时间：{detailData.createTime}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default memo(Detail);
