import request from 'utils/request';
import api from 'config/api';

//获取浙农码图片
export const getZnmCode = async (data) =>
request({
  url: api.mine.znmCode,
  method: 'get',
  data
})
//通过身份证号获取卖茶信息
export const getSellerInfo = async (data) =>
request({
  url: api.sellTea.GET_SELLER_INFO,
  method: 'get',
  data
})

//获取农户信息
export const getFarmInfo = async (data) =>
request({
  url: api.mine.farmInfo,
  method: 'get',
  data
})
//编辑农户信息
export const setFarmInfo = async (data) =>
request({
  url: api.mine.farmInfo,
  method: 'post',
  data
})
//获取商户信息
export const getShopInfo = async (data) =>
request({
  url: api.mine.shopInfo,
  method: 'get',
  data
})
//编辑商户信息
export const setShopInfo = async (data) =>
request({
  url: api.mine.shopInfo,
  method: 'post',
  data
})