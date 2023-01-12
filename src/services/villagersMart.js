import request from "utils/request";
import api from "config/api";

// 获取景点
export const getAttractions = async (data) =>
  request({
    url: api.villagersMart.GET_LIST,
    data,
    method: "get",
  }); 
// 获取我家宝贝
export const getTreasure = async (data) =>
  request({
    url: api.villagersMart.GET_VILLAGE_TREASURE_LIST,
    data,
    method: "get",
  });
  // 获取酒店农家乐
  export const getHotel = async (data) =>
  request({
    url: api.villagersMart.GET_HOTEL_LIST,
    data,
    method: "get",
  });