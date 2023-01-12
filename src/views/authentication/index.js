import React, { memo, useState, useRef, useCallback } from "react";
import styles from "./index.less";
import api from "src/config/api.js";
import config from "src/config/index.js";
import Form from "framework/components/Form";
import Input from "framework/components/Form/entry/Input";
import RemoteSelect from "framework/components/Form/entry/RemoteSelect";
import { addUser, getAddress } from "services/user.js";
import message from "framework/utils/message";
import { wxPushUrl } from "framework/utils/url";
import storage from "../../framework/utils/storage";
import EnumPicker from "framework/components/Form/entry/EnumPicker";
import getEnums from "src/enums";
import Button from "framework/components/Button";

const { FormItem } = Form;

const rules = Form.rules;

const { required, idCardNumber } = rules;

document.title = "身份认证";
export default memo(() => {
  const [form, setform] = useState({
    // villageName: '桥家乡',
    // villageId: "ec7b6b3316714265bb9355ebb98c9c47",
    openId: storage.get("userInfo").openId,
    phone: storage.get("userInfo").phone,
  });
  const formRef = useRef(null);

  const rules = useCallback(() => {
    const rule = {
      userType: [required],
      villageId: [required],
      name: [required],
      idCard: [required, idCardNumber],
    };
    return rule;
  }, []);

  const handleSubmit = useCallback(async () => {
    let loading = true
    if (loading) {
      loading = false
      const err = await formRef.current.validate();
      if (err) {
        message.toast(err);
      } else {
        const { state } = await addUser(form);
        if (state === 200) {
          message.toast("认证成功");
          loading = true
          wxPushUrl({ pathname: "/", query: { refresh: true } });
        }
      }
    }
  }, [form]);

  const handleInputChange = useCallback(
    (fieldName) => (e) => {
      const value = e && e.target ? e.target.value : e;
      setform((prev) => ({
        ...prev,
        [fieldName]: value,
      }));
    },
    []
  );
  const setProductName = useCallback(async (k, props) => {
    const { state, results } = await getAddress({ areaCode: props.ssxzc });
    if (state === 200) {
      setform((prev) => ({
        ...prev,
        villageId: props.Id,
        villageName: `${results.streetName}${results.villageName}`,
      }));
    }
  }, []);
  return (
    <div className={styles.authenticationContainer}>
      <div className={styles.promptLanguage}>请输入您的认证信息</div>
      <Form
        ref={formRef}
        model={form}
        rules={rules()}
        layout="horizontal"
        className={styles.formBox}
      >
        <FormItem prop="userType" label="身份选择" required>
          <EnumPicker
            enums={getEnums("身份选择")}
            value={form && form.userType}
            onChange={handleInputChange("userType")}
          />
        </FormItem>
        <FormItem prop="villageId" label="村" required>
          <RemoteSelect
            placeholder="请选择"
            onChange={setProductName}
            labelKey="zrc"
            valueKey="Id"
            // rsKey="villageId"
            remoteUrl={api.common.TRACE_DYNAMIC_FUN}
            value={form && form.villageName}
            label={form && form.villageName}
            params={{
              functionId: config.zrc,
              organizationId: config.organizationId,
            }}
          />
        </FormItem>
        <FormItem prop="name" label="姓名" required>
          <Input
            placeholder="请输入"
            onChange={handleInputChange("name")}
            value={form.name}
          />
        </FormItem>
        <FormItem prop="idCard" label="身份证号" required>
          <Input
            placeholder="请输入"
            onChange={handleInputChange("idCard")}
            value={form.idCard}
          />
        </FormItem>
      </Form>
      <Button onClick={handleSubmit}>认证</Button>
    </div>
  );
});
