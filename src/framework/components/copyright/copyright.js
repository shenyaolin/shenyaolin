/*
 * @Author: duyaoyao
 * @Date: 2020-05-28 13:09:16
 * @LastEditors: yinzi
 * @LastEditTime: 2022-04-15 16:27:19
 */
import React from "react";
import styles from "./index.less";
import classNames from "classnames";

export default class extends React.Component {
  render() {
    const { className } = this.props;
    return (
      <footer
        id="jgwCopyright"
        {...this.props}
        className={classNames(styles.jgwCopyright, className)}
      >
        <span>技术支持：超级码科技股份  </span>
        <span>Copyright 2005-2025 All Reserved</span>
      </footer>
    );
  }
}
