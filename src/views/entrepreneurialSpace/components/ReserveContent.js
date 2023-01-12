import React, { memo, useState, useCallback, useEffect, useRef } from "react";
import styles from '../index.less'
import { redirectTo } from "framework/utils/url";
import { getRouterInfo } from "framework/utils/url";
import { addRecord } from '../../../services/entrepreneurialSpace'
import Button from "framework/components/Button";
import message from 'framework/utils/message';
import Form from "framework/components/Form";
import TextArea from 'framework/components/Form/entry/TextArea'
import storage from 'framework/utils/storage';
import Input from "framework/components/Form/entry/Input";
import { date3String } from "framework/utils/date.js";

const { FormItem } = Form;

const rules = Form.rules;

const { required, maxLength } = rules;

document.title = "创业空间"
export default memo(() => {
    const [form, setform] = useState({
        reservationPerson: storage.get("userInfo").name || "",
        phone: storage.get("userInfo").phone || "",
        userId: storage.get('userInfo').userId
    })
    const [textNum, setTextNum] = useState(0)
    const [disabled, setDisabled] = useState(false)

    useEffect(() => {
        const { query } = getRouterInfo()
        setform((prev) => ({
            ...prev,
            ...query,
            appointmentDate: query.time
        }))
    }, [])

    const formRef = useRef()

    const rules = useCallback(() => {
        const rule = {
            name: [required],
            activityName: [required],
            content: [required, maxLength(600)],
            reservationPerson: [required],
            phone: [required],
        };
        return rule;
    }, []);

    const handleChange = useCallback((fieldName) => (e) => {
        if (fieldName === "content") setTextNum(e.length)
        const value = e && e.target ? e.target.value : e;
        setform((prev) => ({
            ...prev,
            [fieldName]: value,
        }));
    }, [])

    const handleSubmit = useCallback(async () => {
        setDisabled(true)
        const err = await formRef.current.validate();
        if (err) {
            message.toast(err);
        } else {
            setDisabled(true)
            const { state } = await addRecord(form)
            if (state === 200) {
                message.toast("预约成功")
                redirectTo({ pathname: "/entrepreneurialSpace/mySubscribe" });
            }
        }
        setDisabled(false)
    }, [form])
    return (
        <div className={styles.reserveContentContainer}>
            <Form ref={formRef} model={form} rules={rules()} >
                <FormItem prop="name" label="空间名称" required>
                    <Input
                        placeholder=""
                        onChange={handleChange("name")}
                        value={form.name}
                    />
                </FormItem>
                <FormItem prop="activityName" label="活动名称" required >
                    <Input
                        placeholder="请输入"
                        onChange={handleChange("activityName")}
                        value={form.activityName}
                    />
                </FormItem>
                <FormItem prop="content" label="活动内容" required className={styles.formItem}>
                    <TextArea placeholder={"请输入建议"} maxLength={600} value={(form && form.content) || ""} onChange={handleChange("content")} />
                    <div className={styles.textNum}>{textNum}/600</div>
                </FormItem>
                <div className={styles.dateFormItem}>
                    <div className={styles.date}>{form.time || date3String(new Date())}</div>
                    <div className={styles.noon}>{form.afternoon === "1" ? "下午" : "" || form.morning === "1" ? '上午' : ""}</div>
                </div>
                <FormItem prop="reservationPerson" label="预约人" required>
                    <Input
                        placeholder="请输入"
                        onChange={handleChange("reservationPerson")}
                        value={form.reservationPerson}
                    />
                </FormItem>
                <FormItem prop="phone" label="预约电话" required>
                    <Input
                        placeholder="请输入"
                        onChange={handleChange("phone")}
                        value={form.phone}
                    />
                </FormItem>

            </Form>
            <Button disabled={disabled} onClick={handleSubmit}>完成</Button>
        </div>
    )
}) 