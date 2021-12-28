import React from "react";
import { useState } from "react";
import AccountDetailsSettings from "../AccountPage/accountSubmenus/accountDetailSettings";
import Orders from "../AccountPage/accountSubmenus/orders";
import Brands from "./SubMenus/Brands";
import Categories from "./SubMenus/Categories";
import ManageAdminAccounts from "./SubMenus/ManageAdminAccounts";
import MyglsAccountSettings from "./SubMenus/MyglsAccountSettings";
import AdminOrders from "./SubMenus/Orders";
import PickupAddresses from "./SubMenus/PickUpAddresses";
import PrintHistory from "./SubMenus/PrintHistory";
import PrintList from "./SubMenus/PrintList";
import ProductManager from "./SubMenus/ProductManager";

import { useSelector } from "react-redux";

const navBarData = [
  { name: "Orders", indexNumber: 0 },
  { name: "Product Manager", indexNumber: 1 },
  { name: "Category Manager", indexNumber: 2 },
  { name: "Brand Manager", indexNumber: 3 },
  { name: "Pickup addresses", indexNumber: 4 },
  { name: "Mygls settings", indexNumber: 5 },
  { name: "Manage admin accounts", indexNumber: 6 },
  { name: "Print history", indexNumber: 7 },
];

const AdminPage = () => {
  const [actualIndexNumber, setActualIndexNumber] = useState(0);

  const adminStatus = useSelector((state) => state.adminStatus);
  const demoAdminStatus = useSelector((state) => state.demoAdminStatus);

  if (adminStatus == false && demoAdminStatus == false) {
    window.location.href = "/";
    return;
  }

  return (
    <section id="form" style={{ marginTop: "1em" }}>
      <div class="container">
        <div class="ui pointing menu">
          {navBarData.map((a, b) => {
            const isItActive = b == actualIndexNumber ? "item active" : "item";
            return (
              <a
                class={isItActive}
                style={{ fontSize: "1.5rem" }}
                onClick={(e) => {
                  e.preventDefault();
                  setActualIndexNumber(a.indexNumber);
                }}
              >
                {a.name}
              </a>
            );
          })}
        </div>
        {actualIndexNumber == 0 ? <AdminOrders /> : ""}
        {actualIndexNumber == 1 ? <ProductManager /> : ""}
        {actualIndexNumber == 2 ? <Categories /> : ""}
        {actualIndexNumber == 3 ? <Brands /> : ""}
        {actualIndexNumber == 4 ? <PickupAddresses /> : ""}
        {actualIndexNumber == 5 ? <MyglsAccountSettings /> : ""}
        {actualIndexNumber == 6 ? <ManageAdminAccounts /> : ""}
        {actualIndexNumber == 7 ? <PrintHistory /> : ""}
      </div>
    </section>
  );
};

export default AdminPage;
