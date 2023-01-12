import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Scrollbar, Autoplay, Pagination } from 'swiper';

import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';

SwiperCore.use([Scrollbar, Autoplay, Pagination]);

export default class extends React.Component {

  render() {
    const { 
      slidesPerView = 2, 
      autoplay = true, 
      loop = true, 
      direction,
      spaceBetween = 0,
      renderChildren,
      pagination,
      others
    } = this.props;

    return (
      <>
      <Swiper
        spaceBetween={spaceBetween}
        slidesPerView={slidesPerView}
        direction={direction}
        autoplay={autoplay}
        pagination={pagination}
        loop={loop}
        {...others}
      >
        {renderChildren && renderChildren(SwiperSlide)}
      </Swiper>
      </>
    )
  }
}