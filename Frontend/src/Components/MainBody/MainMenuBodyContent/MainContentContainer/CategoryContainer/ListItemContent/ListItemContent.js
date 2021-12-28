import React, { Component } from 'react';
import { FaCartPlus } from 'react-icons/fa';

const ListItemContent = (props) => {
  return (
    <div class={`col-sm-${props.columnLength}`}>
      <div class="product-image-wrapper">
        <div class="single-products">
          <div class="productinfo text-center">
            <img src={`images/home/gallery${props.imgID}.jpg`} alt="" />
            <h2>{props.price}$</h2>
            <p>{props.name}</p>
            <a href={props} class="btn btn-default add-to-cart">
              <FaCartPlus />
              Add to cart
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListItemContent;
