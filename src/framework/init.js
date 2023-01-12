import React from 'react';
import '@babel/polyfill/dist/polyfill.min.js';
import 'url-polyfill';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import './assets/css/global.less';
import {getParams} from 'framework/utils/url';
import storage from 'framework/utils/storage';
import device from './common/device';

//
device.init();
export default (App) => {
  const params = getParams();
  const site = params.site || '';
  storage.set('site', site);
  storage.preventClear('site');
  //
  ReactDOM.render(<App/>, document.getElementById('root'));
  serviceWorker.unregister();
};
