import {getSDK} from 'framework/services/weixin';

let hasConfig = false;
let isSuccess = false;
const jsApiList = ['scanQRCode'];
export default () => {
  return new Promise(async resolve => {
    if (isSuccess) { //配置成功了
      resolve(true);
      return;
    }
    if (!hasConfig) { //已经配置过
      hasConfig = true;
    }
    const data = {url: window.location.href.split('/#/')[0]};
    const res = await getSDK(data);
    if (res) {
      window.wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: res.appId, // 必填，公众号的唯一标识
        timestamp: res.timestamp, // 必填，生成签名的时间戳
        nonceStr: res.nonceStr, // 必填，生成签名的随机串
        signature: res.signature,// 必填，签名，见附录1
        jsApiList // 必填，需要使用的JS接口列表，这里只说扫描，例如分享等都可以，只要写在数组里面就可以调用
      });
      const wx = window.wx;
      //授权不通过
      wx.error(function (res) {
        console.error(res);
        resolve(false);
      });
      //授权通过
      wx.ready(function () {
        resolve(true);
        isSuccess = true;
      });
    } else {
      resolve(false);
    }
  });
};
