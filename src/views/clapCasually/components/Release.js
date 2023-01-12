import React, { memo, useState, useRef, useCallback } from "react";
import api from "src/config/api.js";
import config from "src/config/index.js";
import styles from "../index.less";
import Button from "framework/components/Button";
import Form from "framework/components/Form";
import TextArea from "framework/components/Form/entry/TextArea";
import ImageUpload from "framework/components/Form/entry/ImageUpload";
import RemoteSelect from "framework/components/Form/entry/RemoteSelect";
import classNames from "classnames";
import { addList, getAddress } from "services/list";
import message from "framework/utils/message";
import { wxPushUrl } from "framework/utils/url";
import storage from "framework/utils/storage";

const { FormItem } = Form;

const rules = Form.rules;

const { required, maxLength } = rules;

const subjectList = [
  { label: "矛盾纠纷", type: 1 },
  { label: "安全隐患", type: 2 },
  { label: "环境卫生", type: 3 },
  { label: "道路安全", type: 4 },
  { label: "疫情防控", type: 5 },
  { label: "消防安全", type: 6 },
  { label: "食品安全", type: 7 },
];

document.title = "随手拍";
export default memo(() => {
  const [form, setform] = useState({
    type: "",
    eventImage: [],
    villageId: config.villageId,
    userId: storage.get("userId"),
    userName: storage.get("userInfo").name || storage.get("userInfo").nickName,
    villageName: "",
  });
  const [textNum, setTextNum] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const formRef = useRef(null);

  const rules = useCallback(() => {
    const rule = {
      type: [required],
      description: [required, maxLength(600)],
      eventImage: [required],
      villageName: [required],
    };
    return rule;
  }, []);

  const handleClick = useCallback((item) => {
    setform((prev) => ({
      ...prev,
      type: item.type,
    }));
  }, []);

  const handleChange = useCallback(
    (fieldName) => (e) => {
      if (fieldName === "description") setTextNum(e.length);
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

  const handleSubmit = useCallback(async () => {
    setDisabled(true)
    const err = await formRef.current.validate();
    const newForm = JSON.parse(JSON.stringify(form));
    newForm.eventImage = newForm.eventImage.join(",");
    if (err) {
      setDisabled(false)
      message.toast(err);
    } else {
      setDisabled(true)
      const { state } = await addList(newForm);
      if (state === 200) {
        message.toast("发送成功");
        wxPushUrl({ pathname: "/clapCasually" });
      }
    }
  }, [form]);

  return (
    <div className={styles.formBox}>
      <Form ref={formRef} model={form} rules={rules()}>
        <FormItem
          prop="type"
          label="事件类型"
          required
          className={styles.formItem}
        >
          <div className={styles.checkList}>
            {subjectList.map((item, index) => {
              return (
                <div
                  className={classNames(
                    styles.checked,
                    form.type === item.type && styles.choose
                  )}
                  key={index}
                  onClick={() => handleClick(item)}
                >
                  {item.label}
                </div>
              );
            })}
          </div>
        </FormItem>
        <FormItem
          prop="description"
          label="事件描述"
          required
          className={styles.formItem}
        >
          <TextArea
            placeholder={"请输入建议"}
            maxLength={600}
            value={(form && form.description) || ""}
            onChange={handleChange("description")}
          />
          <div className={styles.textNum}>{textNum}/600</div>
        </FormItem>
        <FormItem prop="eventImage" label="上传图片" required>
          <ImageUpload
            maxLength={6}
            value={(form && form.eventImage) || ""}
            onChange={handleChange("eventImage")}
          />
        </FormItem>
        <FormItem prop="villageName" label="详细位置" required>
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
      </Form>
      <Button className={styles.submitBtn} disabled={disabled} onClick={handleSubmit}>
        提交
      </Button>
    </div>
  );
});
