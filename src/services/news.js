/*
 * @Descripttion:
 * @version:
 * @Author: yinzi
 * @Date: 2021-11-01 19:16:41
 * @LastEditors: yinzi
 * @LastEditTime: 2022-04-18 18:30:45
 */
import request from "utils/request";
import api from "config/api";

// 获取消息列表
export const newsListGet = async (data) =>
  request({
    url: api.news.LIST,
    data,
    method: "get",
  });

// 获取创业政策
export const entrepreneurshipPolicyDetail = async (data) =>
  request({
    url: api.entrepreneurshipPolicy.GET_LIST_DETAILS,
    data,
    method: "get",
  });

// 获取村贤事迹
export const famousVillagerDetail = async (data) =>
  request({
    url: api.famousVillager.GET_LIST_DETAILS,
    data,
    method: "get",
  });

// 获取美丽庭院详情
export const beautifulYardDetail = async (data) =>
  request({
    url: api.beautifulYard.GET_LIST_DETAILS,
    data,
    method: "get",
  });

// 获取我的庭院详情
export const getMyGarden = async (data) =>
  request({
    url: api.myGarden.GET_MY_GARDEN,
    data,
    method: "get",
  });

//获取地址
export const getAddress = async (data) =>
  request({
    url: api.user.REGION,
    data,
    method: "get",
  });

