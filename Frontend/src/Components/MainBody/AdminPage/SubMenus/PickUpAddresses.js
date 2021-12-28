import React, { useState } from "react";
import CreateNewMyglsAccount from "./ManageMyglsAccounts/CreateMyglsAccount";
import ManageMyglsAccounts from "./ManageMyglsAccounts/ManageMyglsAccounts";
import CreateNewPickupAddress from "./PickUpaddresses/CreateNewPickupAddress";
import ManagePickupAddresses from "./PickUpaddresses/ManagePickupAddresses";

const PickupAddresses = () => {
  var axios = require("axios");
  const [myglsAccountName, setMyglsAccountName] = useState("");
  const [myglsClientNumber, setMyglsClientNumber] = useState("");
  const [myglsPassword, setMyglsPassword] = useState("");
  const [myglsCountry, setMyglsCountry] = useState("HU");
  const [myglsTypeOfPrinter, setMyglsTypeOfPrinter] = useState("A4_2x2");

  const [refresh, setRefresh] = useState(true);

  const refreshPage = () => {
    setRefresh(!refresh);
  };
  return (
    <div class="ui segment">
      <CreateNewPickupAddress refresh={refreshPage} />
      <ManagePickupAddresses />
    </div>
  );
};

export default PickupAddresses;
