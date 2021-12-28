import React, { Component } from "react";
import SliderItem0 from "./SliderItems/SliderItem0";
import SliderItem1 from "./SliderItems/SliderItem1";
import SliderItem2 from "./SliderItems/SliderItem2";

import Carousel from "react-elastic-carousel";

const SliderItemContainer = () => {
  return (
    <div class="carousel-inner">
      <Carousel>
        <SliderItem1 />
        <SliderItem0 />
        <SliderItem2 />
      </Carousel>
    </div>
  );
};

export default SliderItemContainer;
