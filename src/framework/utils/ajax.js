/* eslint-disable */
import { prefix } from "framework/config";
import getCookie from "./getCookie";
import globalEventBus from "framework/common/globalEventBus";
import axios from "axios";
import _ from "lodash";
import native from "framework/common/native";
import storage from "framework/utils/storage";
import { wxPushUrl } from "framework/utils/url";

//
function urlFix(url) {
  return url.indexOf("/interface") === 0
    ? `/apiInterface${url}`
    : `/apiInterface/interface${url}`;
}

function ajaxComplateHandler(result) {
  globalEventBus.emit("ajaxComplate", result);
  return result;
}

async function getSuperToken(url) {
  let token = _.get(getCookie(), "userId");
  if (url.includes("token")) {
    let index = url.indexOf("=");
    let value = url.substring(index + 1, url.length);
    token = value;
  } else {
    if (!token) {
      token = storage.get("userId");
    }
    if (!token) {
      if (native.getToken) {
        token = await native.getToken();
      }
    }
  }
  return token;
}

async function getDefaultHeader(url) {
  // const superToken = await getSuperToken(url);
  const superToken = storage.get("userId");
  const isDev = window.location.href.indexOf("localhost") >= 0;
  let headerInfo = {};
  if (isDev) {
    headerInfo = { "userId": superToken, whitelist: "localhost" };
  } else {
    headerInfo = { "userId": superToken };
  }
  return headerInfo;
}
//
export default {
  request(method = "get", url, params = {}, headers) {
    return new Promise(async (resolve) => {
      const options = { method };
      options.url = urlFix(url);
      const defaultHeader = await getDefaultHeader(url);
      options.headers = headers
        ? { ...headers, ...defaultHeader }
        : { ...defaultHeader };
      if (["post", "put"].includes(method)) {
        options.data = params;
      } else {
        options.params = params;
      }
      // console.log(options);
      let result = { err: null, res: null };
      axios(options)
        .then((res) => {
          result.res = _.get(res, "data");
          if (_.get(result, "res.state") != 200) {
            result.err = new Error(_.get(result, "res.msg"));
            if (_.get(result, "res.state") == 401) {
              window.wx.miniProgram.redirectTo({
                url: "../authorize/index",
              });
            }
          }
          resolve(ajaxComplateHandler(result));
        })
        .catch((err) => {
          result.err = err;
          resolve(ajaxComplateHandler(result));
        });
    });
  },
  get(url, params, headers) {
    return this.request("get", url, params, headers);
  },
  post(url, params, headers) {
    return this.request("post", url, params, headers);
  },
  put(url, params, headers) {
    return this.request("put", url, params, headers);
  },
  del(url, params, headers) {
    return this.request("delete", url, params, headers);
  },
  formPost(url, params, headers) {
    const data = new FormData();
    Object.keys(params).forEach((key) => {
      data.append(key, params[key]);
    });
    return this.request("post", url, data, headers);
  },
};
