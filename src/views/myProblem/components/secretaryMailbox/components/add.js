/*
 * @Descripttion:
 * @version:
 * @Author: yinzi
 * @Date: 2022-04-11 19:49:52
 * @LastEditors: yinzi
 * @LastEditTime: 2022-04-29 11:09:23
 */
import React, { memo, useState, useRef, useCallback } from "react";
import config from "src/config/index.js";
import styles from "../index.less";
import Button from "framework/components/Button";
import Form from "framework/components/Form";
import TextArea from "framework/components/Form/entry/TextArea";
import Input from "framework/components/Form/entry/Input";
import ImageUpload from "framework/components/Form/entry/ImageUpload";
import getEnums from "src/enums";
import EnumPicker from "framework/components/Form/entry/EnumPicker";
import { addList } from "services/mailbox";
import message from "framework/utils/message";
import { wxPushUrl } from "framework/utils/url";
import storage from "framework/utils/storage";

const { FormItem } = Form;
const rules = Form.rules;
const { required, maxLength, phone } = rules;

export default memo(() => {
  document.title = "写信";
  const [form, setform] = useState({
    image: [],
    villageId: config.villageId,
    userId: storage.get("userId"),
    userName: storage.get("userInfo").name || storage.get("userInfo").nickName,
    // villageName: "桥家乡",
  });
  const [textNum, setTextNum] = useState(0);
  const formRef = useRef(null);

  const rules = useCallback(() => {
    const rule = {
      type: [required],
      content: [required, maxLength(600)],
      phone: [phone],
      name: [ maxLength(10)],
      title: [required, maxLength(20)],
    };
    return rule;
  }, []);

  const handleChange = useCallback(
    (fieldName) => (e) => {
      let value = e && e.target ? e.target.value : e;
      if (fieldName === "content") setTextNum(e.length);
      // if (fieldName === "type") value = Number(value);
      setform((prev) => ({
        ...prev,
        [fieldName]: value,
      }));
    },
    []
  );

  const handleSubmit = useCallback(async () => {
    const err = await formRef.current.validate();
    const newForm = JSON.parse(JSON.stringify(form));
    newForm.image = newForm.image.join(",");
    newForm.type = Number(newForm.type);
    if (err) {
      message.toast(err);
    } else {
      const { state } = await addList(newForm);
      if (state === 200) {
        message.toast("发送成功");
        wxPushUrl({ pathname: "/secretaryMailbox" });
      }
    }
  }, [form]);

  const realName = useCallback(() => {
    return (
      <>
        <FormItem prop="name" label="姓名" required>
          <Input
            placeholder="请输入姓名"
            value={(form && form.name) || ""}
            onChange={handleChange("name")}
          />
        </FormItem>
        <FormItem prop="phone" label="手机号" required>
          <Input
            placeholder="请输入手机号"
            value={(form && form.phone) || ""}
            onChange={handleChange("phone")}
          />
        </FormItem>
      </>
    );
  }, [form, handleChange]);

  return (
    <div className={styles.formBox}>
      <Form ref={formRef} model={form} rules={rules()}>
        <FormItem prop="title" label="标题" required>
          <Input
            placeholder="请输入标题"
            value={(form && form.title) || ""}
            onChange={handleChange("title")}
          />
        </FormItem>
        <FormItem
          prop="content"
          label="详情描述"
          required
          className={styles.formItem}
        >
          <TextArea
            placeholder={"请输入建议"}
            maxLength={600}
            value={(form && form.content) || ""}
            onChange={handleChange("content")}
          />
          <div className={styles.textNum}>{textNum}/600</div>
        </FormItem>
        <FormItem prop="image" label="上传图片">
          <ImageUpload
            maxLength={4}
            value={(form && form.image) || ""}
            onChange={handleChange("image")}
          />
        </FormItem>
        <FormItem prop="type" label="发送方式" required>
          <EnumPicker
            enums={getEnums("发送方式")}
            value={form && form.type}
            onChange={handleChange("type")}
          />
        </FormItem>
        {form.type === "2" && realName()}
      </Form>
      <Button className={styles.submitBtn} onClick={handleSubmit}>
        提交
      </Button>
    </div>
  );
});
