import React, { memo, useState, useCallback, useEffect, useRef } from "react";
import styles from "../index.less";
import { getRouterInfo } from "framework/utils/url";
import { inspection, getH5 } from "services/myPatrol";
import { showLoading, hideLoading } from "framework/utils/loading";
import classnames from "classnames";
import Button from "framework/components/Button";
import { wxPushUrl } from "framework/utils/url";
import taskMessage from "assets/images/newImg/taskMessage.png";
import summary from "assets/images/newImg/summary.png";
import Form from "framework/components/Form";
import ImageUpload from "framework/components/Form/entry/ImageUpload";
import TextArea from "framework/components/Form/entry/TextArea";
import { date3String } from "framework/utils/date";
import message from "framework/utils/message";
const { FormItem } = Form;

const rules = Form.rules;

const { required, maxLength } = rules;

const InspectionModule = [
  {
    title: "基础信息",
    icon: taskMessage,
    children: [
      { name: "巡检对象", field: "inspectionObject" },
      { name: "家庭状态", field: "familyType" },
    ],
  },
  {
    title: "巡检纪要",
    icon: summary,
    children: [
      { name: "网格员", field: "name" },
      { name: "完成巡检日期", field: "completeTime" },
    ],
  },
];

const familyType = {
  1: "扶贫户",
  2: "低保户",
  3: "扶贫低保户",
  4: "五保户",
  5: "一般贫困户",
  6: "建档立卡户",
  7: "一般农户",
  8: "特困户",
  9: "低保边缘户",
};

document.title = "巡检纪要";
export default memo(() => {
  const [form, setForm] = useState({ image: [] });
  const [Inspection, setInspection] = useState({});
  // const [textNum, setTextNum] = useState(0);
  const formRef = useRef(null);
  // const [householdId, sethouseholdId] = useState("");

  const rules = useCallback(() => {
    const rule = {
      summary: [required, maxLength(300)],
      image: [required],
    };
    return rule;
  }, []);
  const getHouseholdId = useCallback(async (code) => {
    if (code) {
      const { state, results } = await getH5(code);
      if (state === 200) {
        return results;
      }
    }
  }, []);

  useEffect(() => {
    const fun = async () => {
      const { query } = getRouterInfo();
      const householdId = await getHouseholdId(query.code);
      if (householdId && householdId === query.householdId) {
        if (query) {
          setForm((prev) => ({
            ...prev,
            completeTime: date3String(new Date()),
            gridmanId: query.gridmanId,
            name: query.name,
            recordId: query.recordId,
          }));
          setInspection({
            inspectionObject: query.inspectionObject,
            completeTime: date3String(new Date()),
            familyType: query.familyType,
            name: query.name,
          });
        }
      } else {
        message.toast("该户码与巡检对象不匹配！");
        wxPushUrl({ pathname: "/myPatrol/task" })
      }
    };
    fun();
  }, [getHouseholdId]);

  const handleFinishTask = async () => {
    const err = await formRef.current.validate();
    if (err) {
      message.toast(err);
    } else {
      const newForm = JSON.parse(JSON.stringify(form));
      newForm.image = newForm.image.join(",");
      const { state } = await inspection(newForm);
      if (state === 200) {
        message.toast("提交成功");
        wxPushUrl({ pathname: "/myPatrol/task" });
      }
    }
  };

  const handleChange = useCallback(
    (fieldName) => (e) => {
      let value = e && e.target ? e.target.value : e;
      // if (fieldName === "summary") setTextNum(e.length);
      setForm((prev) => ({
        ...prev,
        [fieldName]: value,
      }));
    },
    []
  );

  return (
    <div className={styles.summaryContainer}>
      {InspectionModule.map((item, index) => {
        return (
          <div className={styles.moduleItem} key={index}>
            <div className={styles.moduleTitle}>
              <img alt="" src={item.icon} />
              {item.title}
            </div>
            {item.children &&
              item.children.map((item1, index1) => {
                return (
                  <>
                    <div className={styles.moduleContent} key={index1}>
                      <div className={styles.moduleContentName}>
                        {item1.name}
                      </div>
                      <div className={classnames(styles.moduleContentContent)}>
                        {item1.field === "familyType"
                          ? familyType[Inspection[item1.field]]
                          : Inspection[item1.field]}
                      </div>
                    </div>
                    {index === 1 && index1 === 1 && (
                      <Form ref={formRef} model={form} rules={rules()}>
                        <FormItem
                          prop="summary"
                          label="巡检纪要"
                          required
                          className={styles.formItem}
                        >
                          <TextArea
                            placeholder={"请描述您巡检的过程"}
                            maxLength={300}
                            value={(form && form.summary) || ""}
                            onChange={handleChange("summary")}
                          />
                          {/* <div className={styles.number}>{textNum}/300</div> */}
                        </FormItem>
                        <FormItem prop="image" label="上传图片" required>
                          <ImageUpload
                            maxLength={6}
                            value={(form && form.image) || ""}
                            onChange={handleChange("image")}
                          />
                        </FormItem>
                      </Form>
                    )}
                  </>
                );
              })}
          </div>
        );
      })}
      <div className={styles.bottomBtns}>
        <Button onClick={handleFinishTask}>提交</Button>
      </div>
    </div>
  );
});
