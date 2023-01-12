import React, { memo, useCallback, useEffect, useState } from "react";
import Styles from "./index.less";
import classNames from 'classnames';

export default memo(({ tabs, handleTabIndex }) => {
    const [tabIndex, setTabIndex] = useState(0);

    const handleTabClick = (index) => {
        setTabIndex(index)
        handleTabIndex && handleTabIndex(index)
    }

    return (
        <div className={Styles.tab}>
            {
                tabs.length > 0 && tabs.map((item, index) => {
                    return <div className={classNames(Styles.tabItem, tabIndex === index && Styles.active)} onClick={() => handleTabClick(index)} key={index}>{item.label}</div>
                })
            }
        </div>
    );
});

