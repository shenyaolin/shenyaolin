import React, { memo, useCallback, useState, useRef, useEffect } from "react";
import Form from "framework/components/Form";
import styles from "./index.less";
import Input from "framework/components/Form/entry/Input";
import Button from "framework/components/Button";
import ImageUpload from "framework/components/Form/entry/ImageUpload";
import storage from "framework/utils/storage";
import { wxPushUrl } from "framework/utils/url";
import { edit } from "services/myDetail.js";
import { getUserMsg } from "services/user.js";
import message from "framework/utils/message";
import { List, Radio, Flex, WhiteSpace } from "antd-mobile";
document.title = "个人信息";
const RadioItem = Radio.RadioItem;
export default memo(() => {
  const personal = storage.get("userInfo"); //个人信息
  const openId = storage.get("openid");
  const { FormItem } = Form;
  const { maxLength, required, phone, idCardNumber } = Form.rules;
  const formRef = useRef(null);
  const [formData, setFormData] = useState({
    ...personal,
    sex: "",
  });
  const setSex = useCallback(async () => {
    const res = await getUserMsg({ openId: openId });
    if (res.results.length === 0) {
      setFormData((prev) => {
        return { ...prev };
      });
    } else {
      setFormData((prev) => {
        return { ...prev, sex: res.results[0].sex };
      });
    }
  }, [openId]);
  useEffect(() => {
    setSex();
  }, [setSex]);

  const submit = useCallback(async () => {
    const valid = await formRef.current.validate();
    if (!valid) {
      const res = await edit({ ...formData, image: formData.image instanceof Array ? formData.image[0] : formData.image  });
      if (res.state === 200) {
        wxPushUrl({ pathname: "/", query: { refresh: true } });
      }
    } else {
      message.toast(valid);
    }
  }, [formData]);

  const rules = {
    image: [required],
    nickName: [required],
    phone: [required, phone],
    sex: [required],
    idCard: [required, idCardNumber],
    villageName: [required, maxLength(50)],
  };
  const setFormValue = (field) => {
    return (value) => {
      formData[field] = value;
      setFormData(Object.assign({}, formData));
    };
  };
  const data = [
    { value: 0, label: "男" },
    { value: 1, label: "女" },
  ];
  const changeSex = (value) => {
    setFormData({ ...formData, sex: value });
  };
  return (
    <>
      <div className={styles.box}>
        <Form
          ref={formRef}
          model={formData}
          rules={rules}
          style={{ paddingBottom: 70 }}
        >
          <FormItem label="头像上传" prop="image" required>
            <ImageUpload
              maxLength={1}
              value={formData.image}
              onChange={setFormValue("image")}
            />
          </FormItem>
          <FormItem label="名称" prop="nickName" required>
            <Input
              value={formData.nickName}
              onChange={setFormValue("nickName")}
              placeholder="请输入名称"
            />
          </FormItem>
          {/* <FormItem label="性别" prop="sex" required>
                        <Input value={formData.sex} onChange={setFormValue('sex')} placeholder='请输入性别' />
                    </FormItem> */}
          <FormItem label="性别" prop="sex" required>
            <List style={{ width: "100%" }}>
              {data.map((i) => (
                <RadioItem
                  key={i.value}
                  checked={formData.sex === i.value}
                  onChange={() => changeSex(i.value)}
                >
                  {i.label}
                </RadioItem>
              ))}
            </List>
          </FormItem>

          <FormItem label="手机号码" prop="phone" required>
            <Input
              value={formData.phone}
              onChange={setFormValue("phone")}
              placeholder="请输入手机号码"
            />
          </FormItem>
          <FormItem label="身份证号码" prop="idCard" required>
            <Input
              value={formData.idCard}
              onChange={setFormValue("idCard")}
              placeholder="请输入身份证号码"
            />
          </FormItem>
          <FormItem label="地址" prop="villageName" required>
            <Input
              value={formData.villageName}
              onChange={setFormValue("villageName")}
              placeholder="请输入地址"
            />
          </FormItem>
          <Button type="button" className={styles.sub} onClick={submit}>
            {" "}
            提交
          </Button>
        </Form>
      </div>
    </>
  );
});
