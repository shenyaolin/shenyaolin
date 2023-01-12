import React from "react";
import Swiper from "./swiper/js/swiper.js";
import "./swiper/css/swiper.less";
import "./index.less";
import config from "config";
import { addClass, removeClass } from "framework/utils/dom";
import imageSrc from "framework/utils/imageSrc";
import CloseImg from "../../../assets/images/close.png";
//
const { video1Domain } = config;
const uuidv4 = require("uuid/v4");
// const videoDomain = 'http://filetest.jgwcjm.com';

export default class extends React.Component {
  state = {
    visible: false,
    images: [],
    index: 0,
    swiperId: uuidv4(),
    swiper: null,
    noCompress: false,
  };

  show = ({ images, index, noCompress }) => {
    const { visible } = this.state;
    if (!visible) {
      addClass(document.body, "overflow-hidden");
      addClass(document.body, "body-show-image-cover-view");
      this.setState({ images, index, visible: true, noCompress }, () => {
        const swiper = this.createSwiper();
        this.setState({ swiper });
      });
    }
  };

  createSwiper() {
    const { index } = this.state;
    const { swiperId } = this.state;
    const swiper = new Swiper(`#${swiperId}`, {
      initialSlide: index,
      pagination: {
        el: `.swiper-pagination`,
        type: "fraction",
      },
    });
    return swiper;
  }

  destroySwiper() {
    const { swiper } = this.state;
    swiper.destroy(true, true);
    this.setState({ swiper: null });
  }

  hide = (e) => {
    console.log('关闭');
    removeClass(document.body, "overflow-hidden");
    removeClass(document.body, "body-show-image-cover-view");
    // this.destroySwiper();
    this.setState({ images: [], index: 0, visible: false });
  };

  handleTouchStart = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  componentWillUnmount() {
    removeClass(document.body, "overflow-hidden");
    removeClass(document.body, "body-show-image-cover-view");
  }

  render() {
    const { visible, images, swiperId, noCompress } = this.state;
    return visible ? (
      <div
        onTouchStart={this.handleTouchStart}
        className="cjm-mobile-image-cover-view"
      >
        <div className="cjm-mobile-image-cover-close-img" onClick={this.hide}>
          <img src={CloseImg} alt="" />
        </div>

        {/* <div className="swiper-container cjm-mobile-swiper-container" id={swiperId}>
          <div className="swiper-wrapper"> */}
        {images.map((img, imgIndex) => {
          const src = noCompress
            ? `${video1Domain}/${img}`
            : imageSrc(img, undefined, "imageView2/2/w/1800");
          return (
            // <div key={imgIndex} className="swiper-slide cjm-mobile-swiper-slide">
            //   <div className="cjm-mobile-swiper-slide-image-wrap">
            <video
              className="cjm-mobile-swiper-image-wrap-content"
              src={src}
              controls
            />
            // </div>
            // </div>
          );
        })}
        {/* </div> */}
        <div className="swiper-pagination"></div>
        {/* </div> */}
      </div>
    ) : null;
  }
}
