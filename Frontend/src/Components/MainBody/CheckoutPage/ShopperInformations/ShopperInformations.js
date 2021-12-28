import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import axios from "axios";
import GraphQlConfig from "../../../Api/GraphQuery";
import Formatter from "../../../Classes/FrontendFormatter/Formatter";

import { Button, Header, Image, Modal } from "semantic-ui-react";
import BackendRESTrequest from "../../../Api/BackendRESTrequest";

const formatter = new Formatter();

const ShopperInformatios = () => {
  const [country, setCountry] = useState("HU");
  const [name, setName] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [content, setContent] = useState("");

  const [shippingToPclshop, setShippingToPclShop] = useState(false);
  const [parcelShops, setParcelShops] = useState([]);
  const [searchedParcelShop, setSearchedParcelShop] = useState([]);
  const [selectedParcelShop, setSelectedParcelShop] = useState("");
  const [selectedParcelShopData, setSelectedParcelShopData] = useState({});

  const [selectedPclShopOpening, setSelectedPclShopOpening] = useState([]);

  const loginStatus = useSelector((state) => state.loginStatus);
  const cartCounter = useSelector((state) => state.getCartSize);

  const [open, setOpen] = React.useState(false);

  //Bank card Payment

  const getAccountDetailsQuery =
    "{accountDetail{id,deliveryName,deliveryCountry,deliveryZipCode,deliveryCity,deliveryStreet,deliveryContactEmail,deliveryContactPhone,creationDate}}";

  const getAccountDetails = () => {
    axios(GraphQlConfig(getAccountDetailsQuery))
      .then(function (response) {
        const { id, deliveryName, deliveryCountry, deliveryZipCode, deliveryCity, deliveryStreet, deliveryContactEmail, deliveryContactPhone } =
          response.data.data.accountDetail;

        setStreet(deliveryStreet);
        setName(deliveryName);
        setCountry(deliveryCountry);
        setCity(deliveryCity);
        setZipCode(deliveryZipCode);
        setPhone(deliveryContactPhone);
        setEmail(deliveryContactEmail);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const [paymentState, setPayMentState] = useState(1);

  const sendOrderQuery = `mutation {sendOrder(paymentType:${paymentState},toParcelShop:${shippingToPclshop},selectedParcelShop:"${selectedParcelShop}",deliveryName:"${name}",deliveryCountry:"${country}",deliveryZipCode:"${zipCode}",deliveryCity:"${city}",deliveryStreet:"${street}",deliveryContactEmail:"${email}",deliveryContactPhone:"${phone}"){affectedRows}}`;

  const sendOrder = () => {
    axios(GraphQlConfig(sendOrderQuery))
      .then(function (response) {
        alert("check mailbox");
        window.location.href = "/";
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const sendOrderWithStripe = async () => {
    const apiResponse = await BackendRESTrequest.post("/orderwithstripe", {
      paymentType: paymentState,
      toParcelShop: shippingToPclshop,
      selectedParcelShop: selectedParcelShop,
      deliveryName: name,
      deliveryCountry: country,
      deliveryZipCode: zipCode,
      deliveryCity: city,
      deliveryStreet: street,
      deliveryContactEmail: email,
      deliveryContactPhone: phone,
    });

    try {
      window.location.href = apiResponse.data.url;
    } catch (error) {
      alert("Invalid payment/order details");
    }
  };

  useEffect(() => {
    if (loginStatus) {
      getAccountDetails();
    }
  }, []);

  const paymentCheckBoxHandler = (newValue) => {
    newValue == paymentState ? "" : setPayMentState(newValue);
  };

  const parcelshopDataSourcePicker = () => {
    let srcUrl;

    switch (country) {
      case "HU":
        srcUrl = "https://online.gls-hungary.com/psmap/psmap_getdata.php?";

        break;
      case "RO":
        srcUrl = "https://online.gls-hungary.com/psmap/psmap_getdata.php?";
        break;
      case "SI":
        srcUrl = "https://online.gls-slovenia.com/psmap/psmap_getdata.php?";
        break;
      case "Sk":
        srcUrl = "https://online.gls-slovakia.sk/psmap/psmap_getdata.php?";
        break;
      case "CZ":
        srcUrl = "https://online.gls-czech.com/psmap/psmap_getdata.php?";
        break;
      case "HR":
        srcUrl = "https://online.gls-croatia.com/psmap/psmap_getdata.php?";
        break;
    }

    return srcUrl;
  };

  const getParcelShopData = () => {
    var config = {
      method: "get",
      url: `${parcelshopDataSourcePicker()}ctrcode=${country}&action=getList&dropoff=1&pclshopin=1&parcellockin=1`,
    };

    axios(config)
      .then(function (response) {
        let fetchedArray = response.data;
        fetchedArray.map((a, b) => {
          let newValue =
            formatter.inputValueSanitazer(`${a.address} ${a.city} ${a.name} ${a.zipcode}`) +
            ` ${a.pclshopid} ${formatter.createHungarianDistrictSearchValue(a.zipcode)}`;

          fetchedArray[b] = { ...fetchedArray[b], ...{ searchValue: newValue } };
        });

        setParcelShops(fetchedArray);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getOpeningInformation = (pclshopId) => {
    var config = {
      method: "get",
      url: `${parcelshopDataSourcePicker()}action=getOpenings&pclshopid=${pclshopId}`,
    };

    axios(config)
      .then(function (response) {
        let fetchedArray = response.data;

        fetchedArray = formatter.orderOpeningDays(fetchedArray);

        setSelectedPclShopOpening(fetchedArray);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    if (country != "HU" && paymentState == 2) setPayMentState(1);

    getParcelShopData();
    setSearchedParcelShop([]);
  }, [country]);

  useEffect(() => {
    getOpeningInformation(selectedParcelShop);
  }, [selectedParcelShop]);

  const inputValidator = () => {
    const nameIssue = `The name length must be at least 3 characters long!`;
    const cityIssue = `The City name length must be at least 2 characters long!`;
    const zipCodeIssue = `The ZipCode length must be at least 4 characters long!`;
    const emailIssue = `The email format is incorrect!`;
    const messageArray = [nameIssue, cityIssue, zipCodeIssue, emailIssue];

    const nameIsValid = name.length > 2;
    const cityIsValid = shippingToPclshop ? true : city.length > 1;
    const zipCodeIsValid = shippingToPclshop ? true : zipCode.length > 3;
    const emailIsValid = email.includes("@");

    const checkArray = [nameIsValid, cityIsValid, zipCodeIsValid, emailIsValid];

    let extractedErrorMessages = [];

    checkArray.map((a, b) => {
      !a ? extractedErrorMessages.push(messageArray[b]) : "";
    });

    return extractedErrorMessages;
  };

  return (
    <div class="shopper-informations">
      <div class="payment-options">
        <h3>Payment Methods</h3>
        <span>
          <label>
            <input checked={paymentState == 1 ? true : false} type="checkbox" value={1} onChange={() => paymentCheckBoxHandler(1)} /> Direct Bank Transfer
          </label>
        </span>
        <span>
          <label>
            <input
              checked={paymentState == 2 ? true : false}
              type="checkbox"
              value={2}
              onChange={() => paymentCheckBoxHandler(2)}
              disabled={country == "HU" ? false : true}
            />{" "}
            COD Cash On Demand
          </label>
        </span>
        <span>
          <label>
            <input checked={paymentState == 3 ? true : false} type="checkbox" value={3} onChange={() => paymentCheckBoxHandler(3)} /> Stripe
          </label>
        </span>
      </div>
      <div class="row">
        <div></div>
        <div class="col-sm-5 clearfix">
          <div class="bill-to">
            <p>Shipping to</p>
            <div style={{ marginBottom: "1rem" }}>
              <a
                className="shippingOptionItem"
                onClick={(e) => {
                  e.preventDefault();
                  setShippingToPclShop(false);
                }}
              >
                To My Address
              </a>
              <a
                className="shippingOptionItem"
                onClick={(e) => {
                  e.preventDefault();
                  setShippingToPclShop(true);
                }}
              >
                To ParcelShop
              </a>
            </div>
            <div class="form-one">
              <form>
                <input type="text" value={name} placeholder="Name" onChange={(e) => setName(e.target.value)} />
                <div className="ownDrop dropdown" style={{ marginBottom: "1em" }}>
                  <select
                    value={country}
                    className="ui dropdown"
                    onChange={(e) => {
                      setCountry(e.target.value);
                    }}
                  >
                    <option value="HU">Hungary</option>
                    <option value="SK">Slovakia</option>
                    <option value="SI">Slovenia</option>
                    <option value="HR">Croatia</option>
                    <option value="CZ">Czeh republic</option>
                    <option value="RO">Romania</option>
                  </select>
                </div>
                <form style={{ display: shippingToPclshop == true ? "none" : "" }}>
                  <input style={{ background: "#f0f0e9" }} value={zipCode} type="text" placeholder="ZipCode" onChange={(e) => setZipCode(e.target.value)} />
                  <input style={{ background: "#f0f0e9" }} value={city} type="text" placeholder="City" onChange={(e) => setCity(e.target.value)} />
                  <input style={{ background: "#f0f0e9" }} value={street} type="text" placeholder="Street" onChange={(e) => setStreet(e.target.value)} />
                </form>
                {/*         <div class="form-two"></div> */}
              </form>
              <form style={{ display: shippingToPclshop == false ? "none" : "" }} className="pclshop">
                <input
                  type="text"
                  placeholder="Search ParcelShop"
                  onChange={(e) => {
                    let matchedParcelShops = [];

                    parcelShops.map((a, b) => {
                      const searchResult = a.searchValue.includes(formatter.inputValueSanitazer(e.target.value));
                      if (searchResult) {
                        matchedParcelShops.push(a);
                      }
                    });

                    setSearchedParcelShop(matchedParcelShops);
                  }}
                />
                {/*                 {<ul>
                  <p>Search result</p>
                  {searchedParcelShop.map((a, b) => {
                    return (
                      <li>
                        <div>
                          <div>{a.name}</div>
                          <div>{`${a.zipcode} ${a.city}`}</div>
                          <div>{a.address}</div>
                        </div>
                      </li>
                    );
                  })}
                </ul>} */}

                <div class="left-canvas" style={{ height: "32rem", width: "46rem", overflow: "auto" }}>
                  <div id="psitems-canvas" style={{ margin: "0px" }}>
                    {searchedParcelShop.map((a) => {
                      return (
                        <div
                          class="sidebarListItem"
                          style={{
                            padding: "10px",
                            cursor: "pointer",
                            background: a.pclshopid == selectedParcelShop ? "#17bebb" : "",
                            color: a.pclshopid == selectedParcelShop ? "white" : "",
                          }}
                          onClick={(e) => {
                            setSelectedParcelShop(a.pclshopid);
                            getOpeningInformation(a.pclshopid);
                            setSelectedParcelShopData(a);
                          }}
                        >
                          {a.name}
                          <br />
                          {`${a.zipcode} ${a.city}`}
                          <br />
                          {a.address}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </form>
            </div>
            <div class="form-two">
              <form>
                <input value={email} type="text" placeholder="Email Address" onChange={(e) => setEmail(e.target.value)} />
                <input value={phone} type="text" placeholder="Phone number" onChange={(e) => setPhone(e.target.value)} />
              </form>
            </div>
          </div>
        </div>

        <div class="col-sm-4">
          <div class="order-message">
            <p>Extra Shipping information</p>
            <textarea value={content} name="message" placeholder="Maximum 255 character long" rows="16" onChange={(e) => setContent(e.target.value)}></textarea>
          </div>
          <div>
            <div class="leaflet-popup-content-wrapper">
              <h3>Selected ParcelShop</h3>
              <div class="leaflet-popup-content" style={{ width: "201px" }}>
                <div class="popupDiv">
                  <div class="popUpName">{selectedParcelShopData.name}</div>
                  <div class="popUpAddress">{selectedParcelShopData.address}</div>
                  <div class="popUpPhone">{selectedParcelShopData.phone}</div>
                  <div class="openingTable">
                    Opening:
                    <table>
                      <thead></thead>
                      <tbody>
                        {selectedPclShopOpening
                          ? selectedPclShopOpening.map((a, b) => {
                              return (
                                <tr key={b}>
                                  <td>{a.day}</td>
                                  <td>{a.open}</td>
                                </tr>
                              );
                            })
                          : ""}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <a
        onClick={() => {
          const inputValidation = inputValidator();

          if (inputValidation.length > 0) {
            setOpen(true);
            return;
          }

          if (paymentState == 3) {
            sendOrderWithStripe();
          } else {
            sendOrder();
          }
        }}
        class="btn btn-primary"
        disabled={cartCounter >= 1 ? false : true}
        style={{
          marginTop: "4em",
          height: "4em",
          width: "12em",
          fontSize: "x-large",
          marginBottom: "2em",
          textAlign: "center",
          lineHeight: "75px",
        }}
      >
        Complete order
      </a>

      <React.Fragment>
        <Modal style={{ marginBottom: "22rem" }} onClose={() => setOpen(false)} onOpen={() => setOpen(true)} open={open}>
          <Modal.Header>Error description</Modal.Header>
          <Modal.Content image>
            <Modal.Description>
              <Header>Error Details</Header>
              {inputValidator().map((a) => (
                <p>{a}</p>
              ))}
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button
              content="Ok"
              labelPosition="right"
              icon="checkmark"
              onClick={() => {
                setOpen(false);
              }}
              positive
            />
          </Modal.Actions>
        </Modal>
      </React.Fragment>
    </div>
  );
};

export default ShopperInformatios;
