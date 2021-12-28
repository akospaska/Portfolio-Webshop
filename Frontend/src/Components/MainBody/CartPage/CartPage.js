import React from "react";
import BreadCrumbs from "../CheckoutPage/BreadCrumbs/BreadCrumbs";

import TableResponsiveCartInfo from "../CheckoutPage/TableResponsiveCartInfo/TableResponsiveCartInfo";

const CartPage = () => {
  return (
    <section id="cart_items">
      <div class="container">
        <BreadCrumbs text={"Shopping Cart"} />
        <TableResponsiveCartInfo />
      </div>
    </section>
  );
};

export default CartPage;
