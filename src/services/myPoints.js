import request from 'utils/request';
import api from 'config/api';

// 签到
export const addSign = async (data) =>
    request({
        url: api.myPoints.ADD_SIGN,
        data,
        method: 'post'
    })

// 查询签到情况(7天)
export const getSign = async (data) =>
    request({
        url: api.myPoints.GET_SIGN,
        data,
        method: 'post'
    })

// 查询当月签到情况
export const getMonthSign = async (data) =>
    request({
        url: api.myPoints.GET_MONTH_SIGN,
        data,
        method: 'post'
    })

// 查询当月签到情况
export const getScoreRank = async (data) =>
    request({
        url: api.myPoints.GET_SCORE_RANK,
        data,
        method: 'get'
    })

// 获取商品详情
export const getProductDetails = async (data) =>
    request({
        url: api.myPoints.GET_PRODUCT_DETAILS,
        data,
        method: 'get'
    })

// 兑换商品
export const addExchange = async (data) =>
    request({
        url: api.myPoints.ADD_EXCHANGE,
        data,
        method: 'post'
    })

// 获取兑换详情信息
export const getExchange = async (data) =>
    request({
        url: api.myPoints.GET_EXCHANGE,
        data,
        method: 'get'
    })

// 新增积分
export const addPoints = async (data) =>
    request({
        url: api.myPoints.ADD_POINTS,
        data,
        method: 'post'
    })

// 兑换商品确认
export const redeemExchange = async (data) =>
    request({
        url: api.myPoints.REDEEM_EXCHANGE,
        data,
        method: 'get'
    })

// 兑换商品确认
export const getCheckExchange = async (data) =>
    request({
        url: api.myPoints.GET_CHECK_EXCHANGE,
        data,
        method: 'get'
    })

// 获取总积分
export const getTotalScore = async (data) =>
    request({
        url: api.myPoints.GET_TOTAL_SCORE,
        data,
        method: 'get'
    })

