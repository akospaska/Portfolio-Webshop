import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import GraphQlConfig from "../../../../Api/GraphQuery";

import Formatter from "../../../../Classes/FrontendFormatter/Formatter";

import DownloadContent from "../../../../Classes/DownloadContent/DownloadContent";

const download = new DownloadContent();

const formatter = new Formatter();

const axios = require("axios");

function timeConverter(UNIX_timestamp) {
  var a = new Date(Number(UNIX_timestamp));

  var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();

  var time = year + " " + month + " " + date;

  return time;
}

const AdminOrderItem = (props) => {
  const [fake, setFake] = useState(false);
  const [displayStatus, setDisplayStatus] = useState(false);

  const [modificationIsEnabled, setModificationIsEnabled] = useState(false);

  let displayStatusStyle = displayStatus ? {} : { display: "none" };

  const [orderStatus, setOrderStatus] = useState(props.apiResultSrc.status);
  const { orderId, creationDate, status, id, LogHistory } = props.apiResultSrc;

  const isPdfVisible = orderStatus >= 5 ? "" : "none";

  const isLogFileVisible = orderStatus >= 4 ? "" : "none";

  let printedLabels;
  let printErrors;
  let successful;

  try {
    printedLabels = LogHistory[0].printedLabels;
    printErrors = LogHistory[0].printErrors;
    successful = LogHistory[0].successful;
  } catch (error) {
    printedLabels = [];
    printErrors = [];
    successful;
  }
  /*  const { printedLabels, printErrors, successful } = LogHistory[0]; */

  const { pclshopId, DeliveryName, Country, ZipCode, City, Address, Email, Phone } = props.apiResultSrc.ContactPerson;

  const [deliveryName, setDeliveryName] = useState(DeliveryName);
  const [country, setCountry] = useState(Country);
  const [zipCode, setZipCode] = useState(ZipCode);
  const [city, setCity] = useState(City);
  const [address, setAddress] = useState(Address);
  const [email, setEmail] = useState(Email);
  const [phone, setPhone] = useState(Phone);
  const [parcelShopId, setParcelShopId] = useState(pclshopId);

  const detailedOrderListItem = props.apiResultSrc.OrderItems;

  const [checkboxValue, setCheckboxValue] = useState(false);

  const [statusApiResult, setStatusApiResult] = useState([]);

  useEffect(() => {
    setOrderStatus(status);
  }, []);

  const calculateSummary = () => {
    let actualPrice = 0;
    detailedOrderListItem.map((a) => {
      detailedOrderListItem.map((a) => (actualPrice = actualPrice + a.count * a.finalPrice));
    });
    return actualPrice.toFixed(2);
  };

  const modifyStatus = () => {
    const updateStatusQuery = `mutation {updateOrderStatuses(orderIds:[${props.apiResultSrc.id}],newStatus:${orderStatus}){fieldCount}}`;

    axios(GraphQlConfig(updateStatusQuery))
      .then(function (response) {
        props.forceRefresh();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const deleteOrder = () => {
    const updateStatusQuery = `mutation {deleteOrder(orderId:${props.apiResultSrc.id}){fieldCount}}`;
    axios(GraphQlConfig(updateStatusQuery))
      .then(function (response) {
        props.forceRefresh();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getStatusEnumQuery = `{status{id,description}}`;

  const getOrderStatuses = () => {
    axios(GraphQlConfig(getStatusEnumQuery))
      .then(function (response) {
        setStatusApiResult(response.data.data.status);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    getOrderStatuses();
  }, [fake, checkboxValue]);

  const modifyParcelCount = (direction) => {
    const modifyQuery = `mutation {modifyParcelCountByOrder(direction:"${direction}",orderId:${props.apiResultSrc.id}){fieldCount}}`;
    axios(GraphQlConfig(modifyQuery))
      .then(function (response) {
        props.forceRefresh();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const ContactPersonModification = () => {
    const modifyQuery = `mutation {updateOrderContactPerson(ContactPersonId:${props.apiResultSrc.ContactPerson.id},Name:"${deliveryName}",City:"${city}",Country:"${country}",ZipCode:"${zipCode}",Address:"${address}",Phone:"${phone}",Email:"${email}",pclshopId:"${pclshopId}"){fieldCount}}`;
    axios(GraphQlConfig(modifyQuery))
      .then(function (response) {
        props.forceRefresh();
        setModificationIsEnabled(!modificationIsEnabled);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // </div>
  return (
    <div style={{ marginBottom: "1rem" }}>
      <input
        onChange={(e) => props.testFunction(id)} // setCheckboxValue(!checkboxValue)}
        checked={props.checkStatus}
        type="checkbox"
        style={{ float: "left", marginLeft: "6rem", height: "7rem" }}
      />
      <div class="item" style={{ width: "66rem" }}>
        <form
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
            onClick={(e) => {
              e.preventDefault();
              setDisplayStatus(!displayStatus);
            }}
          >
            See Details
          </button>
          <a class="header">OrderId:{props.apiResultSrc.id}</a>
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
                  <div class="item">ParcelShop Id:</div>
                </div>
              </div>
              <div
                class="four wide column"
                style={{
                  float: "right",
                  width: "136px !important",
                  fontSize: "1.5rem",
                  marginRight: "31rem",
                }}
              >
                {" "}
                <div class="ui list" style={{ width: "40rem" }}>
                  <input
                    disabled={!modificationIsEnabled}
                    style={{ marginTop: "-0.8rem" }}
                    value={deliveryName}
                    onChange={(e) => setDeliveryName(e.target.value)}
                    class="item"
                  />
                  <input
                    disabled={!modificationIsEnabled}
                    style={{ marginTop: "-0.8rem" }}
                    value={country}
                    class="item"
                    onChange={(e) => setCountry(e.target.value)}
                  />
                  <input
                    disabled={!modificationIsEnabled}
                    style={{ marginTop: "-0.8rem" }}
                    value={zipCode}
                    class="item"
                    onChange={(e) => setZipCode(e.target.value)}
                  />
                  <input
                    disabled={!modificationIsEnabled}
                    style={{ marginTop: "-0.8rem" }}
                    value={city}
                    class="item"
                    onChange={(e) => setCity(e.target.value)}
                  />
                  <input
                    disabled={!modificationIsEnabled}
                    style={{ marginTop: "-0.8rem" }}
                    value={address}
                    class="item"
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  <input
                    disabled={!modificationIsEnabled}
                    style={{ marginTop: "-0.8rem" }}
                    value={phone}
                    class="item"
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  <input
                    disabled={!modificationIsEnabled}
                    style={{ marginTop: "-0.8rem" }}
                    value={email}
                    class="item"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <input
                    disabled={!modificationIsEnabled}
                    style={{ marginTop: "-0.8rem" }}
                    value={parcelShopId}
                    class="item"
                    onChange={(e) => setParcelShopId(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div>
              <button
                className="ui button"
                style={{ float: "left" }}
                disabled={modificationIsEnabled}
                onClick={(e) => {
                  e.preventDefault();
                  setModificationIsEnabled(!modificationIsEnabled);
                }}
              >
                Modify DeliveryDetails
              </button>
              <button
                className="ui button"
                disabled={!modificationIsEnabled}
                style={{ position: "absolute", marginLeft: "1rem" }}
                onClick={(e) => {
                  e.preventDefault();
                  setModificationIsEnabled(!modificationIsEnabled);
                  ContactPersonModification();
                }}
              >
                Save changes
              </button>
              <div style={{ float: "right" }}>
                Parcelcount:
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    modifyParcelCount("-");
                  }}
                  className="ui button"
                >
                  &#8595;
                </button>
                {props.apiResultSrc.parcelCount}
                <button
                  className="ui button"
                  onClick={(e) => {
                    e.preventDefault();
                    modifyParcelCount("+");
                  }}
                >
                  &#8593;
                </button>
              </div>
            </div>

            <div class="ui list">
              <div style={{ float: "right", width: "20rem" }}>
                <label for="cars">Status:</label>

                <select
                  value={orderStatus}
                  name="cars"
                  id="cars"
                  onChange={(e) => {
                    setOrderStatus(e.target.value);
                    // setNewStatusOfOrder(e.target.value);
                  }}
                >
                  {statusApiResult.map((a) => {
                    return <option value={a.id}>{a.description}</option>;
                  })}
                </select>
                <button
                  style={{ float: "right" }}
                  class="ui button"
                  onClick={(e) => {
                    e.preventDefault();

                    modifyStatus();
                  }}
                >
                  Save status
                </button>

                {successful == 1 ? (
                  <div style={{ marginTop: "2rem" }}>
                    <ul>
                      <li style={{ fontSize: "medium", fontWeight: "500" }}>Parcelnumber:</li>

                      {printedLabels.map((a) => (
                        <React.Fragment>
                          <li>-{a.parcelnumber}</li>
                          <li>-PrintOrientation:{a.printOrientation}</li>
                        </React.Fragment>
                      ))}
                    </ul>
                  </div>
                ) : (
                  ""
                )}

                {orderStatus == 3 || orderStatus == 4 ? (
                  <div style={{ marginTop: "2rem" }}>
                    <ul>
                      <li style={{ fontSize: "medium", fontWeight: "500" }}>ErrorList:</li>

                      {printErrors.map((a) => (
                        <li>-{a.ErrorDescription}</li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  ""
                )}
              </div>
              {detailedOrderListItem.map((a) => {
                return (
                  <div class="item">
                    <img style={{ height: "45px" }} src={`${a.imgurl}`} /> {a.name} {Number(a.count)}x {Number(a.finalPrice)} Ft
                  </div>
                );
              })}

              <div style={{ fontWeight: "Bold" }} class="item">
                Summary: {props.apiResultSrc.OrderFinalPrice} Ft
              </div>
              {printedLabels == null ? (
                ""
              ) : printedLabels.length > 0 ? (
                <button
                  class="ui button"
                  onClick={(e) => {
                    e.preventDefault();

                    window.open(`https://online.gls-hungary.com/tt_page.php?tt_value=${printedLabels[0].parcelnumber}`, "_blank");
                  }}
                >
                  Track Order
                </button>
              ) : (
                ""
              )}

              <br />
              <button
                style={{ marginTop: "2rem", cursor: "pointer" }}
                class="ui button"
                onClick={(e) => {
                  e.preventDefault();
                  deleteOrder();
                }}
              >
                Delete Order
              </button>
              <i
                style={{ float: "right", fontSize: "4rem", display: isLogFileVisible, cursor: "pointer" }}
                className="align left icon"
                onClick={(e) => {
                  download.downloadLogFile(LogHistory[0].printactionId);
                }}
              ></i>
              {props.apiResultSrc.status >= 5 ? (
                <i
                  style={{ float: "right", fontSize: "4rem", cursor: "pointer" }}
                  class="fa fa-exchange"
                  aria-hidden="true"
                  onClick={(e) => {
                    props.sendExtraOrder(props.apiResultSrc.id, 3);
                  }}
                ></i>
              ) : (
                ""
              )}

              <i
                style={{ float: "right", fontSize: "4rem", display: isPdfVisible }}
                className="file pdf outline icon"
                onClick={(e) => download.downloadPdf(LogHistory[0].printactionId)}
              ></i>
              <i
                style={{ float: "right", fontSize: "4rem", display: isPdfVisible, cursor: "pointer" }}
                class="fa fa-backward"
                onClick={(e) => {
                  props.sendExtraOrder(props.apiResultSrc.id, 5);
                }}
              ></i>
            </div>
            <br />
          </div>

          <br />
        </form>
      </div>
    </div>
  );
};

export default AdminOrderItem;
