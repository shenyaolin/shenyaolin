const isMobile = () => {
  //判断设备
  const sUserAgent = navigator.userAgent.toLowerCase();
  const bIsIpad = String(sUserAgent.match(/ipad/i)) === 'ipad';
  const bIsIphoneOs = String(sUserAgent.match(/iphone os/i)) === 'iphone os';
  const bIsMidp = String(sUserAgent.match(/midp/i)) === 'midp';
  const bIsUc7 = String(sUserAgent.match(/rv:1.2.3.4/i)) === 'rv:1.2.3.4';
  const bIsUc = String(sUserAgent.match(/ucweb/i)) === 'ucweb';
  const bIsAndroid = String(sUserAgent.match(/android/i)) === 'android';
  const bIsCE = String(sUserAgent.match(/windows ce/i)) === 'windows ce';
  const bIsWM = String(sUserAgent.match(/windows mobile/i)) === 'windows mobile';
  if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
    return true;
  } 
  return false;
}

export default isMobile;