import React, { useState } from 'react';
import CreateNewAdminAccount from './ManageAdminAccounts/CreateNewAdminAccount';
import DeleteAdminAccounts from './ManageAdminAccounts/DeleteAdminAccounts';

const ManageAdminAccounts = (porps) => {
  const [fake, setFake] = useState(true);

  const forceRefresh = () => {
    setFake(!fake);
  };
  return (
    <div class="ui segment">
      <CreateNewAdminAccount />
      <DeleteAdminAccounts />
    </div>
  );
};

export default ManageAdminAccounts;
