import React, { Component } from 'react';

import SliderItemContainer from './SliderItemContainer/SliderItemContainer';

const Slider = () => {
  return (
    <section id="slider">
      <div class="container">
        <div class="row">
          <div class="col-sm-12">
            <div id="slider-carousel" class="carousel slide" data-ride="carousel">
              <SliderItemContainer />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Slider;
