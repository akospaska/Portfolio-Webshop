import React, { Component } from 'react';

const SliderDotsContainer = () => {
  return (
    <ol class="carousel-indicators">
      <li data-target="#slider-carousel" data-slide-to="0" class="active"></li>
      <li data-target="#slider-carousel" data-slide-to="1" class=""></li>
      <li data-target="#slider-carousel" data-slide-to="2" class=""></li>
    </ol>
  );
};
export default SliderDotsContainer;
