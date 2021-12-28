import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import OrderItem from "./orderItem/OrderItem";

import GraphQlConfig from "../../../Api/GraphQuery";
import axios from "axios";

const Orders = () => {
  const [searchByValue, setSearchByValue] = useState(1);
  const [apiResult, setApiResult] = useState([]);
  const [statusApiResult, setStatusApiResult] = useState([]);

  const getOrdersQuery = `{orders{creationDate,LogHistory{printedLabels{parcelnumber}},id,accountId,creationDate,status,statusDescription,ContactPerson{DeliveryName,Country,ZipCode,City,ZipCode,Address,Email,Phone} OrderItems{name,category{name},count,netPrice,vat,finalPrice}}}    `;

  const getOrders = () => {
    axios(GraphQlConfig(getOrdersQuery))
      .then(function (response) {
        setApiResult(response.data.data.orders);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  useEffect(() => {
    getOrders();
    getOrderStatuses();
  }, [searchByValue]);

  const getStatusEnumQuery = `{status{id,description}}`;

  const getOrderStatuses = () => {
    axios(GraphQlConfig(getStatusEnumQuery))
      .then(function (response) {
        setStatusApiResult(response.data.data.status);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div>
      <div class="ui relaxed divided list">
        {apiResult.map((a) => {
          return <OrderItem apiResultSrc={a} />;
        })}
      </div>
    </div>
  );
};

export default Orders;
