import React from "react";
import TableResponsiveCartInfoTRelement from "./TableResponsiveCartInfoTRelement/TableResponsiveCartInfoTRelement";
import CartSummary from "../CartSummary/CartSummary";
import GraphQlConfig from "../../../Api/GraphQuery";

import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { removeItemFromCart, setCartSize, cartCountIncrement } from "../../../../actions";
import { useDispatch } from "react-redux";
import Formatter from "../../../Classes/FrontendFormatter/Formatter";

const formatter = new Formatter();
const TableResponsiveCartInfo = () => {
  var axios = require("axios");
  const cartItemManager = useSelector((state) => state.cartItemManager);
  const [cartItems, setCartItems] = useState([]);
  const [fake, setFake] = useState(true);
  const dispatch = useDispatch();

  const getShoppingCartItemsQuery = "{shoppingCartItems{itemId,imgurl,name,netPrice,vat,isFeatured,priceReduce,count,finalPrice}}";

  const getCartItems = () => {
    axios(GraphQlConfig(getShoppingCartItemsQuery))
      .then(function (response) {
        setCartItems(response.data.data.shoppingCartItems);
        dispatch(setCartSize(response.data.data.shoppingCartItems.length));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    getCartItems();
  }, [fake]);

  const removeItem = () => {
    setFake(!fake);
  };

  return (
    <div class="table-responsive cart_info">
      <table class="table table-condensed">
        <thead>
          <tr class="cart_menu">
            <td class="image">Item</td>
            <td class="description"></td>
            <td class="price">Price</td>
            <td class="quantity">Quantity</td>
            <td class="total">Total</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {cartItems
            ? cartItems.map((a) => {
                return (
                  <TableResponsiveCartInfoTRelement
                    imgUrl={a.imgurl}
                    name={a.name}
                    price={a.finalPrice}
                    priceReduce={a.priceReduce}
                    netPrice={a.netPrice}
                    vat={a.vat}
                    id={a.itemId}
                    count={a.count}
                    sessionKey={a.shoppingCartSessionKey}
                    removeItem={removeItem}
                  />
                );
              })
            : ""}
        </tbody>
        <CartSummary cartItems={cartItems} />
      </table>
    </div>
  );
};

export default TableResponsiveCartInfo;
