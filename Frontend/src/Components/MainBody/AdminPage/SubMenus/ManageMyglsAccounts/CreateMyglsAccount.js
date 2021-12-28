import React from "react";

import { useState } from "react";

import GraphQlConfig from "../../../../Api/GraphQuery";

import { setRefreshCartSize } from "../../../../../actions";
import { Button, Header, Image, Modal } from "semantic-ui-react";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const CreateNewMyglsAccount = () => {
  var axios = require("axios");
  const [myglsAccountName, setMyglsAccountName] = useState("");
  const [myglsClientNumber, setMyglsClientNumber] = useState("");
  const [myglsPassword, setMyglsPassword] = useState("");
  const [myglsCountry, setMyglsCountry] = useState("HU");
  const [myglsTypeOfPrinter, setMyglsTypeOfPrinter] = useState("A4_2x2");

  const [open2, setOpen2] = React.useState(false);

  const dispatch = useDispatch();
  const refreshCartSize = useSelector((state) => state.refreshCartSize);

  const adminStatus = useSelector((state) => state.adminStatus);
  const demoAdminStatus = useSelector((state) => state.demoAdminStatus);

  const resetAllInputValue = () => {
    setMyglsAccountName("");
    setMyglsClientNumber("");
    setMyglsPassword("");
    setMyglsCountry("HU");
    setMyglsTypeOfPrinter("A4_2x2");
  };

  const createNewMyglsAccount = () => {
    const query = `mutation{createNewMyglsAccount(email:"${myglsAccountName}",password:"${myglsPassword}",clientNumber:"${myglsClientNumber}",country:"${myglsCountry}",typeOfPrinter:"${myglsTypeOfPrinter}"){fieldCount}}`;

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

  return (
    <div class="ui segment">
      <div class="row">
        <div class="col-sm-4">
          <div class="signup-form">
            <h2>Create New Account</h2>

            <form>
              <input value={myglsAccountName} onChange={(e) => setMyglsAccountName(e.target.value)} type="email" placeholder="Mygls Account name" />
              <input value={myglsPassword} onChange={(e) => setMyglsPassword(e.target.value)} type="password" placeholder="Mygls Account password" />
              <input value={myglsClientNumber} onChange={(e) => setMyglsClientNumber(e.target.value)} type="number" placeholder="Mygls Account clientNumber" />

              <div className="ownDrop dropdown" style={{ marginBottom: "1em" }}>
                <label>Country:</label>
                <select value={myglsCountry} className="ui dropdown" onChange={(e) => setMyglsCountry(e.target.value)}>
                  <option value="HU">Hungary</option>
                  <option value="SK">Slovakia</option>
                  <option value="SI">Slovenia</option>
                  <option value="HR">Croatia</option>
                  <option value="CZ">Czeh republic</option>
                  <option value="RO">Romania</option>
                </select>
              </div>

              <div className="ownDrop dropdown" style={{ marginBottom: "1em" }}>
                <label>Type of printer:</label>
                <select value={myglsTypeOfPrinter} className="ui dropdown" onChange={(e) => setMyglsTypeOfPrinter(e.target.value)}>
                  <option value="A4_2x2">A4_2x2</option>
                  <option value="A4_4x1">A4_4x1</option>
                  <option value="Connect">Connect</option>
                  <option value="Thermo">Thermo</option>
                </select>
              </div>

              <button
                class="btn btn-default"
                onClick={(e) => {
                  e.preventDefault();
                  if (adminStatus != true) {
                    setOpen2(true);
                    return;
                  }
                  createNewMyglsAccount();
                }}
              >
                Register Mygls Account
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

export default CreateNewMyglsAccount;
