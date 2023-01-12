import {isWxMiniProgram} from 'framework/config';

export default (docUrl) => {
  if (isWxMiniProgram()) {
    wx.miniProgram.navigateTo({url: `/document/index?docUrl=${encodeURIComponent(docUrl)}`});
  }
}