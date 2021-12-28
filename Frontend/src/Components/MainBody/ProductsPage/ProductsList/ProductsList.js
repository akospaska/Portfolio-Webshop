import React from "react";
import FeaturesItem from "../../MainMenuBodyContent/MainContentContainer/FeaturesItemsContainer/FeaturesItem/FeaturesItem";
import PageNavigation from "../PageNavigation/PageNavigation";
import { useSelector } from "react-redux";
import { useState } from "react";

import { useEffect } from "react";

import GraphQlConfig from "../../../Api/GraphQuery";

var axios = require("axios");

const ProductsList = (props) => {
  const productsSource = useSelector((state) => state.listItemsRenderer);

  const [apiResult, setApiResult] = useState([]);

  const fetchItemList = () => {
    //query taragets 1->Categories or 2->Brands

    const categories = `{productsByCategoryId(id:${productsSource.selectorId}){id name imgurl vat netPrice finalPrice isFeatured priceReduce}}`;
    const brands = `{productsByBrandId(id:${productsSource.selectorId}){id name imgurl vat netPrice finalPrice isFeatured priceReduce}}`;

    let query;

    if (productsSource.type == "getitemsbycategory") {
      query = categories;
    }
    if (productsSource.type == "getitemsbybrand") {
      query = brands;
    }

    axios(GraphQlConfig(query))
      .then(function (response) {
        if (productsSource.type == "getitemsbycategory") {
          setApiResult(response.data.data.productsByCategoryId);
        }
        if (productsSource.type == "getitemsbybrand") {
          setApiResult(response.data.data.productsByBrandId);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchItemList();
  }, [productsSource]);

  return (
    <div class="col-sm-9 padding-right">
      <div class="features_items">
        <h2 class="title text-center">Shop Items</h2>
        {apiResult.map((a, b) => {
          return (
            <FeaturesItem
              id={a.id}
              imgUrl={a.imgurl}
              name={a.name}
              price={a.finalPrice}
              netPrice={a.netPrice}
              priceReduce={a.priceReduce}
              isFeatured={a.isFeatured}
              keyvalue={b}
            />
          );
        })}
      </div>
      <PageNavigation />
    </div>
  );
};

export default ProductsList;
