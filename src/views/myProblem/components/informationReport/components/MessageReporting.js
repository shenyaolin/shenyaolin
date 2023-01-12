import React, { memo, useState, useRef, useCallback, useEffect } from "react";
import styles from "../index.less";
import Form from "framework/components/Form";
import Input from "framework/components/Form/entry/Input";
import TextArea from 'framework/components/Form/entry/TextArea'
import { addMessageReport } from "services/informationReport";
import message from "framework/utils/message";
import { wxPushUrl } from "framework/utils/url";
import storage from "framework/utils/storage";
import EnumPicker from "framework/components/Form/entry/EnumPicker";
import ImageUpload from "framework/components/Form/entry/ImageUpload";
import Picker from "framework/components/Form/entry/Picker";
import getEnums from "src/enums";
import Button from "framework/components/Button";

const { FormItem } = Form;

const rules = Form.rules;

const { required, maxLength } = rules;

const options = [{ label: "匿名", value: 2 }, { label: "实名", value: 1 }]

document.title = "留言上报";
export default memo(() => {
    const [form, setform] = useState({
        reportType: 1,
        image: []
    });
    const [textNum, setTextNum] = useState(0)
    const [realNameShow, setRealNameShow] = useState(false)
    const formRef = useRef(null);
    const rules = useCallback(() => {
        const rule = {
            problemType: [required],
            sendType: [required],
            detailDescription: [required, maxLength(600)],
            sendType: [required],
            name: realNameShow ? [required] : [],
            phone: realNameShow ? [required] : [],
        };
        return rule;
    }, [realNameShow]);

    const handleSubmit = useCallback(async () => {
        const err = await formRef.current.validate();
        if (err) {
            message.toast(err);
        } else {
            let newForm = JSON.parse(JSON.stringify(form))
            newForm.image = newForm.image.join(",")
            const { state } = await addMessageReport(newForm);
            if (state === 200) {
                message.toast("留言上报成功");
                wxPushUrl({ pathname: "/informationReport/opinionBox"});
            }
        }
    }, [form]);

    const handleInputChange = useCallback(
        (fieldName) => (e) => {
            const value = e && e.target ? e.target.value : e;
            if (fieldName === "detailDescription") setTextNum(e.length);
            if (fieldName === "sendType" && value === 1) {
                setform((prev) => ({
                    ...prev,
                    name: storage.get("userInfo").name || "",
                    phone: storage.get("userInfo").phone || "",
                }));
                setRealNameShow(true)
            } else {
                setRealNameShow(false)
            }
            setform((prev) => ({
                ...prev,
                [fieldName]: value,
            }));
        },
        []
    );
    
    return (
        <div className={styles.MessageReportingContainer}>
            <Form ref={formRef} model={form} rules={rules()} >
                <FormItem prop="problemType" label="问题类型" required>
                    <EnumPicker
                        enums={getEnums("问题类型")}
                        placeholder={"请选择 (必填)"}
                        value={form && form.problemType}
                        onChange={handleInputChange("problemType")}
                    />
                </FormItem>
                <FormItem prop="detailDescription" label="事件描述" required className={styles.formItem}>
                    <TextArea placeholder={"请输入建议"} maxLength={600} value={(form && form.detailDescription) || ""} onChange={handleInputChange("detailDescription")} />
                    <div className={styles.textNum}>{textNum}/600</div>
                </FormItem>
                <FormItem label="上传照片">
                    <ImageUpload
                        maxLength={4}
                        value={form && form.image}
                        onChange={handleInputChange("image")}
                    />
                </FormItem>
                <FormItem prop="sendType" label="发送方式" required>
                    <Picker
                        placeholder="请选择"
                        options={options}
                        value={form.sendType}
                        onChange={handleInputChange("sendType")}
                    />
                </FormItem>
                {
                    realNameShow && <>
                        <FormItem prop="name" label="姓名" required>
                            <Input
                                placeholder="请输入"
                                value={form && form.name}
                                onChange={handleInputChange("name")}
                            />
                        </FormItem>
                        <FormItem prop="phone" label="手机号码" required>
                            <Input
                                placeholder="请输入"
                                value={form && form.phone}
                                onChange={handleInputChange("phone")}
                            />
                        </FormItem>
                    </>
                }
            </Form>
            <Button onClick={handleSubmit}>提交</Button>
        </div>
    );
});
