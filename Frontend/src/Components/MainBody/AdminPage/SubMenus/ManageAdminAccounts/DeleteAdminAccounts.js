import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import GraphQlConfig from "../../../../Api/GraphQuery";
import { Button, Header, Image, Modal } from "semantic-ui-react";

const DeleteAdminAccounts = (props) => {
  var axios = require("axios");
  const [adminAccountsSrc, setAdminAccountsSrc] = useState([]);
  const [fake, setFake] = useState(true);

  const [open, setOpen] = React.useState(false);

  const [open2, setOpen2] = React.useState(false);
  const adminStatus = useSelector((state) => state.adminStatus);
  const demoAdminStatus = useSelector((state) => state.demoAdminStatus);

  const getAdminAccounts = () => {
    const query = `{adminAccount{id,email,isActive,creationDate}}`;

    axios(GraphQlConfig(query))
      .then(function (response) {
        setAdminAccountsSrc(response.data.data.adminAccount);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  useEffect(() => {
    getAdminAccounts();
  }, [fake]);

  const deleteAccount = (accountId) => {
    const query = `mutation{deleteAdminAccount(adminAccountId:${accountId}){fieldCount}}`;

    axios(GraphQlConfig(query))
      .then(function (response) {
        setFake(!fake);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const toggleActiveStatus = (accountId) => {
    const query = `mutation{toggleStatusAdminAccount(adminAccountId:${accountId}){fieldCount}}`;

    axios(GraphQlConfig(query))
      .then(function (response) {
        setFake(!fake);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div class="ui segment">
      <h2>Delete Admin accounts</h2>
      <div class="ui middle aligned divided list" style={{ width: "30rem" }}>
        {adminAccountsSrc.map((a) => (
          <div class="item" style={{ marginTop: "1rem" }}>
            <div class="right floated content">
              <div
                class="ui button"
                onClick={() => {
                  if (adminStatus != true) {
                    setOpen2(true);
                    return;
                  }
                  setOpen(true);
                }}
              >
                Delete
              </div>
            </div>
            <div class="content">{a.email}</div>
            Active:
            <input
              /*   onChange={(e) => props.testFunction(id)} */ // setCheckboxValue(!checkboxValue)}
              /*  checked={props.checkStatus} */
              type="checkbox"
              checked={a.isActive == 1 ? true : false}
              onClick={(e) => {
                if (adminStatus != true) {
                  setOpen2(true);
                  return;
                }
                toggleActiveStatus(a.id);
              }}
              style={{ marginLeft: "1rem" }}
            />
            <React.Fragment>
              <Modal style={{ marginBottom: "30rem" }} onClose={() => setOpen(false)} onOpen={() => setOpen(true)} open={open}>
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
                      deleteAccount(a.id);
                      setOpen(false);
                    }}
                    positive
                  />
                  <Button
                    content="NoNoNo"
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
          </div>
        ))}
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

export default DeleteAdminAccounts;
