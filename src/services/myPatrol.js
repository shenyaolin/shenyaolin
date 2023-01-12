import request from 'utils/request';
import api from 'config/api';

// 巡检服务列表
export const goSignIn = async (data) =>
    request({
        url: api.myPatrol.GO_SIGNIN,
        data,
        method: 'post'
    })

// 巡检服务单条详情
export const getOneList = async (data) =>
    request({
        url: api.myPatrol.GET_ONE_LIST,
        data,
        method: 'get'
    })

// 巡检纪要
export const inspection = async (data) =>
    request({
        url: api.myPatrol.INSPECTION,
        data,
        method: 'post'
    })

// 获取我的巡检统计总览
export const getInspectionOverview = async (data) =>
    request({
        url: api.myPatrol.GET_INSPECTIONOVERVIEW,
        data,
        method: 'get'
    })

// 获取我的巡检统计
export const getMyInspection = async (data) =>
    request({
        url: api.myPatrol.GET_MYINSPECTION,
        data,
        method: 'get'
    })

// 获取全局巡检统计总览
export const getAllOverview = async (data) =>
    request({
        url: api.myPatrol.GET_ALLOVERVIEW,
        data,
        method: 'get'
    })

// 获取全局巡检统计
export const getAllInspection = async (data) =>
    request({
        url: api.myPatrol.GET_ALLINSPECTION,
        data,
        method: 'get'
    })
// 获取户id
export const getH5 = async (data) =>
    request({
        url: `${api.common.GET_HOUDEHOLD_ID}?code=${data}`,
        method: 'post'
    })