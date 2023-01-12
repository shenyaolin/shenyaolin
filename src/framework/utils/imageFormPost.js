import axios from 'axios';
import api from 'framework/config/api/index.js';
import { prefix } from 'framework/config/index.js';
import _ from 'lodash';

function base64ToBlob(base64Data) {
  let byteString;
  if (base64Data.split(",")[0].indexOf("base64") >= 0) {
    byteString = atob(base64Data.split(",")[1]);
  } else {
    byteString = unescape(base64Data.split(",")[1]);
  }
  const mimeString = base64Data.split(",")[0].split(":")[1].split(";")[0];
  const ia = new Uint8Array(byteString.length);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ia], { type: mimeString });
}

export default async function (imageData) {
  const blob = base64ToBlob(imageData);
  const formData = new FormData();
  formData.append('file', blob);
  formData.append('name', 'image.png');
  const result = await axios.post(`${prefix}${api.fileUpload.upload}`, formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });
  const imgId = _.get(result, 'data.results');
  return imgId;
}
