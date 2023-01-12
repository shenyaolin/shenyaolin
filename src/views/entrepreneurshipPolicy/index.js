/*
 * @Descripttion:
 * @version:
 * @Author: yinzi
 * @Date: 2022-04-14 15:09:55
 * @LastEditors: yinzi
 * @LastEditTime: 2022-06-08 19:43:57
 */
import React, { memo, useRef, useCallback, useEffect, useState } from "react";
import { SearchBar } from "antd-mobile";
import PagingList from "framework/components/PagingList";
import styles from "./index.less";
import api from "config/api";
import classnames from "classnames";
import { wxPushUrl } from "framework/utils/url";
import Screen from "./components/Screen";

document.title = "创业政策";

export default memo(() => {
  const [data, setData] = useState();
  const [screenLength, setScreenLength] = useState(0);
  const [isShow, setisShow] = useState(false);
  const listRef = useRef(null);

  const refresh = () => {
    listRef.current.refresh();
  };
  const renderItem = useCallback((item, index) => {
    return (
      <div
        className={styles.listItem}
        key={index}
        onClick={() =>
          wxPushUrl({
            pathname: "/entrepreneurshipPolicy/detail",
            query: { policyId: item.policyId },
          })
        }
      >
        <div className={styles.introduce}>
          <div className={styles.name}>{item.name}</div>
          <div className={styles.direction}>
            <div>{item.createTime}</div>
          </div>
        </div>
      </div>
    );
  }, []);

  const handleChange = useCallback((e) => {
    setData((prev) => ({
      ...prev,
      search: e,
    }));
  }, []);
  const handleScreen = useCallback((data) => {
    if (data === "close") {
      setisShow(false);
    } else {
      setData((prev) => {
        // const { search } = prev;
        let obj = {};
        if (data) {
          setScreenLength(Object.keys(data).length)
          obj = { ...prev, ...data };
        } else {
          setScreenLength(0)
        }
        return {
          ...obj,
        };
      });
      
      setisShow(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [data]);
  return (
    <div className={styles.entrepreneurshipPolicy}>
      <div className={styles.header}>
        <SearchBar
          placeholder="搜索"
          value={(data && data.search) || ""}
          onSubmit={() => refresh()}
          onChange={handleChange}
        />
        <div
          className={classnames(
            styles.screen,
            screenLength > 0 && styles.screenNum
          )}
          onClick={() => setisShow(!isShow)}
        >
          筛选{screenLength > 0 && <span>{screenLength}</span>}
        </div>
      </div>

      <PagingList
        dataSource={api.entrepreneurshipPolicy.GET_LIST}
        ref={listRef}
        renderItem={renderItem}
        ajaxParams={data}
      />
      <Screen isShow={isShow} handleScreen={handleScreen} />
    </div>
  );
});
