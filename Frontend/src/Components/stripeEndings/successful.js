import React from "react";

import { useState } from "react";

const Successful = () => {
  const [timer, setTimer] = useState(7);

  /*  setInterval(() => {
    setTimer(timer - 1);
  }, 1000); */

  if (timer == 0) {
    window.location.href = "/";
  }
  return (
    <div style={{ marginLeft: "40rem" }}>
      <h1>Payment successful</h1>
      <h3>You will be redirected in {timer} seconds</h3>
    </div>
  );
};

export default Successful;

//
