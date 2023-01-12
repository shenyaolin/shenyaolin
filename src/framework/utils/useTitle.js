/*
 * @Author: xutengfeng 
 * @Date: 2019-08-12 14:31:34 
 * @Last Modified by: xutengfeng
 * @Last Modified time: 2019-08-27 19:50:21
 */

import { useEffect } from 'react';

export default function useTitle(title = '') {
  useEffect(() => {
    setTimeout(() => {
      //利用iframe的onload事件刷新页面
      let titleEl = document.getElementsByTagName('title')[0];
      titleEl.innerText = title;
      let iframe = document.createElement('iframe');
      iframe.style.visibility = 'hidden';
      iframe.style.width = '1px';
      iframe.style.height = '1px';
      iframe.onload = function () {
        setTimeout(function () {
          document.body.removeChild(iframe);
        }, 0);
      };
      document.body.appendChild(iframe);
    }, 0);
    return () => {
      document.title = '';
    };
  }, [title]);
}