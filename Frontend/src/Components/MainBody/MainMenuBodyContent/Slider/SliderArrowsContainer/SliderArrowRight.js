import React, { Component } from 'react';
import { FaAngleRight } from 'react-icons/fa';

const SliderArrowRight = () => {
  return (
    <div>
      <a href="#slider-carousel" class="right control-carousel hidden-xs" data-slide="next">
        <FaAngleRight />
      </a>
    </div>
  );
};

export default SliderArrowRight;
