import React, { Component, useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getItemsByCategoryId, getItemsByBrandId } from "../../../../../actions";
import Link from "../../../../HelperComponents/Link/Link";
import axios from "axios";

import GraphQlConfig from "../../../../Api/GraphQuery";

const LeftSideBarContainer = () => {
  const dispatch = useDispatch();

  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  const fetchItemList = (queryTarget) => {
    const brandQuery = `{brands{id name count}}`;
    const categoryQuery = `{categories{id name count}}`;

    const query = queryTarget == 1 ? categoryQuery : brandQuery;

    axios(GraphQlConfig(query))
      .then(function (response) {
        if (queryTarget == 1) {
          setCategories(response.data.data.categories);
        }
        if (queryTarget == 2) {
          setBrands(response.data.data.brands);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchItemList(1);
    fetchItemList(2);
  }, []);

  return (
    <div class="col-sm-3">
      <div class="left-sidebar">
        <h2>Category</h2>
        <div class="panel-group category-products" id="accordian">
          {categories.length > 0
            ? categories.map((a) => (
                <div class="panel panel-default">
                  <div
                    onClick={() => {
                      dispatch(getItemsByCategoryId(a.id));
                    }}
                    class="panel-heading"
                  >
                    <h4 class="panel-title">
                      <Link href="/productspage">{a.name}</Link>
                    </h4>
                  </div>
                </div>
              ))
            : ""}
        </div>

        <div class="brands_products">
          <h2>Brands</h2>
          <div class="brands-name">
            <ul class="nav nav-pills nav-stacked">
              {brands.map((a, b) => {
                return (
                  <li
                    onClick={() => {
                      dispatch(getItemsByBrandId(a.id));
                    }}
                  >
                    <Link href="/productspage">
                      <span class="pull-right"></span>
                      {a.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div class="shipping text-center">
          <img src="images/home/shipping.jpg" alt="" />
        </div>
      </div>
    </div>
  );
};

export default LeftSideBarContainer;
