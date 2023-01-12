/*
 * @Descripttion:
 * @version:
 * @Author: yinzi
 * @Date: 2022-04-12 15:55:27
 * @LastEditors: yinzi
 * @LastEditTime: 2022-04-13 14:24:11
 */
import request from "utils/request";
import api from "config/api";

// 新增随手拍
export const addList = async (data) =>
  request({
    url: api.mailbox.ADD_LIST,
    data,
    method: "post",
  });
// 获取随手拍详情
export const getListDetail = async (data) =>
  request({
    url: api.mailbox.GET_LIST_DETAILS,
    data,
    method: "get",
  });
// 评价
export const evaluate = async (data) =>
  request({
    url: api.mailbox.EVALUATE,
    data,
    method: "post",
  });
