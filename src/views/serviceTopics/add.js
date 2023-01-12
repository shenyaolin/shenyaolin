/*
 * @Descripttion:
 * @version:
 * @Author: yinzi
 * @Date: 2021-10-30 18:48:25
 * @LastEditors: yinzi
 * @LastEditTime: 2022-04-13 10:25:24
 */
import React, { memo, useEffect, useCallback, useRef, useState } from "react";
import Button from "framework/components/Button";
import styles from "./index.less";
import { addInformation } from "services/common";
import Form from "framework/components/Form";
import Input from "framework/components/Form/entry/Input";
import message from "framework/utils/message";
import ImageUpload from "framework/components/Form/entry/ImageUpload";
import TextArea from "framework/components/Form/entry/TextArea";
import { navBack } from 'framework/utils/url';
import storage from 'framework/utils/storage';
const { FormItem } = Form;
const { required, numberTwo, intPositive, phoneOrMobile, maxLength } = Form.rules;

export default memo(() => {
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({});
  const [query, setquery] = useState({});
  const rules = {
    title: [required, maxLength(30)],
    mobile: [phoneOrMobile],
    address: [maxLength(30)],
    subjectName: [maxLength(30)],
    detail:[maxLength(500)]
  };

  useEffect(() => {
    const query  = storage.get("information");
    document.title = query.name;
    setquery(query);
    setForm((prev) => ({
      ...prev,
      informationType: query.informationType,
      picList: []
    }));
  }, []);

  const getValue = useCallback((eventOrvalue) => {
    const type = typeof eventOrvalue;
    if (type === "object" && eventOrvalue !== null && eventOrvalue.target) {
      return eventOrvalue.target.value;
    }
    return eventOrvalue;
  }, []);

  const setFormData = useCallback(
    (fieldName) => {
      return (eventOrvalue) => {
        const value = getValue(eventOrvalue);
        setForm((prev) => ({
          ...prev,
          [fieldName]: value,
        }));
      };
    },
    [getValue]
  );

  const validate = useCallback(async () => {
    const valid = await formRef.current.validate();
    return valid;
  }, []);

  const onSave = useCallback(async () => {
    setLoading(true);
    const errMsg = await validate();
    if (errMsg) {
      message.toast(errMsg);
      setLoading(false);
    } else {
      const { success } = await addInformation(form);
      if (success) {
        message.toast('保存成功');
        setTimeout(navBack, 1500);
      }
      setLoading(false);
    }
  }, [form, validate]);

  return (
    <div>
      <Form ref={formRef} model={form} rules={rules} className={styles.formBox}>
        <FormItem label="标题名称" prop="title">
          <Input
            value={form && form.title}
            placeholder="请输入标题名称（必填）"
            onChange={setFormData("title")}
          />
        </FormItem>
        <FormItem label="图片上传" prop="picList">
          <ImageUpload
            maxLength={10}
            value={form && form.picList}
            onChange={setFormData("picList")}
          />
        </FormItem>
        <FormItem label="详细信息" prop="detail">
          <TextArea
            value={form && form.detail}
            placeholder="请输入详细信息"
            onChange={setFormData("detail")}
          />
          </FormItem>
        <FormItem label="联系人" prop="contactMan">
          <Input
            value={form && form.contactMan}
            placeholder="请输入联系人"
            onChange={setFormData("contactMan")}
          />
        </FormItem>
        <FormItem label="电话" prop="mobile">
          <Input
            value={form && form.mobile}
            placeholder="请输入联系电话"
            onChange={setFormData("mobile")}
          />
        </FormItem>
        <FormItem label="主体名称" prop="subjectName">
          <Input
            value={form && form.subjectName}
            placeholder="请输入主体名称"
            onChange={setFormData("subjectName")}
          />
        </FormItem>
        <FormItem label="地址" prop="address">
          <Input
            value={form && form.address}
            placeholder="请输入地址"
            onChange={setFormData("address")}
          />
        </FormItem>
        
      </Form>
      <div className={styles.pageFooter}>
        <Button
          className={styles.submitButton}
          type="bottom"
          disabled={loading}
          onClick={onSave}
        >
          提交
        </Button>
      </div>
    </div>
  );
});

// export default memo(Deposit);