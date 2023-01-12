import {
  isWxMiniProgram,
  isWxBrowser
} from 'framework/config';
import weixinConfig from 'framework/common/weixinConfig';
import _ from 'lodash';

export const weixinScanQRCode = function (isReturnObj) {
  return new Promise(async resolve => {
    const isWx = true;
    const configSuccess = await weixinConfig();
    if (configSuccess) {
      window.wx.scanQRCode({
        needResult: 1,
        desc: 'scanQRCode desc',
        success: function (res) {
          console.log(res)
          const resultStr = res.resultStr;
          const oneCode = resultStr.indexOf('CODE_128,') > -1 ? resultStr.split(',') : [];
          const outerCodeId = oneCode.length > 1 ? oneCode[1] : resultStr.split('/').pop() || '';
          isReturnObj ? resolve({ res: resultStr, outerCodeId, isWx }) : resolve(resultStr);
        },
        fail: function () {
          resolve(isReturnObj ? { isWx } : '');
        },
        complete: function (res) {
          const errMsg = _.get(res, 'errMsg') || '';
          if (errMsg.indexOf('cancel') >= 0) { //取消
            resolve(isReturnObj ? { isWx } : '');
          }
        }
      });
    } else {
      console.log('fail2')
      resolve(isReturnObj ? { isWx } : '');
    }
  });
};

export const androidScanQRCode = function () {
  console.log('android')
  return new Promise(resolve => {
    const now = Date.now();
    const rd = Math.floor(Math.random() * 99999);
    const callbackName = `scanQRCode_${now}_${rd}`;
    window[callbackName] = function (result) {
      resolve(result);
    };
    window.native.showCapture(callbackName);
  });
};
//
export const iosScanQRCode = function () {
  return new Promise(resolve => {
    const now = Date.now();
    const rd = Math.floor(Math.random() * 99999);
    const callbackName = `scanQRCode_${now}_${rd}`;
    window[callbackName] = function (result) {
      resolve(result);
    };
    window.webkit.messageHandlers.scanCode.postMessage(JSON.stringify({
      callback: callbackName
    }));
  });
};



//品品香pos回调
export const posScanQRCode = function () {
  return new Promise(resolve => {
    const callbackName = `onScanResult`;
    window[callbackName] = function (result) {
      // return(result);
      resolve(result);
    };
    window.native.scanBack();
  });
};

//品品香pos后置摄像头
export const scanBack = async () => {
  let result = '';
  if (_.get(window, 'native.scanBack')) { //pos机
    result = await posScanQRCode();
  }
  return result;
}
//品品香pos打印回调Finish
export const posPrintQRCode = function () {
  return new Promise((resolve, reject) => {
    window['onPinPinXiangFinish'] = function (result) {
      // return(result);
      // console.log(result)
      resolve(result);
    };
    window['onPinPinXiangError'] = function (code, msg) {
      // return(result);
      console.log('code', code)
      console.log('msg', msg)
      reject(code, msg);
    };
    window.native.confirmPrint();
  });
};

//品品香打印小票
export const confirmPrint = async () => {
  let result = '';
  if (_.get(window, 'native.confirmPrint')) { //pos机
    result = await posPrintQRCode();
  }
  return result;
}

// 调用扫一扫 返回扫码结果
export default async (isReturnObj) => {
  let result = '';
  if (isWxMiniProgram() || isWxBrowser()) { //微信小程序或者微信浏览器
    result = await weixinScanQRCode(isReturnObj);
  } else {
    if (_.get(window, 'native.showCapture')) { //安卓
      result = await androidScanQRCode();
    } else if (_.get(window, 'webkit.messageHandlers.scanCode.postMessage')) { //ios
      // console.log('iosScanQRCode');
      result = await iosScanQRCode();
      console.log(result)
    }
  }
  return result;
}