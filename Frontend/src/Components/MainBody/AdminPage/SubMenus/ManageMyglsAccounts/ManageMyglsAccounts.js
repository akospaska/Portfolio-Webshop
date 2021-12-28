import React, { useState } from "react";

import { useEffect } from "react";

import GraphQlConfig from "../../../../Api/GraphQuery";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setRefreshCartSize } from "../../../../../actions";
import { Button, Header, Image, Modal } from "semantic-ui-react";
import axios from "axios";

const ManageMyglsAccounts = () => {
  const [myglsAccountName, setMyglsAccountName] = useState("");
  const [myglsClientNumber, setMyglsClientNumber] = useState("");
  const [myglsPassword, setMyglsPassword] = useState("");
  const [myglsCountry, setMyglsCountry] = useState("HU");
  const [myglsTypeOfPrinter, setMyglsTypeOfPrinter] = useState("A4_2x2");
  const [isDefault, setIsDefault] = useState(0);

  const [actualMyglsAccountId, setActualMyglsAccountId] = useState(0);
  const [myglsAccounts, setMyglsAccounts] = useState([]);

  const dispatch = useDispatch();
  const refreshCartSize = useSelector((state) => state.refreshCartSize);

  const [open2, setOpen2] = React.useState(false);
  const adminStatus = useSelector((state) => state.adminStatus);

  const setMyglsValues = () => {
    const positionOfActualAccount = myglsAccounts.findIndex((a) => a.id == actualMyglsAccountId);
    const actualMyglsAccount = myglsAccounts[positionOfActualAccount];

    try {
      setMyglsAccountName(actualMyglsAccount.email);
      setMyglsClientNumber(actualMyglsAccount.clientNumber);
      setMyglsCountry(actualMyglsAccount.country);
      setMyglsTypeOfPrinter(actualMyglsAccount.typeOfPrinter);
      setIsDefault(actualMyglsAccount.isDefault);
    } catch (error) {}
  };
  const getMyglsAccounts = () => {
    //query taragets 1->Categories or 2->Brands

    const query = `{myglsAccount{id,email,clientNumber,country,typeOfPrinter,isDefault,defaultServices{serviceId,serviceDetails{code,description}}}}`;

    axios(GraphQlConfig(query))
      .then(function (response) {
        setMyglsAccounts(response.data.data.myglsAccount);
        setActualMyglsAccountId(response.data.data.myglsAccount[0].id);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const setAccountValues = (accountId) => {
    const x = accountId == 0 ? myglsAccounts[0] : myglsAccounts.find((a, b) => a.id == accountId);

    setMyglsAccountName(x.email);
    setMyglsClientNumber(x.clientNumber);
    setMyglsPassword(x.password);
    setMyglsCountry(x.country);
    setMyglsTypeOfPrinter(x.typeOfPrinter);
    setIsDefault(x.isDefault);
  };

  useEffect(() => {
    getMyglsAccounts();
  }, [refreshCartSize]);

  useEffect(() => {
    try {
      setMyglsValues();
    } catch (error) {
      console.log(error);
    }
  }, [myglsAccounts]);

  useEffect(() => {
    try {
      setAccountValues(actualMyglsAccountId);
    } catch (err) {}
  }, [actualMyglsAccountId, myglsAccounts]);

  const saveChanges = () => {
    const query = `mutation{updateMyglsAccount(myglsAccountId:${actualMyglsAccountId},email:"${myglsAccountName}",clientNumber:"${myglsClientNumber}",country:"${myglsCountry}",typeOfPrinter:"${myglsTypeOfPrinter}",isDefault:${isDefault}){fieldCount}}`;

    axios(GraphQlConfig(query))
      .then(function (response) {
        dispatch(setRefreshCartSize(!refreshCartSize));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const deleteMyglsAccount = () => {
    const query = `mutation{deleteMyglsAccount(myglsAccountId:${actualMyglsAccountId}){fieldCount}}`;

    axios(GraphQlConfig(query))
      .then(function (response) {
        dispatch(setRefreshCartSize(!refreshCartSize));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const defaultServiceChecker = (serviceCode) => {
    try {
      const selectedMyglsAccount = myglsAccounts.find((a) => a.id == actualMyglsAccountId);

      return selectedMyglsAccount.defaultServices.some((element) => element.serviceDetails.code == serviceCode);
    } catch (error) {
      return false;
    }
  };

  const toggleService = (serviceId) => {
    if (adminStatus != true) {
      setOpen2(true);
      return;
    }
    const selectedMyglsAccount = myglsAccounts.find((a) => a.id == actualMyglsAccountId);

    const query = `mutation{toogleMyglsAccountDefaultService(myglsAccountId:${selectedMyglsAccount.id},serviceId:${serviceId}){fieldCount}}`;

    axios(GraphQlConfig(query))
      .then(function (response) {
        dispatch(setRefreshCartSize(!refreshCartSize));
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
            <h2>Mygls settings</h2>
            <label for="cars">Choose an account:</label>
            <select
              value={actualMyglsAccountId}
              onChange={(e) => {
                setActualMyglsAccountId(e.target.value);
              }}
            >
              {myglsAccounts.map((a) => (
                <option value={a.id}>{a.email}</option>
              ))}
            </select>
            <form>
              <input value={myglsAccountName} onChange={(e) => setMyglsAccountName(e.target.value)} type="email" placeholder="Mygls Account name" />
              <input value={myglsPassword} onChange={(e) => setMyglsPassword(e.target.value)} type="text" placeholder="Mygls Account password" />
              {adminStatus ? (
                <input
                  value={myglsClientNumber}
                  onChange={(e) => setMyglsClientNumber(e.target.value)}
                  type="number"
                  placeholder="Mygls Account clientNumber"
                />
              ) : (
                ""
              )}

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
              <div>
                <label>Default:</label>
                <select value={isDefault} className="ui dropdown" onChange={(e) => setIsDefault(e.target.value)}>
                  <option value={0}>No</option>
                  <option value={1}>Yes</option>
                </select>
              </div>

              <button
                style={{ marginTop: "1rem" }}
                class="btn btn-default"
                onClick={(e) => {
                  e.preventDefault();
                  if (adminStatus != true) {
                    setOpen2(true);
                    return;
                  }
                  saveChanges();
                }}
              >
                Save settings
              </button>

              <button
                style={{ marginTop: "1rem" }}
                class="btn btn-default"
                onClick={(e) => {
                  e.preventDefault();
                  if (adminStatus != true) {
                    setOpen2(true);
                    return;
                  }
                  setActualMyglsAccountId(0);
                  deleteMyglsAccount();
                }}
              >
                Delete Mygls Account
              </button>
            </form>
          </div>
        </div>
        <div class="col-sm-4" style={{ marginTop: "7rem" }}>
          <h2 style={{ marginLeft: "38px" }}>Default Services</h2>
          <ul>
            <li style={{ width: "50rem", fontSize: "20px", marginBottom: "2rem" }}>
              <input
                checked={defaultServiceChecker("FDS")}
                type="checkbox"
                value={1}
                onClick={(e) => {
                  toggleService(e.target.value);
                }}
              />{" "}
              FlexDeliveryService (Email Sending)
            </li>
            <li style={{ width: "50rem", fontSize: "20px", marginBottom: "2rem" }}>
              <input
                checked={defaultServiceChecker("FSS")}
                type="checkbox"
                value={2}
                onClick={(e) => {
                  toggleService(e.target.value);
                }}
              />{" "}
              FlexDeliveryServiceSMS (Sms Sending)
            </li>
            <li style={{ width: "50rem", fontSize: "20px", marginBottom: "2rem" }}>
              <input
                checked={defaultServiceChecker("CS1")}
                type="checkbox"
                value={4}
                onClick={(e) => {
                  toggleService(e.target.value);
                }}
              />{" "}
              ContactService (Phone call)
            </li>
            <li style={{ width: "50rem", fontSize: "20px", marginBottom: "2rem" }}>
              <input
                checked={defaultServiceChecker("SM2")}
                type="checkbox"
                value={3}
                onClick={(e) => {
                  toggleService(e.target.value);
                }}
              />{" "}
              PreadviceService (SMS)
            </li>
          </ul>
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

export default ManageMyglsAccounts;
