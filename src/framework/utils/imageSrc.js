import config from 'framework/config';

let defaultConfig = 'imageView2/2/w/800';

export function setDefaultImageConfig(newDefaultConfig) {
  defaultConfig = newDefaultConfig;
}

export default (imgId, fileDomain = config.fileDomain, qiniuConfig) => {
  if (typeof imgId === 'string') {
    return imgId.indexOf('http') >= 0 ? imgId : `${fileDomain}/${imgId}?${qiniuConfig || defaultConfig}`;
  }
  return '';
}
