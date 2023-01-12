import ajax from 'framework/utils/ajax';
import api from 'framework/config/api';
import storage from 'framework/utils/storage';
import _ from 'lodash';
//
//加载用户信息(如果本地有保存,直接返回,没有就加载后保存到本地)
export const loadUserDetail = async () => {
  let localUserDetail = storage.get('localUserDetail');
  if (!localUserDetail) {
    const userDetail = await loadRemoteUserDetail();
    localUserDetail = userDetail;
    storage.set('localUserDetail', localUserDetail);
  }
  return localUserDetail;
};
export const reloadUserDetail = async () => {
  const localUserDetail = await loadRemoteUserDetail();
  storage.set('localUserDetail', localUserDetail);
  return localUserDetail;
};
//加载用户信息
export const loadRemoteUserDetail = async () => {
  const [baseResult, detailResult, bannerResult] = await Promise.all([
    await ajax.get(api.user.getBaseInfo),
    await ajax.get(api.user.getDetailInfo),
    await ajax.get(api.user.getBanner)
  ]);
  const baseInfo = _.get(baseResult, 'res.results') || {};
  const detailInfo = _.get(detailResult, 'res.results') || {};
  const bannerInfo = _.get(bannerResult, 'res.results') || {};
  storage.set('userLoadTime', Date.now());
  return {...baseInfo, ...detailInfo, bannerInfo};
};
//退出登录
export const logout = async () => {
  storage.clear();
  localStorage.setItem('super-token', '');
  await ajax.get(api.user.logout);
};