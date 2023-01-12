import React, { memo, useRef, useState, useCallback } from "react";
import styles from "./index.less";
import { pushUrl } from "framework/utils/url";
import api from "config/api";
import { SearchBar } from "antd-mobile";
import classnames from "classnames";
import PagingList from "framework/components/PagingList";
import Button from "framework/components/Button";
import RenderItem from "./components/RenderItem";

const tabs = [
  { label: "最新", type: 1 },
  { label: "关注", type: 2 },
];

document.title = "乡邻圈";
export default memo(() => {
  const [data, setData] = useState({ type: 1 });
  const [tabIndex, setTabIndex] = useState(0);
  const listRef = useRef(null);

  const renderItem = useCallback((item, index) => {
    return <RenderItem key={index} item={item} refresh={refresh} handlerefresh={handlerefresh}></RenderItem>;
  });

  const handleTabClick = useCallback((type, index) => {
    setTabIndex(index);
    setData((prev) => ({
      ...prev,
      type: type,
    }));
    refresh();
  }, [data]);

  const handleChange = useCallback((e) => {
    setData((prev) => ({
      ...prev,
      search: e,
    }));
  });

  const handlerefresh = (id) => {
    listRef.current.handlerefresh(id);
  };

  const refresh = () => {
    listRef.current.refresh();
  };

  return (
    <div className={styles.neightborhoodContainer}>
      {/* <SearchBar
        placeholder="搜索"
        value={(data && data.search) || ""}
        onSubmit={refresh}
        onChange={handleChange}
      /> */}
      <div className={styles.tabs}>
        {tabs.map((item, index) => {
          return (
            <span
              key={index}
              className={classnames(
                styles.tab,
                tabIndex === index && styles.tabActive
              )}
              onClick={() => {
                handleTabClick(item.type, index);
              }}
            >
              {item.label}
              {tabIndex === index && (
                <img
                  src={require("../../assets/images/newImg/Underline.png")}
                />
              )}
            </span>
          );
        })}
      </div>
      <PagingList
        dataSource={api.neighborhood.GET_LIST}
        ref={listRef}
        renderItem={renderItem}
        ajaxParams={data}
        otherHeight={54}
      />
      <div className={styles.footerBtn}>
        <Button
          onClick={() => pushUrl({ pathname: "/neighborhood/release" })}
        >
          去发布
        </Button>
      </div>
    </div>
  );
});
