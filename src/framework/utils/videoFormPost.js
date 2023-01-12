import axios from "axios";
import api from "framework/config/api/index.js";
import { ajaxSync } from "utils/ajax";
// import { prefix } from 'framework/config/index.js';
import _ from "lodash";

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
  formData.append("file", blob);
  formData.append("name", "video.MP4");
  const result = await axios.post(
    '/apiInterface/interface/hydra-open-thirdpart-service/hydra-open-third-party/api/v1/file/open/upload',
    formData,
    // {
    //   // headers: { "Content-Type": "multipart/form-data", "super-token":'086f67944f64428cae58dd89e90b56ef' },
      
    // }
  );
  console.log('result---',result);
  const imgId = _.get(result, "data.results");
  return imgId;
}
