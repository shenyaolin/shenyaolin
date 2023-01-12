import React, { memo, useState, useCallback, useEffect } from "react";
import styles from "../index.less";
import { getRouterInfo } from "framework/utils/url";
import { goSignIn } from 'services/myPatrol';
import { date3String } from 'framework/utils/date';
import address2 from 'assets/images/newImg/address2.png';
import Input from "framework/components/Form/entry/Input";
import TextArea from "framework/components/Form/entry/TextArea";
import Button from "framework/components/Button";
import { pushUrl } from "framework/utils/url";
import message from "framework/utils/message";

document.title = "签到"
export default memo(() => {
    const [form, setForm] = useState({
        signInDate: date3String(new Date()),
        signinNote: ''
    })
    const [address, setAddress] = useState()
    const [signInType, setSignInType] = useState()
    const [disabled, setdisabled] = useState(false)

    useEffect(() => {
        const { query } = getRouterInfo()
        query && setAddress(query.townshipName + query.villageName + query.naturalVillageName + query.houseNumber)
        setForm((prev) => ({
            ...prev,
            inspectionObjectAddress: (query.townshipName + query.villageName + query.naturalVillageName + query.houseNumber),
            signInAddress: query.signInAddress,
            signInDate: query.signInDate && query.signInDate.slice(0, 10),
            signinNote: query.signinNote,
            recordId: query.recordId
        }));
        setSignInType(query.signInType)
    }, [])

    const handleChange = useCallback(
        (fieldName) => (e) => {
            setForm((prev) => ({
                ...prev,
                [fieldName]: e,
            }));
        },
        []
    );

    const handleSubmit = useCallback(async () => {
        setdisabled(true)
        if (!form.signInAddress) {
            message.toast("请输入签到地址")
        } else {
            setdisabled(true)
            const { state } = await goSignIn(form)
            if (state === 200) {
                pushUrl({ pathname: "/myPatrol" })
            }
        }
        setdisabled(false)
    }, [form])

    return (
        <div className={styles.signInConfainer}>
            <div className={styles.date}>{form.signInDate}</div>
            <div className={styles.objectAddress}>
                <div className={styles.name}>
                    <img alt="" src={address2} />
                    <div>巡检对象位置</div>
                </div>
                <div className={styles.content}>
                    {address}
                </div>
            </div>
            <div className={styles.myAddress}>
                <div className={styles.name1}>
                    <img alt="" src={address2} />
                    <div>我的位置</div>
                </div>
                {
                    signInType === '已签到' ?
                        <div className={styles.conetnt}>
                            {form.signInAddress}
                        </div>
                        :
                        <Input
                            placeholder="请输入"
                            onChange={handleChange("signInAddress")}
                            value={form.signInAddress}
                        />
                }
            </div>
            <div className={styles.remarks}>
                <div className={styles.title} >备注说明</div>
                {
                    signInType === "已签到" ?
                        <div className={styles.conetnt}>
                            {form.signinNote || '无'}
                        </div>
                        :
                        <TextArea
                            placeholder={"请输入备注"}
                            maxLength={600}
                            value={form && form.signinNote}
                            onChange={handleChange("signinNote")}
                        />
                }
            </div>
            {
                signInType === '已签到' ?
                    <div className={styles.placeholder}>您已签到 无需重复签到~</div>
                    :
                    <Button onClick={handleSubmit} disabled={disabled}>
                        签到
                    </Button>
            }

        </div>
    )
})