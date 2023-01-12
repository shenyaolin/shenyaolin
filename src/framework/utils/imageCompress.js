import _ from 'lodash';

const defaultImageSizeLimit = { width: 800, height: 800 };

function getBase64Url(imageFile) {
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.readAsDataURL(imageFile);
    reader.onloadend = function () {
      resolve(this.result);
    };
  });
}

function createImage(src, sizeLimit) {
  return new Promise(resolve => {
    const maxWidth = [_.get(sizeLimit, 'width'), _.get(defaultImageSizeLimit, 'width')].find(Boolean);
    const maxHeight = [_.get(sizeLimit, 'height'), _.get(defaultImageSizeLimit, 'height')].find(Boolean);
    const imgId = `img_${Date.now()}_${Math.floor(Math.random() * 99999)}`;
    const onloadName = `image_${imgId}_onload`;
    window[onloadName] = function () {
      resolve(document.getElementById(imgId));
    };
    const wrapStyle = 'position: absolute;left: 0;top:0;width: 1px;height: 1px;overflow: hidden;opacity: 0;';
    const imageStyle = `max-width: ${maxWidth}px;max-height: ${maxHeight}px;`;
    const div = document.createElement('div');
    div.setAttribute('style', wrapStyle);
    div.innerHTML = `<img onload="${onloadName}()" style="${imageStyle}" id="${imgId}" src="${src}"/>`;
    document.body.appendChild(div);
  });
}

// export default async function (imageFile, sizeLimit) {
//   let base64Url = await getBase64Url(imageFile);
//   const image = await createImage(base64Url, sizeLimit);
//   const canvas = document.createElement('canvas');
//   const ctx = canvas.getContext('2d');
//   canvas.width = image.width;
//   canvas.height = image.height;
//   ctx.drawImage(image, 0, 0, image.width, image.height);
//   base64Url = canvas.toDataURL("image/png", 1.0);
//   document.body.removeChild(image.parentElement);
//   return base64Url;
// }

export default async function (imageFile, sizeLimit) {
  let base64Url = await getBase64Url(imageFile);
  if (sizeLimit) {
    const image = await createImage(base64Url, sizeLimit);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = image.width;
    canvas.height = image.height;
    ctx.drawImage(image, 0, 0, image.width, image.height);
    base64Url = canvas.toDataURL("image/png", 1.0);
    document.body.removeChild(image.parentElement);
  }
  return base64Url;
}

export function getImgByteSize(base64Url) {
  let size = '';
  if (base64Url) { // 获取base64图片byte大小
    const equalIndex = base64Url.indexOf('=');  // 获取=号下标
    if (equalIndex > 0) {
      const str = base64Url.substring(0, equalIndex); // 去除=号
      const strLength = str.length;
      const fileLength = strLength - (strLength / 8) * 2; // 真实的图片byte大小
      size = Math.floor(fileLength); // 向下取整
    } else {
      const strLength = base64Url.length;
      const fileLength = strLength - (strLength / 8) * 2;
      size = Math.floor(fileLength); // 向下取整
    }
  }
  return size;
}
