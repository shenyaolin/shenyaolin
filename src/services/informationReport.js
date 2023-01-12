import request from 'utils/request';
import api from 'config/api';

// 新增信息上报
export const addMessageReport = async (data) =>
    request({
        url: api.informationReport.ADD_MESSAGE_REPORT,
        data,
        method: 'post'
    })

// 获取详情
export const getListDetail = async (data) =>
    request({
        url: api.informationReport.GET_LIST_DETAILS,
        data,
        method: 'get'
    })

// 评价
export const addEvaluation = async (data) =>
    request({
        url: api.informationReport.ADD_EVALUATION,
        data,
        method: 'post'
    })