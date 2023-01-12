/* eslint-disable */
import storage from './storage';
//
const INTERVAL_TIMES = 60000; // 2次发送验证码的最少间隔时间  60秒
//发送短信验证码
export const sendCode = async (mobile) => {
  storage.set('sendCodeTime', Date.now());
};

//获取上次发送验证码的时间
export const getLastSendTime = () => {
  return storage.get('sendCodeTime') || 0;
};

//获取多少秒后可以再次发送验证码,如果是负数,表示马上就可以发送
export const getSendSeconds = () => {
  const now = Date.now();
  return Math.ceil((INTERVAL_TIMES - (now - getLastSendTime())) / 1000);
};