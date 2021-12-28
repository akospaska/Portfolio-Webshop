import React, { Component } from "react";
import { FaCartPlus, FaPlusSquare } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { cartCountIncrement, addItemToCart, setRefreshCartSize } from "../../../../../../actions";
import axios from "axios";

import { useSelector } from "react-redux";

import GraphQlConfig from "../../../../../Api/GraphQuery";

const FeaturesItem = (props) => {
  const dispatch = useDispatch();
  const refreshCartSize = useSelector((state) => state.refreshCartSize);
  const cartItemManager = useSelector((state) => state.cartItemManager);

  const addCartItem = (itemId) => {
    const addNewItemQuery = `mutation {addNewShoppingCartItem(itemId:${itemId}){affectedRows}}`;

    axios(GraphQlConfig(addNewItemQuery))
      .then(function (response) {
        dispatch(setRefreshCartSize(!refreshCartSize));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div class="col-sm-4">
      <div class="product-image-wrapper">
        <div class="single-products">
          <div class="productinfo text-center">
            <img src={props.imgUrl} alt="" />
            <h2>{props.price} Ft</h2>
            <p>{props.name}</p>
            <a
              disabled={cartItemManager.find((a) => (a == props.id ? true : false))}
              onClick={() => {
                //sendSessionByRequest(props.id);

                addCartItem(props.id);
                dispatch(addItemToCart(props.id));
              }}
              class="btn btn-default add-to-cart"
            >
              <FaCartPlus />
              Add to cart
            </a>
          </div>
        </div>
        <div class="choose"></div>
      </div>
    </div>
  );
};

export default FeaturesItem;
