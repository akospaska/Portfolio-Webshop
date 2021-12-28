import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Button, Header, Image, Modal } from "semantic-ui-react";

const CreateNewAdminAccount = (porps) => {
  var axios = require("axios");
  const [adminEmailAddress, setAdminEmailAddress] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [adminPasswordAgain, setAdminPasswordAgain] = useState("");

  const adminStatus = useSelector((state) => state.adminStatus);
  const demoAdminStatus = useSelector((state) => state.demoAdminStatus);

  const [open, setOpen] = React.useState(false);

  const sendAccountRegisterRequest = () => {
    var axios = require("axios");

    var data = JSON.stringify({
      email: adminEmailAddress,
      password: adminPassword,
    });

    var config = {
      method: "post",
      url: "/api/createnewadminaccount",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        if (response.data == "Account is allready in use") {
          alert(response.data);
        } else {
          alert("Check your e-mail address");
        }
      })
      .catch(function (error) {
        console.log(error);

        alert("Wrong credentials.");
      });
  };

  const [displayStatus, setDisplayStatus] = useState(false);
  let displayStatusStyle = displayStatus ? {} : { display: "none" };
  return (
    <div class="ui segment">
      <div class="row">
        <div style={{ paddingLeft: "2rem", paddingRight: "2rem" }}>
          <button
            class="ui button"
            style={{ float: "right" }}
            onClick={() => {
              setDisplayStatus(!displayStatus);
            }}
          >
            Show
          </button>
          <h2>Create New Admin Accounts</h2>
        </div>
        <div class="col-sm-4">
          <div class="signup-form" style={displayStatusStyle}>
            <form>
              <input value={adminEmailAddress} onChange={(e) => setAdminEmailAddress(e.target.value)} type="email" placeholder="Email Address" />
              <input value={adminPassword} onChange={(e) => setAdminPassword(e.target.value)} type="password" placeholder="Account password" />
              <input value={adminPasswordAgain} onChange={(e) => setAdminPasswordAgain(e.target.value)} type="password" placeholder="Account password again" />

              <button
                class="btn btn-default"
                onClick={(e) => {
                  e.preventDefault();
                  if (adminStatus != true) {
                    setOpen(true);
                    return;
                  }
                  if (adminPassword === adminPasswordAgain) {
                    sendAccountRegisterRequest();
                    setAdminEmailAddress("");
                    setAdminPassword("");
                    setAdminPasswordAgain("");
                  } else {
                    alert("Passwords must be the same");
                  }
                }}
              >
                Create New Admin Account
              </button>
            </form>
          </div>
        </div>
      </div>
      <React.Fragment>
        <Modal style={{ marginBottom: "30rem" }} onClose={() => setOpen(false)} onOpen={() => setOpen(true)} open={open}>
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

export default CreateNewAdminAccount;
