import React, {
    memo,
    useRef,
    useState,
    useCallback,
    useEffect
} from "react";
import styles from "./index.less"
import { userUpdate } from "src/services/myMessUpdate"
import storage from "framework/utils/storage";
// document.title = '系统消息'
export default memo(() => {
    const messType = storage.get("userType")//用户类别 村委1 村民2
    const setUpdate = useCallback(async () => {
        if (messType === 2) {
            const utilUpdate = await userUpdate({ userType: 2 })
        }
        if (messType === 1) {
            const utilUpdate = await userUpdate({ userType: 1 })
        }
    }, []);
    useEffect(() => {
        document.title = '系统消息'
        setUpdate();
    }, [setUpdate]);
    return (
        <>
            <div className={styles.outbox}>
                <div className={styles.conBox}>
                    <div className={styles.theadTit}>
                        系统消息
                    </div>
                    <div className={styles.tbodyTit}>
                        {(messType === 1 || messType === 2) ? '您的身份认证已通过，请确认' : '您的身份认证未通过，请确认'}
                    </div>
                </div>
            </div>

        </>
    )
})