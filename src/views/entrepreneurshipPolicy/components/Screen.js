import React, {
  memo,
  useCallback,
  useState,
} from "react";
import styles from "../index.less";
import classnames from "classnames";
import Button from "framework/components/Button";


const eventTypeList = [
  { label: "创业服务", type: 1 },
  { label: "就业服务", type: 2 },
  { label: "个体工商户服务", type: 3 },
];

export default memo(({ isShow, handleScreen }) => {
  const [search, setSearch] = useState({});
  const handleEventClick = useCallback((item) => {
    setSearch((prev) => ({
      ...prev,
      type: item.type,
    }));
  }, []);

  const handleRouter = useCallback(
    (type1) => {
      const { type, eventStatus, startDate, endDate } = search;
      if (startDate && endDate) {
        var createTime = `${startDate}~${endDate}`;
      }
      if (type1 === "search") {
        handleScreen({ type })
      } else if (type1 === "close") {
        handleScreen("close")
      } else {
        setSearch({})
        handleScreen()
      }
    },
    [search, handleScreen]
  );

  return (
    <>
      {isShow &&
        <div className={styles.screenContainer}>
          <div className={styles.screenBox}>
            <img alt='' src={require('assets/images/newImg/cross.png')} className={styles.close} onClick={() => handleRouter("close")} />
            <div className={styles.state}>
              <div className={styles.title}>政策类型</div>
              <div className={styles.content}>
                {eventTypeList.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className={classnames(
                        styles.options,
                        styles.eventOptions,
                        search.type == item.type && styles.choose
                      )}
                      onClick={() => handleEventClick(item)}
                    >
                      {" "}
                      {item.label}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className={styles.bottomBtn}>
              <Button onClick={handleRouter}>重置</Button>
              <Button onClick={() => handleRouter("search")}>确定</Button>
            </div>
          </div>
        </div>
      }
    </>
  );
});
