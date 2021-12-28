import React from "react";
import { useState } from "react";
import { useEffect } from "react";

import GraphQlConfig from "../../../../Api/GraphQuery";
import ProductsPage from "../../../ProductsPage/ProductsPage";
import { Button, Header, Image, Modal } from "semantic-ui-react";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { setRefreshCartSize } from "../../../../../actions";

const CreateNewPickupAddress = (props) => {
  var axios = require("axios");
  const [country, setCountry] = useState("HU");
  const [name, setName] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [houseNumberInfo, setHouseNumberInfo] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const adminStatus = useSelector((state) => state.adminStatus);
  const demoAdminStatus = useSelector((state) => state.demoAdminStatus);
  const [open2, setOpen2] = React.useState(false);

  const dispatch = useDispatch();

  const resetAllInputValue = () => {
    setCountry("hu");
    setName("");
    setZipCode("");
    setCity("");
    setStreet("");
    setHouseNumber("");
    setHouseNumberInfo("");
    setContactPerson("");
    setEmail("");
    setPhone("");
  };
  const refreshCartSize = useSelector((state) => state.refreshCartSize);

  const createNewPicupAddress = () => {
    if (adminStatus != true) {
      setOpen2(true);
      return;
    }
    const query = `mutation{createNewPickupAddress(Name:"${name}",Country:"${country}",ZipCode:"${zipCode}",City:"${city}",Address:"${street}",ContactName:"${contactPerson}",Phone:"${phone}",Email:"${email}"){fieldCount}}`;

    axios(GraphQlConfig(query))
      .then(function (response) {
        const apiResponse = response.data.data.pickupAddress;

        dispatch(setRefreshCartSize(!refreshCartSize));
        resetAllInputValue();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  /*  useEffect(() => {
    // getAccountDetail();
  }, []); */

  return (
    <div class="ui segment">
      <div class="row">
        <div class="col-sm-4">
          <div class="signup-form">
            <h2>Create new Pickup address</h2>
            <form>
              <input value={name} onChange={(e) => setName(e.target.value)} type="email" placeholder="Pickup Name" />

              <div className="ownDrop dropdown" style={{ marginBottom: "1em" }}>
                <select className="ui dropdown" value={country} onChange={(e) => setCountry(e.target.value)}>
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
              <input value={houseNumber} onChange={(e) => setHouseNumber(e.target.value)} type="text" placeholder="Housenumber" />
              <input value={houseNumberInfo} onChange={(e) => setHouseNumberInfo(e.target.value)} type="text" placeholder="HouseNumber Info" />
              <input value={contactPerson} onChange={(e) => setContactPerson(e.target.value)} type="text" placeholder="Contact Person" />
              <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Email address" />
              <input value={phone} onChange={(e) => setPhone(e.target.value)} type="text" placeholder="Telephone" />
              <button
                class="btn btn-default"
                onClick={(e) => {
                  e.preventDefault();
                  if (adminStatus != true) {
                    setOpen2(true);
                    return;
                  }
                  createNewPicupAddress();
                }}
              >
                Save delivery details
              </button>
            </form>
          </div>
        </div>
      </div>
      <React.Fragment>
        <Modal style={{ marginBottom: "30rem" }} onClose={() => setOpen2(false)} onOpen={() => setOpen2(true)} open={open2}>
          <Modal.Header>Error description</Modal.Header>
          <Modal.Content image>
            <Modal.Description>
              <Header>Access Denied!</Header>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button
              content="Ok"
              labelPosition="right"
              icon="checkmark"
              onClick={() => {
                setOpen2(false);
              }}
              positive
            />
          </Modal.Actions>
        </Modal>
      </React.Fragment>
    </div>
  );
};

export default CreateNewPickupAddress;
