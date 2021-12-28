import React, { Component } from 'react';
import Carousel from 'react-elastic-carousel';
import { useState } from 'react';

const UniqueProductPageImagesContainer = (props) => {
  const [activeImg, setActiveImg] = useState(1);

  return (
    <div class="col-sm-5">
      <div class="view-product">
        <img src={`images/product-details/${activeImg}.jpg`} alt="" />
        <h3>ZOOM</h3>
      </div>
      <div id="similar-product" class="carousel slide" data-ride="carousel">
        <div class="carousel-inner">
          <div class="item active">
            <a href="">
              <img src={`images/product-details/similar${props.fakeApiSrc.subPhotos.photo1}.jpg`} value={props.fakeApiSrc.subPhotos.photo1} alt="" />
            </a>
            <a href="">
              <img src={`images/product-details/similar${props.fakeApiSrc.subPhotos.photo2}.jpg`} value={props.fakeApiSrc.subPhotos.photo2} alt="" />
            </a>
            <a href="">
              <img src={`images/product-details/similar${props.fakeApiSrc.subPhotos.photo3}.jpg`} value={props.fakeApiSrc.subPhotos.photo3} alt="" />
            </a>
          </div>
          <div class="item">
            <a href="">
              <img src="images/product-details/similar1.jpg" alt="" />
            </a>
            <a href="">
              <img src="images/product-details/similar2.jpg" alt="" />
            </a>
            <a href="">
              <img src="images/product-details/similar3.jpg" alt="" />
            </a>
          </div>

          <div class="item">
            <Carousel>
              <a href="">
                <img src="images/product-details/similar1.jpg" alt="" />
              </a>
              <a href="">
                <img src="images/product-details/similar2.jpg" alt="" />
              </a>
              <a href="">
                <img src="images/product-details/similar3.jpg" alt="" />
              </a>
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UniqueProductPageImagesContainer;
