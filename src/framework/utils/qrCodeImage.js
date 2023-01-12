import finalConfig from 'framework/config';
import {setQuery} from './url';

export default (content, backGroundColor = '', lineColor = '') => {
  // const QRCODE = `${prefix}/cx-social-production/api/common/qrCode`;
  const QRCODE = `${finalConfig.apiPrefix}hydra-base-data/api/v1/common/qrCode`;
  const src = setQuery(QRCODE, {content, backGroundColor, lineColor});
  return src
}