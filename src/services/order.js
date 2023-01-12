import request from 'utils/request';
import api from 'config/api';

// 添加订单
export const orderAdd = async data =>
  request({
    url: api.order.ADD,
    data,
    method: 'post'
  })

// 前端收到支付成功后调接口
export const orderPayBack = async data =>
  request({
    url: api.order.PAY_BACK,
    data,
    method: 'post'
  })

// 获取订单列表
export const orderListGet = async data =>
  request({
    url: api.order.LIST,
    data,
    method: 'get'
  })

// 获取订单详情
export const orderDetailGet = async data =>
  request({
    url: api.order.DETAIL,
    data,
    method: 'get'
  })

// 合并支付
export const orderAllPay = async data =>
  request({
    url: api.order.PAY_ALL,
    data,
    method: 'post'
  })
