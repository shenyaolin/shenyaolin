import React, { memo, useCallback, useEffect, useState } from "react";
import styles from "./index.less";
import navigation from 'assets/images/dfat/navigation.png';
import { getRouterInfo } from "framework/utils/url";
import { showLoading, hideLoading } from "framework/utils/loading";
import { getMapDetail } from "services/common";
import config from 'config';
import { reLaunch } from "framework/utils/url";
import imageSrc from 'framework/utils/imageSrc';
import { Carousel } from 'antd-mobile';

export default memo(() => {
    const [results, setResults] = useState([]);
    const [show, setShow] = useState(false);
    const [id, setId] = useState("");
    useEffect(() => {
        showLoading({ duration: 999 });
        const { query } = getRouterInfo()
        setId(query.id)
        query && query.id && getDetail(query.id)
    }, []);

    const getDetail = async (id) => {
        const { state, results } = await getMapDetail({ organizationId: config.organizationId, id })
        if (state === 200) {
            setResults(results)
            setShow(true)
            hideLoading()
        }
    }

    const handleNavigation = () => {
        const { coordinates } = results.geometry
        reLaunch({ pathname: "/agriculture/detail", query: { id: id, type: "map", latitude: coordinates[1], longitude: coordinates[0] } })
    }

    return (
        show && <div className={styles.dfatDetailContainer}>
            <div className={styles.header}>
                <Carousel
                    autoplay
                    infinite
                    dots={false}
                    className={styles.image}
                >
                    {
                        results.properties.image && results.properties.image.split("\n").map((item, index) => {
                            return <img alt="" src={imageSrc(item)} key={index} />
                        })
                    }
                </Carousel>
                <div className={styles.name}>{results.properties.name}</div>
                <div className={styles.address}>
                    <div>{results.properties.address}</div>
                    <div className={styles.navigation} onClick={() => handleNavigation()} >
                        <img alt="" src={navigation} />
                        <div>导航</div>
                    </div>
                </div>
            </div>
            <div className={styles.conetnt}>
                <div className={styles.title}>景点介绍</div>
                <div dangerouslySetInnerHTML={{ __html: results.properties.introduce }} className={styles.innerHtml}></div>
            </div>
        </div>
    );
});
