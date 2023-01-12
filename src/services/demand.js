/*
 * @Descripttion: 
 * @version: 
 * @Author: yinzi
 * @Date: 2021-11-01 19:17:40
 * @LastEditors: yinzi
 * @LastEditTime: 2021-11-01 19:17:40
 */
import request from 'utils/request';
import api from 'config/api';

// 用工需求列表
export const getList = async (data) =>
  request({
    url: api.demand.LIST,
    method: 'get',
    data
  })
  // 用工需求详情
export const getDetail = async (data) =>
  request({
    url: api.demand.DETAIL,
    method: 'get',
    data
  })
  // 接单
export const order = async (data) =>
  request({
    url: api.demand.ORDER,
    method: 'post',
    data
  })
  // 增改删
export const opt = async (data, method = 'get') =>
  request({
    url: api.demand.OPT,
    method,
    data
  })