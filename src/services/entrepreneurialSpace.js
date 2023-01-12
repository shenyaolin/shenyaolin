import request from 'utils/request';
import api from 'config/api';

// 新增预约
export const addRecord = async (data) =>
    request({
        url: api.entrepreneurialSpace.ADD_RECORD,
        data,
        method: 'post'
    })
// 新增预约
export const getRecordDetail = async (data) =>
    request({
        url: api.entrepreneurialSpace.GET_RECORD_Deatail,
        data,
        method: 'get'
    })