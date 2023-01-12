import React from 'react';
import Swiper from './swiper/js/swiper.js';
import './swiper/css/swiper.less'
import './index.less';
import { addClass, removeClass } from 'framework/utils/dom';
import imageSrc from 'framework/utils/imageSrc';
//
const uuidv4 = require('uuid/v4');
//
export default class extends React.Component {
  state = {
    visible: false,
    images: [],
    index: 0,
    swiperId: uuidv4(),
    swiper: null
  };

  show = ({ images, index }) => {
    const { visible } = this.state;
    if (!visible) {
      addClass(document.body, 'overflow-hidden');
      addClass(document.body, 'body-show-image-cover-view');
      this.setState({ images, index, visible: true }, () => {
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
        type: 'fraction',
      }
    });
    return swiper;
  };

  destroySwiper() {
    const { swiper } = this.state;
    swiper.destroy(true, true);
    this.setState({ swiper: null });
  };

  hide = () => {
    removeClass(document.body, 'overflow-hidden');
    removeClass(document.body, 'body-show-image-cover-view');
    this.destroySwiper();
    this.setState({ images: [], index: 0, visible: false });
  };

  handleTouchStart = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  componentWillUnmount() {
    removeClass(document.body, 'overflow-hidden');
    removeClass(document.body, 'body-show-image-cover-view');
  }


  render() {
    const { visible, images, swiperId } = this.state;
    return visible ? (
      <div
        onTouchStart={this.handleTouchStart}
        className="cjm-mobile-image-cover-view" onClick={this.hide}>
        <div className="swiper-container cjm-mobile-swiper-container" id={swiperId}>
          <div className="swiper-wrapper">
            {images.map((img, imgIndex) => {
              const src = imageSrc(img, undefined, 'imageView2/2/w/1800');
              return (
                <div key={imgIndex} className="swiper-slide cjm-mobile-swiper-slide">
                  <div className="cjm-mobile-swiper-slide-image-wrap"><img src={src} /></div>
                </div>
              );
            })}
          </div>
          <div className="swiper-pagination"></div>
        </div>
      </div>
    ) : null;
  }
}
