import React from 'react';

const ChoseArea = () => {
  return (
    <div class="col-sm-6">
      <div class="chose_area">
        <ul class="user_option">
          <li>
            <input type="checkbox" />
            <label>Use Coupon Code</label>
          </li>
          <li>
            <input type="checkbox" />
            <label>Use Gift Voucher</label>
          </li>
          <li>
            <input type="checkbox" />
            <label>Estimate Shipping & Taxes</label>
          </li>
        </ul>
        <ul class="user_info">
          <li class="single_field">
            <label>Country:</label>
            <select>
              <option>United States</option>
              <option>Bangladesh</option>
              <option>UK</option>
              <option>India</option>
              <option>Pakistan</option>
              <option>Ucrane</option>
              <option>Canada</option>
              <option>Dubai</option>
            </select>
          </li>
          <li class="single_field">
            <label>Region / State:</label>
            <select>
              <option>Select</option>
              <option>Dhaka</option>
              <option>London</option>
              <option>Dillih</option>
              <option>Lahore</option>
              <option>Alaska</option>
              <option>Canada</option>
              <option>Dubai</option>
            </select>
          </li>
          <li class="single_field zip-field">
            <label>Zip Code:</label>
            <input type="text" />
          </li>
        </ul>
        <a class="btn btn-default update" href="">
          Get Quotes
        </a>
        <a class="btn btn-default check_out" href="">
          Continue
        </a>
      </div>
    </div>
  );
};

export default ChoseArea;
