import React, { useState } from "react";

import { useEffect } from "react";

import GraphQlConfig from "../../../../Api/GraphQuery";

import { setRefreshCartSize } from "../../../../../actions";
import { Button, Header, Image, Modal } from "semantic-ui-react";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

var axios = require("axios");

const ManagePickupAddresses = () => {
  const [fake, setFake] = useState(false);

  const refreshCartSize = useSelector((state) => state.refreshCartSize);
  const [open, setOpen] = React.useState(false);

  /*pickupaddress*/
  const [country, setCountry] = useState("HU");
  const [name, setName] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");

  const [contactPerson, setContactPerson] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isDefault, setIsDefault] = useState(0);

  const [actualPickupAddressId, setActualPickupAddressId] = useState(0);

  const [pickupAddresses, setPickupAddresses] = useState([]);

  const adminStatus = useSelector((state) => state.adminStatus);
  const demoAdminStatus = useSelector((state) => state.demoAdminStatus);
  const [open2, setOpen2] = React.useState(false);

  const getPickupAddresses = () => {
    //query taragets 1->Categories or 2->Brands

    const query = `{pickupAddress{id,Name,Country,ZipCode,City,Address,ContactName,Phone,Email,isDefault}}`;

    axios(GraphQlConfig(query))
      .then(function (response) {
        const apiResponse = response.data.data.pickupAddress;

        const actualIdPlace = apiResponse.findIndex((a) => a.id == actualPickupAddressId);

        setPickupAddresses(apiResponse);
        setActualPickupAddressId(apiResponse[actualIdPlace].id);

        console.log(pickupAddresses);
        console.log(actualPickupAddressId);
      })
      .catch(function (error) {});
  };

  const deletePickupAddress = (pickupAddressId) => {
    if (adminStatus != true) {
      setOpen2();
      return;
    }
    //query taragets 1->Categories or 2->Brands

    const query = `mutation {deletePickupAddress(pickupAddressId:${pickupAddressId}){affectedRows}}`;

    axios(GraphQlConfig(query))
      .then(function (response) {
        setActualPickupAddressId(pickupAddresses[0].id);
        getPickupAddresses();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const setPickupAddressValues = (pickupId) => {
    const x = pickupId == 0 ? pickupAddresses[0] : pickupAddresses.find((a, b) => a.id == pickupId);

    setName(x.Name);

    setCountry(x.Country);

    setZipCode(x.ZipCode);

    setCity(x.City);

    setStreet(x.Address);

    setContactPerson(x.ContactName);

    setEmail(x.Email);

    setPhone(x.Phone);

    setIsDefault(x.isDefault);
  };

  useEffect(() => {
    getPickupAddresses();
  }, [fake, refreshCartSize]);

  useEffect(() => {
    try {
      setPickupAddressValues(actualPickupAddressId);
    } catch (err) {
      console.log(err);
    }
  }, [actualPickupAddressId, pickupAddresses]);

  const saveChanges = () => {
    const query = `mutation{updatePickUpAddress(id:${actualPickupAddressId},Name:"${name}",Country:"${country}",ZipCode:"${zipCode}",City:"${city}",Address:"${street}",ContactName:"${contactPerson}",Phone:"${phone}",Email:"${email}",isDefault:${isDefault}){fieldCount}}`;

    axios(GraphQlConfig(query))
      .then(function (response) {
        const apiResponse = response.data.data.pickupAddress;

        getPickupAddresses();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div class="ui segment">
      <div class="row">
        <div class="col-sm-4">
          <div class="signup-form">
            <h2>Pickup address settings</h2>
            <label for="cars">Choose an account:</label>
            <select
              value={actualPickupAddressId}
              onChange={(e) => {
                setActualPickupAddressId(e.target.value);
              }}
            >
              {pickupAddresses.map((a) => (
                <option value={a.id}>{a.Name}</option>
              ))}
            </select>
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
              <input value={contactPerson} onChange={(e) => setContactPerson(e.target.value)} type="text" placeholder="Contact Person" />
              <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Email address" />
              <input value={phone} onChange={(e) => setPhone(e.target.value)} type="text" placeholder="Telephone" />
              <div>
                <label>Default:</label>
                <select value={isDefault} className="ui dropdown" onChange={(e) => setIsDefault(e.target.value)}>
                  <option value={0}>No</option>
                  <option value={1}>Yes</option>
                </select>
              </div>
              <button
                class="btn btn-default"
                onClick={(e) => {
                  e.preventDefault();

                  saveChanges();
                }}
              >
                Save Pickup details
              </button>
              <button
                style={{ marginTop: "1rem" }}
                class="btn btn-default"
                onClick={(e) => {
                  e.preventDefault();
                  setOpen(true);
                }}
              >
                Delete PickUp address
              </button>
            </form>
          </div>
        </div>
      </div>
      <React.Fragment>
        <Modal style={{ marginBottom: "30rem" }} onClose={() => setOpen(false)} onOpen={() => setOpen(true)} open={open}>
          <Modal.Header>Attention!</Modal.Header>
          <Modal.Content image>
            <Modal.Description>
              <Header>Are You sure would like to delete this Pickup Address ?</Header>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button
              content="Ok"
              labelPosition="right"
              icon="checkmark"
              onClick={() => {
                deletePickupAddress(actualPickupAddressId);
                setOpen(false);
              }}
              positive
            />
            <Button
              content="No"
              labelPosition="right"
              icon="checkmark"
              onClick={() => {
                setOpen(false);
              }}
              negative
            />
          </Modal.Actions>
        </Modal>
      </React.Fragment>

      <React.Fragment>
        <Modal style={{ marginBottom: "30rem" }} onClose={() => setOpen2(false)} onOpen={() => setOpen2(true)} open={open2}>
          <Modal.Header>Error description</Modal.Header>
          <Modal.Content image>
            <Modal.Description>
              <Header>Are You Sure?!</Header>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button
              content="Sure"
              labelPosition="right"
              icon="checkmark"
              onClick={() => {
                setOpen2(false);
              }}
              positive
            />
            <Button
              content="NoNoNo"
              labelPosition="right"
              icon="checkmark"
              onClick={() => {
                setOpen2(false);
              }}
              negative
            />
          </Modal.Actions>
        </Modal>
      </React.Fragment>
    </div>
  );
};

export default ManagePickupAddresses;
