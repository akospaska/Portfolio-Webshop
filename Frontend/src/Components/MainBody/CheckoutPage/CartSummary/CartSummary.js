import React from "react";
import { useSelector } from "react-redux";

const CartSummary = (props) => {
  const getSummary = () => {
    if (props.cartItems) {
      let summary = 0;
      props.cartItems.map((a) => (summary = summary + a.finalPrice * a.count));
      return summary.toFixed(2);
    } else return 0;
  };

  return (
    <tr>
      <td colspan="4">&nbsp;</td>
      <td colspan="2">
        <table class="table table-condensed total-result">
          <tr>
            <td>Total</td>
            <td>
              <span>{getSummary()} Huf</span>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  );
};

export default CartSummary;
