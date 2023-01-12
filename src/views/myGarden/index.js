import React, { memo, useState, useEffect } from "react";
import { getMyGarden, getAddress } from "services/news";
import styles from "./index.less";
import storage from 'framework/utils/storage';
import imageSrc from "framework/utils/imageSrc";
import NoData from '../../components/NoData';
import { showLoading, hideLoading } from "framework/utils/loading";
import { Carousel } from 'antd-mobile';

document.title = "我的庭院"
function Detail() {
    const [detailData, setDetailData] = useState("");

    useEffect(() => {
        showLoading({ duration: 999 });
        getList()
    }, []);

    const getList = async () => {
        const { state, results } = await getMyGarden({
            userId: storage.get("userInfo").userId,
        });
        if (state === 200 && results) {
            const { state: state1, results: results1 } = await getAddress({ areaCode: results.villageId });
            if (state1 === 200) {
                results.villageName = `${results1.provinceName}${results1.cityName}${results1.countyName}${results1.streetName}${results.villageName}`;
                setDetailData(results);
            }
        }
        hideLoading();
    }

    return (
        <div className={styles.myGardenContainer} >
            {
                detailData ? (
                    <>
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
                    </>
                ) : <NoData text="暂时没有您的美丽庭院信息~"></NoData>
            }
        </div>
    );
}

export default memo(Detail);

