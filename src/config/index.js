//ajax请求前缀
export const prefix = "/apiInterface/interface";

//高德地图密钥
export const amapkey = "12fea8c7f7f0ec1a0a851b89feaf84ea";

//------------------------------------------------------------------------------------------------------------------------------------
// 是否是本地开发环境
const location = window.location;
export const isDev =
  location.href.indexOf("http://localhost") === 0 ||
  location.href.indexOf("http://192.168") === 0 ||
  location.href.indexOf("http://127.0.0.1") === 0;
// 是否是远程开发环境
export const isRemoteDev =
  location.href.indexOf(".kf315.net") >= 0 &&
  location.href.indexOf("dev-.") >= 0;
// 是否是测试环境
export const isTesting = location.href.indexOf(".kf315.net") >= 0;
// 是否是生产环境
export const isProduction = !(isDev || isTesting || isRemoteDev);

// 本地开发设置
const devConfig = {
  // // 图片上传返回值
  fileDomain: "https://filetest.jgwcjm.com",
  //视频播放域名
  videoDomain: "https://cjm3v.kf315.net",
  video1Domain: "http://filetest.jgwcjm.com",
  //组织id
  organizationId: "3bb96e2b210446cd963cd19f171b15da",
  //就业导师functionId
  jyds: "54c1ab1c223f4bcc8aa607b4ec14b825",
  //村容风貌functionId
  crfm: "0f6077528e2b466db8d9a911148d91ba",
  villageId: "ec7b6b3316714265bb9355ebb98c9c47",
  // 自然村functionId
  zrc: "a02d05718c304658984713f2ecd27aa1",
  sysId: "835a213aec464923ac0ee5e61475ad0c",
  //数字乡村
  digitalVillageHref: 'https://digitalVillage.kf315.net',
  // 图片上传返回值
  // fileDomain: "https://file.jgwcjm.com",
  // video1Domain: "http://file.jgwcjm.com",
  // //组织id
  // organizationId: "3bb96e2b210446cd963cd19f171b15da",
  // //就业导师functionId
  // jyds: "78c86e92a22b4ff38c664531c9da4b9b",
  // //村容风貌functionId
  // crfm: "48f2f9824f544bd9b7092edc1c122f3d",
  // villageId: "cec0734ce6934f308284332eef518bd8",
  // // 自然村functionId
  // zrc: "08332cd4e03f4861a7bfde0e63475cba",
  // sysId: "05427f93619a4906b65094f954e4101e",
  // //数字乡村
  // digitalVillageHref: 'https://xc.jgwcjm.com',
};
// 远程开发环境设置
const remoteDevConfig = {
  // 图片上传返回值
  fileDomain: "https://file.jgwcjm.com",
  //视频播放域名
  videoDomain: "https://cjm3v.kf315.net",
  video1Domain: "http://filetest.jgwcjm.com",
  //组织id
  organizationId: "f529aaa16b9c456aa6cf23107fd523a7",
  //就业导师functionId
  jyds: "54c1ab1c223f4bcc8aa607b4ec14b825",
  //村容风貌functionId
  crfm: "0f6077528e2b466db8d9a911148d91ba",
  villageId: "ec7b6b3316714265bb9355ebb98c9c47",
  // 自然村functionId
  zrc: "a02d05718c304658984713f2ecd27aa1",

  sysId: "835a213aec464923ac0ee5e61475ad0c",
  //数字乡村
  digitalVillageHref: 'https://digitalVillage.kf315.net',
};
// 测试环境设置（单域名）
const testConfig = {
  // 图片上传返回值
  fileDomain: "https://filetest.jgwcjm.com",
  //视频播放域名
  videoDomain: "https://cjm3v.kf315.net",
  video1Domain: "http://filetest.jgwcjm.com",
  //组织id
  organizationId: "f529aaa16b9c456aa6cf23107fd523a7",
  //就业导师functionId
  jyds: "54c1ab1c223f4bcc8aa607b4ec14b825",
  //村容风貌functionId
  crfm: "0f6077528e2b466db8d9a911148d91ba",
  villageId: "ec7b6b3316714265bb9355ebb98c9c47",
  // 自然村functionId
  zrc: "a02d05718c304658984713f2ecd27aa1",
  sysId: "835a213aec464923ac0ee5e61475ad0c",
  //数字乡村
  digitalVillageHref: 'https://digitalVillage.kf315.net',
};
// 生产环境测试系统
// const productionConfig = {
//   // 图片上传返回值
//   fileDomain: "https://file.jgwcjm.com",
//   video1Domain: "http://file.jgwcjm.com",
//   //组织id
//   organizationId: "9fc2791b52d644e5835c70f5a11cbdb2",
//   //就业导师functionId
//   jyds: "78c86e92a22b4ff38c664531c9da4b9b",
//   //村容风貌functionId
//   crfm: "48f2f9824f544bd9b7092edc1c122f3d",
//   villageId: "f128c51bd30843c79727382846236b33",
//   // 自然村functionId
//   zrc: "08332cd4e03f4861a7bfde0e63475cba",
//   sysId: "61d9b25576d14a00ba935814a140d901",
//   //数字乡村
//   digitalVillageHref: 'https://xc.jgwcjm.com',
// };
// 生产环境设置
const productionConfig = {
  // 图片上传返回值
  fileDomain: "https://file.jgwcjm.com",
  video1Domain: "http://file.jgwcjm.com",
  //组织id
  organizationId: "3bb96e2b210446cd963cd19f171b15da",
  //就业导师functionId
  jyds: "78c86e92a22b4ff38c664531c9da4b9b",
  //村容风貌functionId
  crfm: "48f2f9824f544bd9b7092edc1c122f3d",
  villageId: "cec0734ce6934f308284332eef518bd8",
  // 自然村functionId
  zrc: "08332cd4e03f4861a7bfde0e63475cba",
  sysId: "05427f93619a4906b65094f954e4101e",
  //数字乡村
  digitalVillageHref: 'https://xc.jgwcjm.com',
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
const finalConfig = { ...config };
export default finalConfig;
//------------------------------------------------------------------------------------------------------------------------------------
