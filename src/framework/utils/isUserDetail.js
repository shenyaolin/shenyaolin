import storage from 'framework/utils/storage';
import { wxPushUrl } from "framework/utils/url";

// 分享后，发生页面跳转，看用户是否授权或登录
export const authorization = () => {
  const userType = storage.get('userType');
  const userDetail = storage.get('userDetail');
  if(userType == 2){ // 需求方
    if(!userDetail){
      window.wx.miniProgram.redirectTo({ url: `../authorization/index?url=${window.location.href}` });
      return false;
    } else{
      return true;
    }
  } else{
    if(!userDetail){
      wxPushUrl({ pathname: '/login' });
      return false;
    } else{
      return true;
    }
  }
}