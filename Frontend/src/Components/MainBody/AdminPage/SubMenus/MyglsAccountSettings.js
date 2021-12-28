import React, { useState } from "react";
import CreateNewMyglsAccount from "./ManageMyglsAccounts/CreateMyglsAccount";
import ManageMyglsAccounts from "./ManageMyglsAccounts/ManageMyglsAccounts";

const MyglsAccountSettings = () => {
  return (
    <div class="ui segment">
      <CreateNewMyglsAccount />
      <ManageMyglsAccounts />
    </div>
  );
};

export default MyglsAccountSettings;
