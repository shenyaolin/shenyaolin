import request from 'utils/request';
import api from 'config/api';

// 关注
export const addSubscription = async (data) =>
    request({
        url: api.neighborhood.ADD_SUBSCRIPTION,
        data,
        method: 'post'
    })
// 新增乡邻圈
export const addNeighborhood = async (data) =>
    request({
        url: api.neighborhood.ADD_NEIGHBORHOOD,
        data,
        method: 'post'
    })
// 点赞
export const addApprove = async (data) =>
    request({
        url: api.neighborhood.ADD_APPROVE,
        data,
        method: 'post'
    })
// 朋友圈详情
export const getListDetails = async (data) =>
    request({
        url: api.neighborhood.GET_LIST_DETAILS,
        data,
        method: 'get'
    })
// 新增评论
export const addComment = async (data) =>
    request({
        url: api.neighborhood.ADD_COMMENT,
        data,
        method: 'post'
    })
