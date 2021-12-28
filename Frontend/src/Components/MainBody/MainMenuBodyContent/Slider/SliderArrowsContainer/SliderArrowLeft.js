import React, { Component } from 'react';
import { FaAngleLeft } from 'react-icons/fa';

const SliderArrowLeft = () => {
  return (
    <div>
      <a href="#slider-carousel" class="left control-carousel hidden-xs" data-slide="next">
        <FaAngleLeft />
      </a>
    </div>
  );
};

export default SliderArrowLeft;
