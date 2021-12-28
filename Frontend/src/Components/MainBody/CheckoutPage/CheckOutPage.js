import React from "react";
import BreadCrumbs from "./BreadCrumbs/BreadCrumbs";
import ShopperInformatios from "./ShopperInformations/ShopperInformations";
import TableResponsiveCartInfo from "./TableResponsiveCartInfo/TableResponsiveCartInfo";

import { Prompt } from "react-router-dom";

const CheckOutPage = () => {
  return (
    <section id="cart_items">
      <div class="container">
        <BreadCrumbs text={"Check out"} />
        <TableResponsiveCartInfo />
        <ShopperInformatios />
      </div>
    </section>
  );
};

export default CheckOutPage;
