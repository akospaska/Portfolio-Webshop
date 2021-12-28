import React from "react";

import axios from "axios";

import GraphQlConfig from "../../../../Api/GraphQuery";

const TableResponsiveCartInfoTRelement = (props) => {
  const updateCountValue = (productId, direction) => {
    const updateCountQuery = `mutation {modifyShoppingCartItemCount(itemId:${productId},direction:"${direction}"){affectedRows}}`;

    axios(GraphQlConfig(updateCountQuery))
      .then(function (response) {
        props.removeItem();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const deleteItemFromCart = (productId) => {
    const deleteQuery = `mutation {removeShoppingCartItem(itemId:${productId}){affectedRows}}`;

    axios(GraphQlConfig(deleteQuery))
      .then(function (response) {
        props.removeItem();
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <tr>
      <td class="cart_product">
        <a href="">
          <img src={props.imgUrl} alt="" />
        </a>
      </td>
      <td class="cart_description">
        <h4>
          <a href="">{props.name}</a>
        </h4>
        <p>Web ID: {props.id}</p>
      </td>
      <td class="cart_price">
        <p>{props.price} Huf</p>
      </td>
      <td class="cart_quantity">
        <div class="cart_quantity_button">
          <a
            class="cart_quantity_down"
            onClick={(e) => {
              if (props.count <= 1) {
                return;
              } else {
                updateCountValue(props.id, "-");
              }
            }}
          >
            {" "}
            -{" "}
          </a>
          <input class="cart_quantity_input" type="text" name="quantity" value={`${props.count}`} autocomplete="off" size="2" />

          <a
            class="cart_quantity_up"
            onClick={() => {
              if (props.count >= 10) {
                return;
              } else {
                updateCountValue(props.id, "+");
              }
            }}
          >
            {" "}
            +{" "}
          </a>
        </div>
      </td>

      <td class="cart_total">
        <p class="cart_total_price">{props.price * props.count} Huf</p>
      </td>
      <td class="cart_delete">
        <a
          class="cart_quantity_delete"
          onClick={() => {
            deleteItemFromCart(props.id);
          }}
        >
          <i class="fa fa-times"></i>
        </a>
      </td>
    </tr>
  );
};

export default TableResponsiveCartInfoTRelement;
