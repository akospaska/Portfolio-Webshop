import React, { Component } from "react";
import FeaturesItem from "./FeaturesItem/FeaturesItem";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

import GraphQlConfig from "../../../../../Components/Api/GraphQuery";

const featuredItemsQuery = `{featuredProducts{id name netPrice vat imgurl priceReduce finalPrice}}`;
const FeaturesItemsContainer = () => {
  const [featuredItems, setFeaturedItems] = useState([]);

  const fetchItemList = () => {
    axios(GraphQlConfig(featuredItemsQuery))
      .then(function (response) {
        setFeaturedItems(response.data.data.featuredProducts);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchItemList();
  }, []);

  return (
    <div class="features_items">
      <h2 class="title text-center">Features Items</h2>
      {featuredItems.map((a, b) => {
        return <FeaturesItem id={a.id} imgUrl={a.imgurl} name={a.name} price={a.finalPrice} netPrice={a.netPrice} priceReduce={a.priceReduce} keyvalue={b} />;
      })}
    </div>
  );
};

export default FeaturesItemsContainer;
