/*
 * @Descripttion:
 * @version:
 * @Author: yinzi
 * @Date: 2022-02-15 21:28:04
 * @LastEditors: yinzi
 * @LastEditTime: 2022-02-16 16:05:40
 */
import request from "utils/request";
import api from "config/api";

// 获取指数
export const getIndex = async (data) =>
  request({
    url: api.helpFarmer.index,
    data,
    method: "get",
  });
// 获取开采预测
export const getPredict = async (data) =>
  request({
    url: api.helpFarmer.predict,
    data,
    method: "get",
  }); 
// 获取病虫害
export const getPests = async (data) =>
  request({
    url: api.helpFarmer.pests,
    data,
    method: "get",
  });
  // 获取价格指数
  export const getPrice = async (data) =>
  request({
    url: api.helpFarmer.price,
    data,
    method: "get",
  });
