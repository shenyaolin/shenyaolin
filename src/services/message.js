import request from "utils/request";
import api from "config/api";

// 新增随手拍
export const getList = async (data) =>
  request({
    url: api.myMessage.list.LIST, 
    data,
    method: "get",
  });
export const getVillList = async (data) =>
  request({
    url: api.myMessage.list.VILL_LIST, 
    data,
    method: "get",
  });
