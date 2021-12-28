import React, { useState } from "react";

const PaymentOptions = () => {
  const [paymentState, setPayMentState] = useState(1);

  const paymentCheckBoxHandler = (newValue) => {
    newValue == paymentState ? "" : setPayMentState(newValue);
  };

  return (
    <div class="payment-options">
      <span>
        <label>
          <input checked={paymentState == 1 ? true : false} type="checkbox" value={1} onChange={() => paymentCheckBoxHandler(1)} /> Direct Bank Transfer
        </label>
      </span>
      <span>
        <label>
          <input checked={paymentState == 2 ? true : false} type="checkbox" value={2} onChange={() => paymentCheckBoxHandler(2)} /> COD Cash On Demand
        </label>
      </span>
      <span>
        <label>
          <input checked={paymentState == 3 ? true : false} type="checkbox" value={3} onChange={() => paymentCheckBoxHandler(3)} /> Stripe
        </label>
      </span>
    </div>
  );
};

export default PaymentOptions;
