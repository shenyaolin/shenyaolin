/*
 * @Descripttion: 
 * @version: 
 * @Author: yinzi
 * @Date: 2021-10-30 15:44:40
 * @LastEditors: yinzi
 * @LastEditTime: 2022-02-21 19:15:12
 */
import request from "utils/request";
import api from "config/api";
import ajax from "framework/utils/ajax";
import _ from "lodash";
import native from 'framework/common/native';
import storage from 'framework/utils/storage';
import globalEventBus from 'framework/common/globalEventBus';
//卖茶二维码
export const addOrder = async (data) => {
  let success = true
  const { err, res } = await ajax.post(api.receiveTea.ADD_ORDER, data);
  if (err) {
    native.showToast(err);
    success = false;
  }
  return { success, res };
};
//新增客户
export const addCustomer = async (data) => {
  let success = true
  const { err, res } = await ajax.post(api.customer.ADD, data);
  if (err) {
    native.showToast(err);
    success = false;
  }
  return {success, res };
};
//新增商品
export const addProduct = async (data) => {
  let success = true
  const { err, res } = await ajax.post(api.codeTrade.ADD, data);
  return { success, res };
};
// 订单详情
export const orderDetail = async (data) => {
  let success = true
  const { err, res } = await ajax.get(api.receiveTea.ORDER_DETAIL, data);
  if (err) {
    native.showToast(err);
    success = false;
  }
  return {success, res };
};
//获取统计信息STATICS
export const getStatics = async () => {
  let success = true
  const { err, res } = await ajax.get(api.codeTrade.STATICS);
  if (err) {
    native.showToast(err);
    success = false;
  }
  return {success, res };
};

//获取农户订单详情
export const getOrder = async (id) => {
  let success = true
  const { err, res } = await ajax.get(api.codeRecord.DETAIL, {id});
  if (err) {
    native.showToast(err);
    success = false;
  }
  return {success, res };
};

export const setStatus = async (status, id) => {
  let success = true
  const { err, res } = await ajax.put(`${api.codeRecord.EDIT}?status=${status}&id=${id}`);
  if (err) {
    native.showToast(err);
    success = false;
  }
  return {success, res };
};

//挂单
export const pendingOrder = async (data) => {
  let success = true
  const { err, res } = await ajax.get(`${api.receiveTea.ADD_ORDER}?orderNo=${data}`);
  if (err) {
    native.showToast(err);
    success = false;
  }
  return { success, res };
};