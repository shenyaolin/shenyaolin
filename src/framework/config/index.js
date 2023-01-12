// import getCustomerConfig from 'public/customerConfig/index.js';

//ajax请求前缀
export const prefix = '/apiInterface/interface';

// //高德地图密钥
// export const amapkey = '12fea8c7f7f0ec1a0a851b89feaf84ea';

//判断是否是微信小程序
export const isWxMiniProgram = (() => {
  let result = false;
  window.wx.miniProgram.getEnv(function (res) {
    result = res.miniprogram;
  });
  return () => {
    return result;
  };
})();

// 判断是否是微信打开
export const isWxBrowser = () => {
  const ua = navigator.userAgent.toLowerCase();
  if (ua.match(/MicroMessenger/i) == 'micromessenger') {
    return true;
  }
}

// //------------------------------------------------------------------------------------------------------------------------------------
// 是否是本地开发环境
export const isDev =
  window.location.href.indexOf('http://localhost') === 0 ||
  window.location.href.indexOf('http://192.168') === 0 ||
  window.location.href.indexOf('http://127.0.0.1') === 0;
// 是否是远程开发环境
export const isRemoteDev = window.location.href.indexOf('.kf315.net') >= 0 && window.location.href.indexOf('dev-.') >= 0;
// 是否是测试环境
export const isTesting =
  (window.location.href.indexOf('epidemic-test-mobile-website-h5') >= 0) ||
  (window.location.href.indexOf('test-mobile-website-h5') >= 0) ||
  (window.location.href.indexOf('test-51work-xcx') >= 0) ||
  (window.location.href.indexOf('test-minjian-xcx') >= 0) ||
  (!isRemoteDev && window.location.href.indexOf('.kf315.net') >= 0);
// 是否是生产环境
export const isProduction = !(isDev || isRemoteDev || isTesting);
// 本地开发设置
const devConfig = {
  // 单点登录iframe的src
  ssoSrc: 'http://192.168.10.129:7070/#/frame/user/login',
  // 图片上传返回值
  fileDomain: 'https://filetest.jgwcjm.com',
  // fileDomain: 'https://file.jgwcjm.com',
  //视频播放域名
  videoDomain: 'https://cjm3v.kf315.net',
  // 二维码请求前缀
  apiPrefix: 'http://192.168.20.177:15001/',
  //支付回调
  redirectUrl: "http://localhost:3000/#/receiveRecord"
};
// 远程开发环境设置
const remoteDevConfig = {
  // 单点登录iframe的src
  ssoSrc: 'http://dev-user.center.kf315.net/#/frame/user/login',
  // 图片上传返回值
  fileDomain: 'https://file.jgwcjm.com',
  //视频播放域名
  videoDomain: 'https://cjm3v.kf315.net',
  // 二维码请求前缀
  apiPrefix: 'http://192.168.20.177:15001/',
  //支付回调
  redirectUrl: "http://freedom-h5.xinchang.kf315.net/app/#/receiveRecord"
};
// 测试环境设置
const testConfig = {
  // 单点登录iframe的src
  ssoSrc: 'http://user.center.kf315.net/#/frame/user/login',
  // 图片上传返回值
  fileDomain: 'https://filetest.jgwcjm.com',
  //视频播放域名
  videoDomain: 'https://cjm3v.kf315.net',
  // 二维码请求前缀
  apiPrefix: 'http://xinchang.kf315.net/apiInterface/interface/',
  //支付回调
  redirectUrl: "http://freedom-h5.xinchang.kf315.net/app/#/receiveRecord"
};
// 生产环境设置
const productionConfig = {
  // 单点登录iframe的src
  ssoSrc: 'http://login.jgwcjm.com/#/frame/user/login',
  // 图片上传返回值
  fileDomain: 'https://file.jgwcjm.com',
  // fileDomain: "https://ccy.zjxc.gov.cn/oss",
  //视频播放域名
  videoDomain: 'https://cjm3v.jgwcjm.com',
  // 二维码请求前缀
  apiPrefix: 'https://ccy.zjxc.gov.cn/apiInterface/interface/',
  redirectUrl: "https://ccy.zjxc.gov.cn/Individualization/app/#/home"
};
//
let config = {};
if (isDev) {
  config = devConfig;
} else if (isRemoteDev) {
  config = remoteDevConfig;
} else if (isTesting) {
  config = testConfig;
} else if (isProduction) {
  config = productionConfig;
}
// const customerConfig = getCustomerConfig();
// const finalConfig = { ...config, ...customerConfig };
const finalConfig = { ...config };
export default finalConfig;
//------------------------------------------------------------------------------------------------------------------------------------