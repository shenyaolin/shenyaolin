import React, { memo, useEffect, useState, useCallback } from 'react';
import styles from '../index.less';
import Button from "framework/components/Button";
import { wxPushUrl } from "framework/utils/url";
import { getExchange, redeemExchange } from 'services/myPoints';
import { getRouterInfo } from "framework/utils/url";
import { showLoading, hideLoading } from "framework/utils/loading";
import message from 'framework/utils/message';
import toBeWrittenOff from 'assets/images/newImg/to-be-written-off.png';
import Invalid from 'assets/images/newImg/Invalid.png';
import writtenOff from 'assets/images/newImg/Written-off.png';
import classnames from 'classnames';
import imageSrc from 'framework/utils/imageSrc';

const commoditySupplier = [
    { label: '商家名称', field: 'merchantName' },
    { label: '联系方式', field: 'phone' },
    { label: '商家地址', field: 'merchantAddress' },
]

const exchangeDetails = [
    { label: "兑换时间", field: "createTime" },
    { label: "兑换流水号", field: "orderNo" },
    { label: "有效期", field: "effectiveTime" },
]

document.title = "兑换详情"
export default memo(() => {
    const [result, setResult] = useState({})
    const [orderNo, setOrderNo] = useState()
    const [show, setShow] = useState(false)
    useEffect(() => {
        showLoading({ duration: 999 });
        const { query } = getRouterInfo()
        query && query.orderNo && getProductDetail(query.orderNo) && setOrderNo(query.orderNo)
    }, [])

    const getProductDetail = async (orderNo) => {
        const { state, results } = await getExchange({ orderNo })
        if (state === 200) {
            setResult(results)
            setShow(true)
            hideLoading()
        }
    }

    const handleField = useCallback((item) => {
        if (item.field === "effectiveTime") return `${result[item.field].substring(0, 10)}失效`
        else return result[item.field]
    }, [result])

    const handleVerificationCertificate = useCallback(() => {
        const time = new Date(result.effectiveTime).getTime() - new Date().getTime()
        if (time < 0 && result.state === 0) {
            return Invalid
        } else if (result.state === 0) {
            return toBeWrittenOff
        }
        else if (result.state === 1) {
            return writtenOff
        }
    }, [result])

    const handleRedeemExchange = async () => {
        showLoading({ content: "提交中", duration: 999 });
        const { state } = await redeemExchange({ orderNo })
        if (state === 200) {
            hideLoading()
            message.toast("提交成功")
            getProductDetail(orderNo)
        }
    }

    return (
        show && <div className={styles.exchangeContainer}>
            <div className={styles.positionBox}>
                兑换成功
            </div>
            <div className={styles.exchangeVoucher}>
                <div className={styles.headerTitle}>兑换凭证</div>
                <div className={styles.orderInformation}>
                    <img alt='' src={result.image && imageSrc(result.image.split(",")[0])} />
                    <div className={styles.orderRight}>
                        <div className={styles.tradeName}>{result.merchandiseName}</div>
                        <div className={styles.price}>{result.integralNumber}积分</div>
                    </div>
                    <img alt='' className={styles.verificationCertificate} src={handleVerificationCertificate()} />
                </div>
                <div className={styles.exchangeDetails}>
                    {
                        exchangeDetails.map((item, index) => {
                            return (
                                <div key={index} className={styles.exchangeDetailsItem}>
                                    <div>{item.label}</div>
                                    <div>{handleField(item)}</div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
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
                                <div>{result[item.field]}</div>
                            </div>
                        )
                    })
                }
            </div>
            <div className={styles.commodityMsg}>
                <div className={styles.title}>商品信息</div>
                <div className={styles.commodityContent} dangerouslySetInnerHTML={{ __html: result.merchandiseIntroduction }}></div>
            </div>
            <div className={classnames(styles.usageRules, handleVerificationCertificate() !== toBeWrittenOff && styles.usageRules1)}>
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
            {
                handleVerificationCertificate() === toBeWrittenOff && <div className={styles.bottomBtns}>
                    <Button onClick={handleRedeemExchange}>确认核销</Button>
                </div>}
        </div >
    )
})