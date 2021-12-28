import React from "react";
import { useState } from "react";
import { useEffect } from "react";

import GraphQlConfig from "../../../Api/GraphQuery";

const getAccountDetailsQuery =
  "{accountDetail{id,deliveryName,deliveryCountry,deliveryZipCode,deliveryCity,deliveryStreet,deliveryContactEmail,deliveryContactPhone,creationDate}}";

const AccountDetailsSettings = () => {
  var axios = require("axios");
  const [country, setCountry] = useState("HU");
  const [name, setName] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const getAccountDetails = () => {
    axios(GraphQlConfig(getAccountDetailsQuery))
      .then(function (response) {
        const { deliveryName, deliveryCountry, deliveryZipCode, deliveryCity, deliveryStreet, deliveryContactEmail, deliveryContactPhone } =
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

  const updateAccountDetailsQuery = `mutation {updateAccountDetail(deliveryName:"${name}",deliveryCountry:"${country}",deliveryZipCode:"${zipCode}",deliveryCity:"${city}",deliveryStreet:"${street}",deliveryContactEmail:"${email}",deliveryContactPhone:"${phone}"){affectedRows}}`;
  const updateAccountDetails = () => {
    axios(GraphQlConfig(updateAccountDetailsQuery))
      .then(function (response) {})
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    getAccountDetails();
  }, []);

  return (
    <div class="ui segment">
      <div class="row">
        <div class="col-sm-4">
          <div class="signup-form">
            <h2>Account and delivery details</h2>
            <form>
              <input value={name} onChange={(e) => setName(e.target.value)} type="email" placeholder="Delivery Name" />

              <div className="ownDrop dropdown" style={{ marginBottom: "1em" }}>
                <select className="ui dropdown" onChange={(e) => setCountry(e.target.value)}>
                  <option value="HU">Hungary</option>
                  <option value="SK">Slovakia</option>
                  <option value="SI">Slovenia</option>
                  <option value="HR">Croatia</option>
                  <option value="CZ">Czeh republic</option>
                  <option value="RO">Romania</option>
                </select>
              </div>
              <input value={zipCode} onChange={(e) => setZipCode(e.target.value)} type="text" placeholder="ZipCode" />
              <input value={city} onChange={(e) => setCity(e.target.value)} type="text" placeholder="City" />
              <input value={street} onChange={(e) => setStreet(e.target.value)} type="text" placeholder="Street" />
              <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Email address" />
              <input value={phone} onChange={(e) => setPhone(e.target.value)} type="text" placeholder="Telephone" />
              <button
                class="btn btn-default"
                onClick={(e) => {
                  e.preventDefault();
                  updateAccountDetails();
                }}
              >
                Save delivery details
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountDetailsSettings;
