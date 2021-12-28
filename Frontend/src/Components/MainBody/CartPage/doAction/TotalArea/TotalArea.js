import React from 'react';

const TotalArea = () => {
  return (
    <div class="col-sm-6">
      <div class="total_area">
        <ul>
          <li>
            Cart Sub Total <span>$59</span>
          </li>
          <li>
            Eco Tax <span>$2</span>
          </li>
          <li>
            Shipping Cost <span>Free</span>
          </li>
          <li>
            Total <span>$61</span>
          </li>
        </ul>
        <a class="btn btn-default update" href="">
          Update
        </a>
        <a class="btn btn-default check_out" href="">
          Check Out
        </a>
      </div>
    </div>
  );
};

export default TotalArea;
