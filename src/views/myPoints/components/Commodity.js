import React, { memo, useEffect, useState, useCallback } from 'react';
import styles from '../index.less';
import Button from "framework/components/Button";
import { wxPushUrl } from "framework/utils/url";
import { getProductDetails, addExchange } from 'services/myPoints';
import { getRouterInfo } from "framework/utils/url";
import { showLoading, hideLoading } from "framework/utils/loading";
import message from 'framework/utils/message';
import { Carousel } from 'antd-mobile';
import imageSrc from 'framework/utils/imageSrc';

const commoditySupplier = [
    { label: '商家名称', field: 'merchantName' },
    { label: '联系方式', field: 'phone' },
    { label: '商家地址', field: 'merchantAddress' },
]

document.title = "商品详情"
export default memo(() => {
    const [results, setResults] = useState({})
    const [show, setShow] = useState(false)
    useEffect(() => {
        showLoading({ duration: 999 });
        const { query } = getRouterInfo()
        query && query.merchandiseId && getProductDetail(query.merchandiseId)
    }, [])

    const getProductDetail = async (merchandiseId) => {
        const { state, results } = await getProductDetails({ merchandiseId })
        if (state === 200) {
            setResults(results)
            setShow(true)
            hideLoading()
        }
    }

    const handleExchange = async () => {
        const { state, results: result } = await addExchange({ merchandiseId: results.merchandiseId, merchandiseName: results.merchandiseName })
        if (state === 200) {
            message.toast('兑换成功')
            wxPushUrl({ pathname: "/myPoints/exchange", query: { orderNo: result } })
        }
    }

    const handleCalendar = useCallback(() => {
        const img = results.image.split(',')
        if (img.length === 1) {
            return <img className={styles.commodityImg} alt='' src={imageSrc(img[0])} />
        } else {
            return <div className={styles.commodityImg}>
                <Carousel
                    autoplay
                    infinite
                    dots={false}
                >
                    {
                        img.map((item, index) => {
                            return (
                                <img src={imageSrc(item)} key={index} alt="" />
                            )
                        })
                    }
                </Carousel>
            </div>
        }
    }, [results.image])

    return (
        show && <div className={styles.commodityContainer}>
            {handleCalendar()}
            <header>
                <div className={styles.price}>{results.integralNumber}积分</div>
                <div className={styles.commodityName}>{results.merchandiseName}</div>
            </header>
            <div className={styles.usageMethod}>
                <div className={styles.title}>使用方法</div>
                <div className={styles.flowChart}>
                    <div className={styles.flowChartImg}>
                        <div className={styles.imgOne}></div>
                        <div className={styles.imgTwo}></div>
                        <div className={styles.imgThree}></div>
                    </div>
                    <div className={styles.flowChartFont}>
                        <div>兑换商品</div>
                        <div>前往指定商家核销</div>
                        <div>核销商品</div>
                    </div>
                </div>
            </div>
            <div className={styles.commoditySupplier}>
                <div className={styles.title}>商品提供方</div>
                {
                    commoditySupplier.map((item, index) => {
                        return (
                            <div key={index} className={styles.commoditySupplierItem}>
                                <div>{item.label}</div>
                                <div>{results[item.field]}</div>
                            </div>
                        )
                    })
                }
            </div>
            <div className={styles.commodityMsg}>
                <div className={styles.title}>商品信息</div>
                <div className={styles.commodityContent} dangerouslySetInnerHTML={{ __html: results.merchandiseIntroduction }}></div>
            </div>
            <div className={styles.usageRules}>
                <div className={styles.title}>使用规则</div>
                <p>1、本商品每位用户可兑换多次。</p>
                <p>2、商品一旦兑换成功,扣除积分不支持退还,兑换
                    后请尽快到指定商家进行核销兑换。</p>
                <p>3、商品兑换成功后,生成兑换凭证，可凭借兑换凭证
                    前往指定商家进行兑换。</p>
                <p>4、兑换后需在有效期内进行使用,超过有效期则失效
                    不允许使用,有效期为7天。</p>
                <p>5、兑换凭证可在积分兑换记录中查看并出示。</p>
                <p>6、使用条件,只能前往指定商家进行核销兑换。</p>
                <p>7、凡以不正当手段(包括但不限于作弊、扰乱系统)
                    进行兑换，平台有权终止兑换。</p>
                <p>8、如果对商品有疑问,可致电商家进行咨询了解。</p>
            </div>
            <div className={styles.bottomBtns}>
                <Button onClick={handleExchange}>立即兑换</Button>
            </div>
        </div >
    )
})