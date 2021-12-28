import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Formatter from "../../../../Classes/FrontendFormatter/Formatter";
var axios = require("axios");

const formatter = new Formatter();

const OrderItem = (props) => {
  const [displayStatus, setDisplayStatus] = useState(false);

  let displayStatusStyle = displayStatus ? {} : { display: "none" };

  const { id, creationDate, statusDescription, Loghistory } = props.apiResultSrc;

  let latestParcelNumber;

  try {
    latestParcelNumber = Loghistory[0].parcelNumber;
  } catch (error) {}

  const { DeliveryName, Country, ZipCode, City, Address, Email, Phone } = props.apiResultSrc.ContactPerson;

  const detailedOrderListItem = props.apiResultSrc.OrderItems;

  const calculateSummary = () => {
    let actualPrice = 0;
    detailedOrderListItem.map((a) => (actualPrice = actualPrice + a.count * a.finalPrice));
    return actualPrice;
  };

  const orderHasBeenPrinted = latestParcelNumber ? true : false;

  return (
    <div class="item" style={{ width: "66rem" }}>
      <div
        class="content"
        style={{
          width: "66rem",
          border: "1px solid #aeaeae",
          borderRadius: "0.625rem",
          padding: "1rem",
          boxShadow: "0 5px 10px 0 rgb(0 0 0 / 15%)",
        }}
      >
        <button
          style={{ float: "right" }}
          class="ui button"
          onClick={() => {
            setDisplayStatus(!displayStatus);
          }}
        >
          See Details
        </button>
        <a class="header">OrderId:{id}</a>
        <div class="description">Date:{formatter.timeConverter(creationDate)}</div>

        <div style={displayStatusStyle}>
          <div class="ui grid">
            <div class="four wide column" style={{ fontSize: "1.5rem", width: "25px !important" }}>
              {" "}
              <div class="ui list">
                <div class="item">Delivery Name:</div>
                <div class="item">Country:</div>
                <div class="item">ZipCode:</div>
                <div class="item">City:</div>
                <div class="item">Address:</div>
                <div class="item">Phone:</div>
                <div class="item">Email:</div>
              </div>
            </div>
            <div class="four wide column" style={{ float: "right", width: "136px !important", fontSize: "1.5rem" }}>
              {" "}
              <div class="ui list">
                <div class="item">{DeliveryName}</div>
                <div class="item">{Country}</div>
                <div class="item">{ZipCode}</div>
                <div class="item">{City}</div>
                <div class="item">{Address}</div>
                <div class="item">{Phone}</div>
                <div class="item">{Email}</div>
              </div>
            </div>
          </div>

          <div class="ui list">
            {detailedOrderListItem.map((a) => {
              return (
                <div class="item">
                  {a.name} {Number(a.count)}x {Number(a.finalPrice)} Huf
                </div>
              );
            })}

            <div style={{ fontWeight: "Bold" }} class="item">
              Summary: {calculateSummary()} Huf
            </div>
            <button
              style={{ cursor: orderHasBeenPrinted ? "" : "not-allowed", pointerEvents: "none" }}
              disabled={orderHasBeenPrinted}
              class="ui button"
              onClick={() => {
                window.open(`https://online.gls-hungary.com/tt_page.php?tt_value=${latestParcelNumber}`, "_blank");
              }}
            >
              Track order
            </button>
            <h4>Status:{statusDescription}</h4>
          </div>
          <br />
        </div>

        <br />
      </div>
    </div>
  );
};

export default OrderItem;
