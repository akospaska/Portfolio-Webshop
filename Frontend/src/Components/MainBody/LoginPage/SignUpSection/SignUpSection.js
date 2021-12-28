import React from "react";

import { useState } from "react";

import BackendRESTrequest from "../../../Api/BackendRESTrequest";

var axios = require("axios");

const SignUpSection = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [isFetching, setIsFetching] = useState(false);

  const clearStates = () => {
    setEmail("");
    setPassword("");
    setPasswordAgain("");
    setIsFetching(false);
  };

  const sendAccountCreationSubmit = async () => {
    setIsFetching(true);

    clearStates();
    setIsFetching(false);
    try {
      const response = await BackendRESTrequest.post("/createnewpublicaccount", { email: email, password: passwordAgain });
      alert("Please check your mail box");
    } catch (err) {
      err.message.toString().includes("422") ? alert("Invalid credential requirements from backend") : "";
      err.message.toString().includes("420") ? alert("Email is allready registered") : "";
    }
  };

  return (
    <div class="col-sm-4">
      <div class="signup-form">
        <h2>New User Signup!</h2>
        <form>
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email Address" />
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
          <input value={passwordAgain} onChange={(e) => setPasswordAgain(e.target.value)} type="password" placeholder="Password" />
          <button
            type="submit"
            class="btn btn-default"
            onClick={(e) => {
              e.preventDefault();
              if (password == passwordAgain && email.includes("@")) {
                sendAccountCreationSubmit();
              } else {
                alert("Invalid email or passwords");
              }
            }}
          >
            Signup
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpSection;
