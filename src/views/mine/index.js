import React, { memo, useCallback, useState, useEffect } from "react";
import styles from "./index.less";
import { wxPushUrl } from "framework/utils/url";
import storage from "framework/utils/storage";
import Button from "framework/components/Button";
import Message from '../../assets/images/newImg/my-Message.png'
import Order from '../../assets/images/newImg/my-Order.png'
import Patrol from '../../assets/images/newImg/my-Patrol.png'
import Question from '../../assets/images/newImg/my-Question.png'
import Todo from '../../assets/images/newImg/my-Todo.png'
import Family from '../../assets/images/newImg/my-Family.png'
import Yard from '../../assets/images/newImg/my-Yard.png'
import Integral from '../../assets/images/newImg/my-Integral.png'
import Portrait from '../../assets/images/newImg/portrait.png'
import arrowRight from '../../assets/images/newImg/arrow-right.png'
import imageSrc from 'framework/utils/imageSrc';
import classnames from 'classnames';
import message from "framework/utils/message";
import arrowRight1 from 'assets/images/newImg/gray-arrow.png';

const jurisdictionList = {
  // 村民
  2: [
    [
      // { name: "我的家庭", path: "", icon: Family },
      { name: "我的庭院", path: "/myGarden", icon: Yard },
    ],
    [
      { name: "我的消息", path: "/myMessage", icon: Message },
      { name: "我的积分", path: "/myPoints", icon: Integral },
      { name: "我的问题", path: "/myProblem", icon: Question },
    ],
    // [{ name: "特产发布申请", path: "", icon: Specialty }],
  ],
  // 游客
  3: [
    { name: "关于我们", path: "", icon: Message },
    //   { name: "我的问题", path: "", icon: Question },
    //   { name: "我的订单", path: "", icon: Order },
  ],
  // 村委
  1: [
    { name: "我的消息", path: "/myMessage", icon: Message },
    { name: "我的巡检", path: "/myPatrol/statisticscw", icon: Patrol },
    // { name: "我的待办", path: "", icon: Todo },
  ],
};
const userIdentity = {
  1: "村委",
  2: "村民",
  3: "游客",
};

export default memo(() => {
  const typeList = storage.get("typeList") || [];
  const userInfoList = storage.get("userInfoList") || [];
  const [userinfo, setuserinfo] = useState(storage.get("userInfo") || {});
  const [userType, setuserType] = useState(storage.get("userType"));
  const [loading, setLoading] = useState(false);
  const handleClick = useCallback((item) => {
    if (item.path) { wxPushUrl({ pathname: item.path }) } else {
      message.toast("此功能正在开发中......");
    }

  }, []);
  // 处理手机号
  const newPhone = useCallback((phone) => {
    return phone.substr(0, 3) + "****" + phone.substr(7);
  }, []);
  const image = useCallback(
    (image) => {
      if (image) {
        if (image.indexOf("http") >= 0) {
          return image
        } else {
          return imageSrc(image)
        }
      } else {
        return Portrait
      }
    },
    [],
  )

  const renderModular = useCallback(
    (userType) => {
      return (
        <div className={styles.modular}>
          {userType && jurisdictionList[userType].map((item, index) => {
            return item && Array.isArray(item) ? (
              <div className={styles.modular} key={index}>
                {item.map((item1, index1) => {
                  return (
                    <button
                      className={styles.modularBox}
                      key={index1}
                      onClick={() => {
                        handleClick(item1);
                      }}
                    >
                      <div className={styles.left}>
                        <img alt="" src={item1.icon} />
                        <div>{item1.name}</div>
                      </div>
                      <div className={styles.right}>
                        <img alt="" src={arrowRight} />
                      </div>
                    </button>
                  );
                })}
              </div>
            ) : (
              <button
                key={index}
                className={styles.modularBox}
                onClick={() => {
                  handleClick(item);
                }}
              >
                <div className={styles.left}>
                  <img alt="" src={item.icon} />
                  <div>{item.name}</div>
                </div>
                <div className={styles.right}>
                  <img alt="" src={arrowRight} />
                </div>
              </button>
            );
          })}
        </div>
      );
    },
    [handleClick]
  );

  const changeUser = useCallback(
    (userType) => {
      setLoading(true);
      console.log(userType);
      const newType = userType === 2 ? 1 : 2;
      setuserType(newType);
      storage.set("userType", newType);
      const userInfo = userInfoList.filter((item, index) => {
        return item.userType === newType;
      });
      setuserinfo(userInfo[0]);
      storage.set("userInfo", userInfo[0] || {});
      wxPushUrl({
        pathname: "/mine",
      });
    },
    [userInfoList]
  );

  return (
    userinfo && (
      <div className={styles.mineContainer}>
        <div className={styles.linear}>
          <div className={styles.myMessage}>
            <div className={styles.portrait}>
              <img
                alt=""
                src={
                  image(userinfo.image)
                }
              />
              <div className={styles.message}>
                <div className={styles.messageItem}>
                  <span className={styles.name}>{userinfo.nickName}</span>
                  <span className={styles.identity}>
                    {userIdentity[userinfo.userType]}
                  </span>
                </div>
                <div className={styles.messageItem}>
                  <span className={styles.photo}>
                    {userinfo.phone ? newPhone(userinfo.phone) : ""}
                  </span>
                  {userType !== 3 && <span className={styles.essential} onClick={() => {
                    wxPushUrl({ pathname: '/myDetail' })
                  }}>基本信息<img alt="" src={arrowRight1} /> </span>}
                </div>
              </div>
            </div>
            {typeList.length === 3 && (
              <div
                className={styles.changeUser}
              >
                <Button
                  className={styles.submitButton}
                  type="bottom"
                  disabled={loading}
                  onClick={() => changeUser(userType)}
                >
                  身份切换
                </Button>
              </div>
            )}
          </div>
          <div className={styles.authentication}>
            <div className={styles.content}>
              <span className={styles.icon}>
                <img
                  src={require("../../assets/images/newImg/certificationIcon.png")}
                  alt=""
                />
              </span>
              <span>{userType === 3 ? "您需对您的身份进行认证" : "您可以重新进行身份认证"}</span>
            </div>
            <div
              className={classnames(styles.rightContent, userType !== 3 && styles.rightContent1)}
              onClick={() => {
                wxPushUrl({
                  pathname: "/authentication",
                });
              }}
            >
              {userType === 3 ? "身份认证" : "重新认证"}
              &nbsp;&gt;
            </div>
          </div>
        </div>
        {renderModular(userType)}
      </div>
    )
  );
});
