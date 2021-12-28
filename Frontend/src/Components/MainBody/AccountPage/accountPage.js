import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import AccountDetailsSettings from "./accountSubmenus/accountDetailSettings";
import Orders from "./accountSubmenus/orders";

const navBarData = [
  { name: "Shipping informations", indexNumber: 0 },
  { name: "Orders", indexNumber: 1 },
];

const AccountPage = () => {
  const [actualIndexNumber, setActualIndexNumber] = useState(0);

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
                  setActualIndexNumber(b);
                }}
              >
                {a.name}
              </a>
            );
          })}
        </div>
        {actualIndexNumber == 0 ? <AccountDetailsSettings /> : ""}
        {actualIndexNumber == 1 ? <Orders /> : ""}
      </div>
    </section>
  );
};

export default AccountPage;
