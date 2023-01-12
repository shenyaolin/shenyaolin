import React from 'react';
import './index.less';
import imageSrc from 'framework/utils/imageSrc';
import uuid from 'framework/utils/uuid';
import { addClass, removeClass } from 'framework/utils/dom';
import html2canvas from 'html2canvas';
import _ from 'lodash';
//
//
export default class extends React.Component {
  state = {};

  getImageRealSize = (imgSrc) => {
    return new Promise(resolve => {
      const img = new Image();
      img.onload = function () {
        resolve({ width: img.width, height: img.height });
      };
      img.src = imgSrc;
    });
  };

  assistId = '';
  createAssist = () => {
    const assistId = `assist-${uuid()}`;
    const div = document.createElement('div');
    div.setAttribute('id', assistId);
    div.setAttribute('class', 'cjm-image-crop-assist');
    let html = '';
    html += '<canvas></canvas>';
    html += '<div class="cjm-image-crop-toolbar">';
    html += '<div class="cjm-image-crop-toolbar-toolbar-link cancel-link">取消</div>';
    html += '<div class="cjm-image-crop-toolbar-toolbar-link complate-link theme-color">完成</div>';
    html += '</div>';
    div.innerHTML = html;
    document.body.appendChild(div);
    this.assistId = assistId;
    this.drawCanvas();
  };

  drawCanvas = () => {
    const canvas = document.querySelector(`#${this.assistId} canvas`);
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    //
    //
    let width = canvas.width, height = canvas.height;
    if (window.devicePixelRatio) {
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      canvas.height = height * window.devicePixelRatio;
      canvas.width = width * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    }
    //
    //设置背景色
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

    const { isCircular, aspectRatio } = this.props;
    if (isCircular) {
      //清空圆形区域
      function clearArc(x, y, radius) {
        const calcWidth = radius - stepClear;
        const calcHeight = Math.sqrt(radius * radius - calcWidth * calcWidth);
        const posX = x - calcWidth;
        const posY = y - calcHeight;
        const widthX = 2 * calcWidth;
        const heightY = 2 * calcHeight;
        if (stepClear <= radius) {
          ctx.clearRect(posX, posY, widthX, heightY);
          stepClear += 0.1;
          clearArc(x, y, radius);
        }
      }

      let stepClear = 0;
      clearArc(window.innerWidth / 2, window.innerHeight / 2, window.innerWidth * 0.45);
    } else {
      const width = window.innerWidth * 0.9;
      const height = width / aspectRatio;
      ctx.clearRect(
        (window.innerWidth - width) / 2,
        (window.innerHeight - height) / 2,
        width,
        height
      );
    }
  };

  coverId = '';
  show = async (imgId) => {
    const coverId = `cover-${uuid()}`;
    const div = document.createElement('div');
    div.setAttribute('id', coverId);
    div.setAttribute('class', 'cjm-image-crop-cover');
    const src = imageSrc(imgId, undefined, 'imageView2/2/w/9999');
    const imgSize = await this.getImageRealSize(src);
    div.innerHTML = `<img class="crop-image" src="${src}" alt="" />`;
    document.body.appendChild(div);
    addClass(document.body, 'over-hidden');
    this.coverId = coverId;
    //
    const img = document.querySelector(`#${this.coverId} img.crop-image`);
    const windowWidth = window.innerWidth;
    const imgHeight = imgSize.height / (imgSize.width / windowWidth);
    img.style.marginTop = (imgHeight * -0.5) + 'px';
    this.createAssist();
    //
    this.bindEvents();
  };

  hide = () => {
    if (this.coverId) {
      const cover = document.getElementById(this.coverId);
      cover && document.body.removeChild(cover);
    }
    if (this.assistId) {
      const assist = document.getElementById(this.assistId);
      assist && document.body.removeChild(assist);
    }
    removeClass(document.body, 'over-hidden');
  };
  //
  getImgSize = () => {
    const img = document.querySelector(`#${this.coverId} img.crop-image`);
    const width = img.offsetWidth;
    const height = img.offsetHeight;
    return { width, height };
  };
  getImgOffset = () => {
    const img = document.querySelector(`#${this.coverId} img.crop-image`);
    const left = img.offsetLeft;
    const top = img.offsetTop;
    return { left, top };
  };
  getImgCenter = () => {
    const size = this.getImgSize();
    const offset = this.getImgOffset();
    const left = offset.left + size.width / 2;
    const top = offset.top + size.height / 2;
    return { left, top };
  };
  setImgSize = ({ width, height }) => {
    const img = document.querySelector(`#${this.coverId} img.crop-image`);
    img.style.width = width + 'px';
    img.style.height = height + 'px';
  };
  setImgOffset = ({ left, top }) => {
    const img = document.querySelector(`#${this.coverId} img.crop-image`);
    img.style.left = left + 'px';
    img.style.top = top + 'px';
    img.style.marginLeft = '0px';
    img.style.marginTop = '0px';
  };
  setImgCenter = ({ left, top }) => {
    const offset = {};
    const size = this.getImgSize();
    offset.left = left - size.width / 2;
    offset.top = top - size.height / 2;
    this.setImgOffset(offset);
  };
  //
  isMoving = false;
  isResizing = false;
  startTouchs = [];
  startSize = null;
  startOffset = null;
  handleTouchStart = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.changedTouches.length > 1) {
      this.isMoving = false;
      this.isResizing = true;
    } else {
      this.isMoving = true;
      this.isResizing = false;
    }
    this.startTouchs = event.changedTouches;
    this.startSize = this.getImgSize();
    this.startOffset = this.getImgOffset();
  };
  handleTouchMove = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (this.startTouchs.length === 1 && event.changedTouches.length > 1) {
      this.handleTouchStart(event);
    }
    //
    const assist = document.getElementById(this.assistId);
    assist && addClass(assist, 'moving');
    //
    if (this.isMoving) {
      const startX = _.get(this.startTouchs[0], 'screenX');
      const startY = _.get(this.startTouchs[0], 'screenY');
      const moveX = _.get(event.changedTouches[0], 'screenX');
      const moveY = _.get(event.changedTouches[0], 'screenY');
      const left = this.startOffset.left + (moveX - startX);
      const top = this.startOffset.top + (moveY - startY);
      this.setImgOffset({ left, top });
    } else if (this.isResizing) {
      const startX0 = _.get(this.startTouchs[0], 'screenX');
      const startY0 = _.get(this.startTouchs[0], 'screenY');
      const startX1 = _.get(this.startTouchs[1], 'screenX');
      const startY1 = _.get(this.startTouchs[1], 'screenY');
      const moveX0 = _.get(event.changedTouches[0], 'screenX');
      const moveY0 = _.get(event.changedTouches[0], 'screenY');
      const moveX1 = _.get(event.changedTouches[1], 'screenX');
      const moveY1 = _.get(event.changedTouches[1], 'screenY');
      if (startX0 && startY0 && startX1 && startY1 && moveX0 && moveY0 && moveX1 && moveY1) {
        //勾股定理
        // const center = {};
        // center.left = (moveX0 + moveX1) / 2;
        // center.top = (moveY0 + moveY1) / 2;
        const center = this.getImgCenter();
        const startSize = Math.pow(Math.pow(startX0 - startX1, 2) + Math.pow(startY0 - startY1, 2), 0.5);
        const moveSize = Math.pow(Math.pow(moveX0 - moveX1, 2) + Math.pow(moveY0 - moveY1, 2), 0.5);
        const multiple = moveSize / startSize;
        const width = this.startSize.width * multiple;
        const height = this.startSize.height * multiple;
        this.setImgSize({ width, height });
        this.setImgCenter(center);
      }
    }
  };
  handleTouchEnd = (event) => {
    event.preventDefault();
    event.stopPropagation();
    this.isMoving = false;
    this.isResizing = false;
    this.startTouchs = [];
    this.startSize = null;
    this.startOffset = null;
    setTimeout(() => {
      const assist = document.getElementById(this.assistId);
      assist && removeClass(assist, 'moving');
    }, 1000);
  };
  //
  handleCancel = () => {
    this.hide();
  };

  cropDom = (dom, scale) => {
    return new Promise(async resolve => {
      html2canvas(dom, {
        useCORS: true,
        allowTaint: false,
        width: dom.offsetWidth * scale,
        height: dom.offsetHeight * scale,
        scale: 1,
      }).then(async canvas => {
        const imageData = canvas.toDataURL('image/png');
        resolve(imageData);
      });
    });
  };

  handleComplate = async () => {
    const img = document.querySelector(`#${this.coverId} img.crop-image`);
    const { isCircular, aspectRatio, onCrop } = this.props;
    const size = this.getImgSize();
    const offset = this.getImgOffset();
    const src = img.getAttribute('src');
    const realSize = await this.getImageRealSize(src);
    const scale = realSize.width / size.width;
    // console.log(isCircular, aspectRatio, size, offset);
    const div = document.createElement('div');
    document.body.appendChild(div);
    const innerWidth = window.innerWidth;
    const innerHeight = window.innerHeight;
    const cropWidth = innerWidth * 0.9;
    const cropHeight = isCircular ? cropWidth : (cropWidth / aspectRatio);
    const mainLeft = innerWidth * 0.05;
    const mainTop = (innerHeight - cropHeight) / 2;
    const borderRadius = isCircular ? '50%' : '0';
    let html = '';
    html += '<div style="position: absolute;width: 1px;height: 1px;left: 0;top:0;overflow: hidden">';
    html += `<div class="crop-target" style="position: absolute;transform:scale(${scale},${scale});left:0;top:0;width:${cropWidth}px;height:${cropHeight}px;overflow: hidden;border-radius:${borderRadius} ">`;
    html += `<div style="position: absolute;left:-${mainLeft}px;top:-${mainTop}px;width:${innerWidth}px;height:${innerHeight}px">`;
    html += `<img style="position: absolute;left:${offset.left}px;top:${offset.top}px;width:${size.width}px;height:${size.height}px" src="${src}" alt=""/>`;
    html += '</div>';
    html += '</div>';
    html += '</div>';
    div.innerHTML = html;
    //
    div.querySelector('.crop-target img').onload = async () => {
      const imageData = await this.cropDom(div.querySelector('.crop-target'), scale);
      onCrop && onCrop(imageData);
      document.body.removeChild(div);
    };
    //
  };
  //
  bindEvents = () => {
    const cover = document.getElementById(this.coverId);
    // const img = document.querySelector(`#${this.coverId} img.crop-image`);
    cover.ontouchstart = this.handleTouchStart;
    cover.ontouchmove = this.handleTouchMove;
    cover.ontouchend = this.handleTouchEnd;
    //
    const cancelLink = document.querySelector(`#${this.assistId} .cancel-link`);
    const complatelLink = document.querySelector(`#${this.assistId} .complate-link`);
    cancelLink.onclick = this.handleCancel;
    complatelLink.onclick = this.handleComplate;
  };

  render() {
    return null;
  }
}
