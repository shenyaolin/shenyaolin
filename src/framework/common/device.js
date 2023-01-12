import plusready from './plusready';
import { getRouterInfo } from 'framework/utils/url';
import createStore from 'framework/utils/createStore';

const searchPageStore = createStore('searchPageStore');

let backCallback = [];
export const onBack = (callback) => {
  backCallback.push(callback);
};
export const offBack = (callback) => {
  backCallback = backCallback.filter(item => item !== callback);
};

const device = {
  init() {
    plusready(() => {
      plus.key.addEventListener('backbutton', function () {
        //
        if (backCallback.length > 0) {
          backCallback.forEach(cbk => {
            cbk();
          });
        } else {
          const { pathname } = getRouterInfo();
          if (pathname === '/main/index') {
            const ws = plus.webview.getWebviewById('appid');
            plus.webview.close(ws);
            if (ws == null) {
              plus.runtime.quit();
            }
            // searchPageStore.eventBus.emit('back');
          } else {
            history.back();
          }
        }
      }, false);
    });
  },
};

export default device;