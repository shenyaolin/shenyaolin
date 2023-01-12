import uuid from 'framework/utils/uuid';
import api from 'framework/config/api';
import {prefix} from 'framework/config';
import imageSrc from 'framework/utils/imageSrc';
import ajax from './ajax';
import _ from 'lodash';
import native from 'framework/common/native';

let fileChoose = null;

function init({uploadUrl, query}) {
  if (fileChoose) {
    return;
  }
  const createForm = function (iframeName, key) {
    const form = document.createElement('form');
    form.setAttribute('target', iframeName);
    form.setAttribute('method', 'post');
    form.setAttribute('encType', 'multipart/form-data');
    form.setAttribute('action', `${prefix}${api.fileUpload.upload}`);
    form.innerHTML = `<input type="hidden" name="name" value="file.png"/>`;
    return form;
  };

  const createIframe = function (iframeName) {
    const iframe = document.createElement('iframe');
    iframe.setAttribute('name', iframeName);
    return iframe;
  };

  const createInput = function (key = 'file') {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.setAttribute('name', key);
    // input.setAttribute('multiple', 'multiple');
    return input;
  };

  fileChoose = (count, extnames, callback, beforeUpload, afterUpload) => {
    const div = document.createElement('div');
    div.setAttribute('class', 'disn');
    const iframeName = `iframe-${uuid()}`;
    const form = createForm(iframeName, query);
    const iframe = createIframe(iframeName);
    const input = createInput(query);
    document.body.appendChild(div);
    div.appendChild(form);
    div.appendChild(iframe);
    form.appendChild(input);
    input.onchange = () => {
      const formData = new FormData(form);
      beforeUpload && beforeUpload();
      ajax.post(uploadUrl || api.fileUpload.upload, formData).then(({err, res}) => {
        afterUpload && afterUpload();
        const imgId = _.get(res, 'results');
        callback(imgId ? [imgId] : []);
        // native.showToast(JSON.stringify(res));
      });
    };
    input.click();
  };
}

export default ({ count, extnames, uploadUrl, query, beforeUpload, afterUpload }) => {
  init({uploadUrl, query});
  return new Promise(resolve => {
    fileChoose(count, extnames, resolve, beforeUpload, afterUpload);
  });
}
