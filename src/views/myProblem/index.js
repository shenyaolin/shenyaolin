import React, { memo, useState, useCallback, useRef, useEffect } from "react";
import Tab from '../../components/Tab';
import TakePic from "./components/takePic"
import Report from "./components/report"
import Mail from "./components/mail"

const myProblem = [
    {
        key: 'takePic',
        index: '0',
        label: '随手拍',
        component: TakePic,
    },
    {
        key: 'report',
        index: '1',
        label: '信息上报',
        component: Report
    },
    {
        key: 'mail',
        index: '2',
        label: '书记信箱',
        component: Mail
    },
]
document.title = "我的问题"
export default memo(() => {
    const [curIndex, setCurIndex] = useState(0)
    const handleTabIndex = useCallback((index) => {
        setCurIndex(index)
    })
    return (
        <>
            <Tab tabs={myProblem} handleTabIndex={handleTabIndex}></Tab>
            {myProblem.map((item, index) => {
                if (curIndex === Number(item.index)) {
                    return <item.component />
                }
            })}

        </>
    );
});
