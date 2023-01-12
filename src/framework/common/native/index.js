import getGlobalInfo from './getGlobalInfo';
import showToast from './showToast';
import getTitleText from './getTitleText';
import setTitleText from './setTitleText';
import fileChoose from './fileChoose';
import uploadFiles from './uploadFiles';
//
const sNative = {getGlobalInfo, showToast, getTitleText, setTitleText, fileChoose, uploadFiles};
sNative.isApp = () => false;
if (window.native) {
  const native = window.native;
  const callAliPayCallBackName = `callAliPayCallBack_${Math.floor(Math.random() * 999999)}`;
  // android
  sNative.isApp = () => true;
  sNative.getToken = async () => native.getToken && native.getToken();
  sNative.getTokenUseless = async () => native.getTokenUseless && native.getTokenUseless();
  sNative.showToast = (msg) => native.showToast && native.showToast(msg);
  sNative.printTag = (width, height, imageUrl) => native.printTag && native.printTag(width, height, imageUrl);
  sNative.jumpBluetoothSetting = () => native.jumpBluetoothSetting && native.jumpBluetoothSetting();
  sNative.setPageTitle = (title) => native.setPageTitle && native.setPageTitle(title);
  sNative.getFunctionPowers = (module) => native.getFunctionPowers && native.getFunctionPowers(module);
  sNative.callNetApi = (name, param) => native.callNetApi && native.callNetApi(name, param);
  sNative.callAliPayCallBack = (orderStr) => native.callAliPayCallBack && native.callAliPayCallBack(callAliPayCallBackName, orderStr);
  sNative.getGeTuiCid = () => native.getGeTuiCid && native.getGeTuiCid();
}
if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.getToken) { // iOS 
  sNative.isApp = () => true;
  sNative.getToken = () => {
    return new Promise(resolve => {
      const callbackName = `iosCallback_${Math.floor(Math.random() * 999999)}`;
      window[callbackName] = (token) => {
        resolve(token);
      };
      if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.getToken && window.webkit.messageHandlers.getToken.postMessage) {
        window.webkit.messageHandlers.getToken.postMessage(JSON.stringify({callback: callbackName, args: []}));
      }
    });
  };
  sNative.getTokenUseless = () => {
    return new Promise(resolve => {
      const callbackName = `iosCallback_${Math.floor(Math.random() * 999999)}`;
      window[callbackName] = () => {
        resolve();
      };
      if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.getTokenUseless && window.webkit.messageHandlers.getTokenUseless.postMessage) {
        window.webkit.messageHandlers.getTokenUseless.postMessage(JSON.stringify({callback: callbackName, args: []}));
      }
    });
  };
  sNative.showToast = (msg) => {
    let callbackName;
    if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.showToast && window.webkit.messageHandlers.showToast.postMessage) {
      window.webkit.messageHandlers.showToast.postMessage(JSON.stringify({callback: callbackName, args: [msg + '']}));
    }
  };
  sNative.closePage = () => {
    return new Promise(resolve => {
      const callbackName = `iosCallback_${Math.floor(Math.random() * 999999)}`;
      window[callbackName] = () => {
        resolve();
      };
      if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.closeWebview && window.webkit.messageHandlers.closeWebview.postMessage) {
        window.webkit.messageHandlers.closeWebview.postMessage(JSON.stringify({callback: callbackName, args: []}));
      }
    });
  };
  // 打印小票
  /*
  * msg: 图片的url地址
  * width: 小票纸的宽度
  * height:
  */ 
  sNative.printTag = (width, height, msg) => {
    return new Promise(resolve => {
      const callbackName = `iosCallback_${Math.floor(Math.random() * 999999)}`;
      window[callbackName] = (succeed) => {
        resolve(succeed);
      };
      if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.printTag && window.webkit.messageHandlers.printTag.postMessage) {
        window.webkit.messageHandlers.printTag.postMessage(JSON.stringify({callback: callbackName, args: [msg + '', width + '', height + '']}));
      }
    });
  };
  // 显示蓝牙设备列表
  sNative.jumpBluetoothSetting = () => {
    return new Promise(resolve => {
      const callbackName = `iosCallback_${Math.floor(Math.random() * 999999)}`;
      window[callbackName] = () => {
        resolve();
      };
      if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.jumpBluetoothSetting && window.webkit.messageHandlers.jumpBluetoothSetting.postMessage) {
        window.webkit.messageHandlers.jumpBluetoothSetting.postMessage(JSON.stringify({callback: callbackName, args: []}));
      }
    });
  };
  // 设置标题栏
  sNative.setPageTitle = (title) => {
    return new Promise(resolve => {
      const callbackName = `iosCallback_${Math.floor(Math.random() * 999999)}`;
      window[callbackName] = () => {
        resolve();
      };
      if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.setPageTitle && window.webkit.messageHandlers.setPageTitle.postMessage) {
        window.webkit.messageHandlers.setPageTitle.postMessage(JSON.stringify({callback: callbackName, args: [title]}));
      }
    });
  };
  // 获取APP的功能权限
  sNative.getFunctionPowers = moduleName => {
    return new Promise(resolve => {
      const callbackName = `iosCallback_${Math.floor(Math.random() * 999999)}`;
      window[callbackName] = (powers) => {
        powers = parseFloat(powers);
        resolve(powers);
      };
      if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.getFunctionPowers && window.webkit.messageHandlers.getFunctionPowers.postMessage) {
        window.webkit.messageHandlers.getFunctionPowers.postMessage(JSON.stringify({callback: callbackName, args: [moduleName]}));
      }
    });
  };
  // 调用APP端实现的网络接口请求
  sNative.callNetApi = (name, param) => {
    return new Promise(resolve => {
      const callbackName = `iosCallback_${Math.floor(Math.random() * 999999)}`;
      window[callbackName] = (data) => {
        resolve(data);
      };
      if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.callNetApi && window.webkit.messageHandlers.callNetApi.postMessage) {
        window.webkit.messageHandlers.callNetApi.postMessage(JSON.stringify({callback: callbackName, args: [name, param]}));
      }
    });
  };
  // ios 支付宝支付  param: orderStr
  sNative.callAliPayCallBack = (orderStr) => {
    return new Promise(resolve => {
      const callbackName = `callAliPayCallBack_${Math.floor(Math.random() * 999999)}`;
      window[callbackName] = (data) => {
        resolve(data);
      };
      if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.callAliPayCallBack && window.webkit.messageHandlers.callAliPayCallBack.postMessage) {
        window.webkit.messageHandlers.callAliPayCallBack.postMessage(JSON.stringify({callback: callbackName, args: [orderStr]}));
      }
    })
  };
  // 获取个推cid
  sNative.getGeTuiCid = () => {
    return new Promise(resolve => {
      const callbackName = `getGeTuiCid_${Math.floor(Math.random() * 999999)}`;
      window[callbackName] = (data) => {
        resolve(data);
      };
      if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.getGeTuiCid && window.webkit.messageHandlers.getGeTuiCid.postMessage) {
        window.webkit.messageHandlers.getGeTuiCid.postMessage(JSON.stringify({callback: callbackName, args: []}));
      }
    });
  };
}
export default sNative
