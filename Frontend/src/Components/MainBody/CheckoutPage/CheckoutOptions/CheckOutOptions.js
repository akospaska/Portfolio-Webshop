import React from 'react';
import { GiCancel } from 'react-icons/gi';
const CheckOutOptions = () => {
  return (
    <div class="checkout-options">
      <h3>New User</h3>
      <p>Checkout options</p>
      <ul class="nav">
        <li>
          <label>
            <input type="checkbox" /> Register Account
          </label>
        </li>
        <li>
          <label>
            <input type="checkbox" /> Guest Checkout
          </label>
        </li>
        <li>
          <a href="">
            <GiCancel />
            Cancel
          </a>
        </li>
      </ul>
    </div>
  );
};

export default CheckOutOptions;
