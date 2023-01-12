import request from "utils/request";
import api from "config/api";
import ajax from "framework/utils/ajax";
import _ from "lodash";
import native from 'framework/common/native';
import storage from 'framework/utils/storage';
import globalEventBus from 'framework/common/globalEventBus';

// 获取用户信息
export const getUserMsg = async (data) =>
  request({
    url: api.user.GET_USER_MSG,
    data,
    method: "get",
  });

//新增认证信息
export const addUser = async (data) =>
  request({
    url: api.user.ADD_USER_MSG,
    data,
    method: "post",
  });

//获取地址
export const getAddress = async (data) =>
  request({
    url: api.user.REGION,
    data,
    method: "get",
  });
