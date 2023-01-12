import React, { memo, useState, useCallback, useRef } from "react";
import { getRouterInfo } from "framework/utils/url";
import Form from "framework/components/Form";
import TextArea from 'framework/components/Form/entry/TextArea'
import ImageUpload from "framework/components/Form/entry/ImageUpload";
import Button from "framework/components/Button";
import styles from '../index.less'
import { setFinish } from "services/list";
import message from "framework/utils/message";
import { wxPushUrl } from "framework/utils/url";

const { FormItem } = Form;

const rules = Form.rules;

const { required, maxLength } = rules;


document.title = "随手拍"
export default memo(() => {
    const [form, setform] = useState({ image: [] })
    const [textNum, setTextNum] = useState(0)
    const [type, setType] = useState(0)
    const formRef = useRef(null)
    const { query } = getRouterInfo()


    const rules = useCallback(() => {
        const rule = {
            reply: [required, maxLength(600)],
        };
        return rule;
    }, []);

    const handleFinish = useCallback(async () => {
        const err = await formRef.current.validate();
        if (err) {
            message.toast(err);
        } else {
            const newForm = JSON.parse(JSON.stringify(form))
            newForm.image = newForm.image.join(",")
            const { state } = await setFinish({ ...newForm, snapshotId: query.snapshotId })
            if (state === 200) {
                // message.toast("发送成功")
                setType(1)
            }
        }
    })

    const handleChange = useCallback((fieldName) => (e) => {
        if (fieldName === "reply") setTextNum(e.length)
        const value = e && e.target ? e.target.value : e;
        setform((prev) => ({
            ...prev,
            [fieldName]: value,
        }));
    }, [])


    return (
        <>
            {
                type === 0 && <div className={styles.acceptanceContainer}>
                    <Form ref={formRef} model={form} rules={rules()}>
                        <FormItem required prop="reply" label="处理回复" className={styles.formItem}>
                            <TextArea placeholder={"请输入回复"} maxLength={600} value={form && form.reply || ""} onChange={handleChange("reply")} />
                            <div className={styles.textNum}>{textNum}/600</div>
                        </FormItem>
                        <FormItem label="上传图片">
                            <ImageUpload
                                maxLength={4}
                                value={form && form.image || ""}
                                onChange={handleChange("image")}
                            />
                        </FormItem>
                    </Form>
                    <Button onClick={handleFinish}>办结</Button>
                </div>
            }
            {
                type === 1 && <div className={styles.returnList}>
                    <div className={styles.image}></div>
                    <div className={styles.tips}>当前事件已办结！</div>
                    <button onClick={() => wxPushUrl({ pathname: "/clapCasually" })}>返回列表</button>
                </div>
            }
        </>
    )
})