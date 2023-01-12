import request from "utils/request";
import api from "config/api";


export const edit = async (data) =>
    request({
        url: api.myDetail.EDIT,
        data,
        method: "post",
    });
