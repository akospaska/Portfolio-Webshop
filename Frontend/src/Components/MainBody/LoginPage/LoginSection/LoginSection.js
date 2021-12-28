import React from "react";
import { useState } from "react";
import { setLoginStatus, setRefreshCartSize, setAdminStatus } from "../../../../actions";
import { useDispatch } from "react-redux";
import BackendRESTrequest from "../../../Api/BackendRESTrequest";

const LoginSection = () => {
  const dispatch = useDispatch();
  var axios = require("axios");
  const [loginEmail, setLoginEmail] = useState("");
  const [password, setPassword] = useState("");

  const sendLoginDetails = async () => {
    try {
      const apiResponse = await BackendRESTrequest.post("/login", { email: loginEmail, password: password });
      dispatch(setLoginStatus(apiResponse.data.isLoggedIn));
      dispatch(setRefreshCartSize(apiResponse.data.cart.length));
      dispatch(setAdminStatus(apiResponse.data.isAdminAccount));
      window.location.href = "/";
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div class="col-sm-4 col-sm-offset-1">
      <div class="login-form">
        <h2>Login to your account</h2>
        <form>
          <input value={loginEmail} type="text" placeholder="Name" onChange={(e) => setLoginEmail(e.target.value)} />
          <input value={password} type="password" placeholder="Email Address" onChange={(e) => setPassword(e.target.value)} />

          <button
            class="btn btn-default"
            onClick={(e) => {
              e.preventDefault();
              sendLoginDetails();
            }}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginSection;
