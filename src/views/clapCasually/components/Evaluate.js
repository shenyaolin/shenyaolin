import React, { memo, useCallback, useState } from 'react'
import styles from '../index.less'
import { evaluate } from "services/list";
import check from '../../../assets/images/newImg/check.png'
import circle from '../../../assets/images/newImg/circle.png'
import Button from "framework/components/Button";
import { getRouterInfo } from "framework/utils/url";
import { wxPushUrl } from "framework/utils/url";

const radioGroup = [
    { label: "非常满意" },
    { label: "满意" },
    { label: "一般" },
    { label: "差" },
    { label: "非常差" },
]

document.title = "评价"
export default memo(() => {
    const { query } = getRouterInfo()
    const [evaluateType, setEvaluateType] = useState(0)
    const handleClick = useCallback((index) => {
        setEvaluateType(index)
    })
    const { snapshotId } = query

    const handleSubmit = useCallback(async () => {
        const { state } = await evaluate({
            evaluateType, snapshotId
        })
        if (state === 200) {
            wxPushUrl({
                pathname: "/clapCasually/details",
                query: { snapshotId }
            })
        }
    }, [evaluateType, query])

    return (
        <div className={styles.evaluateContainer}>
            <div className={styles.promptLanguage}>请对办理的事件进行满意度评价</div>
            {
                radioGroup.map((item, index) => {
                    return (
                        <div className={styles.radio} key={index} onClick={() => handleClick(index)}>
                            <img src={evaluateType === index ? check : circle} />
                            <div className={styles.label}>{item.label}</div>
                        </div>
                    )
                })
            }
            <Button onClick={handleSubmit}>确定</Button>
        </div>
    )
}) 