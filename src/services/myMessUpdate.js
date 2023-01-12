import request from "utils/request";
import api from "config/api";


export const picUpdate = async (data) =>
    request({
        url: api.myMessage.takePicMess.UPDATE,
        data,
        method: "post",
    });
export const picList = async (data) =>
    request({
        url: api.myMessage.takePicMess.LIST,
        data,
        method: "get",
    });
export const reportUpdate = async (data) =>
    request({
        url: api.myMessage.reportMess.UPDATE,
        data,
        method: "post",
    });
export const reportList = async (data) =>
    request({
        url: api.myMessage.reportMess.LIST,
        data,
        method: "get",
    });
export const spaceUpdate = async (data) =>
    request({
        url: api.myMessage.buSpaceMess.UPDATE,
        data,
        method: "post",
    });
export const spaceList = async (data) =>
    request({
        url: api.myMessage.buSpaceMess.LIST,
        data,
        method: "get",
    });
export const spaceVillList = async (data) =>
    request({
        url: api.myMessage.buSpaceMess.VILL_LIST,
        data,
        method: "get",
    });
export const secreUpdate = async (data) =>
    request({
        url: api.myMessage.secreMess.UPDATE,
        data,
        method: "post",
    });
export const secreList = async (data) =>
    request({
        url: api.myMessage.secreMess.LIST,
        data,
        method: "get",
    });
export const secreVillList = async (data) =>
    request({
        url: api.myMessage.secreMess.VILL_LIST,
        data,
        method: "get",
    });
export const userUpdate = async (data) =>
    request({
        url: api.user.UPDATE,
        data,
        method: "post",
    });
