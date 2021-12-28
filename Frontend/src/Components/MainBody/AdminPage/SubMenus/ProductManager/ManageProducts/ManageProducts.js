import React from "react";
import ManageProductItem from "./ManageProductItem/ManageProductItem";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import GraphQlConfig from "../../../../../Api/GraphQuery";

const ManageProducts = () => {
  const [fake, setFake] = useState(true);
  const [itemSrc, setItemSrc] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  const [selectedBrands, setSelectendBrands] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchKeyword, setSearchKeyWord] = useState("");

  let timeOutContainer;

  const selectedBrandsHandler = (brandId) => {
    const actualPosition = selectedBrands.findIndex((a) => a == brandId);

    if (actualPosition == -1) {
      setSelectendBrands([...selectedBrands, brandId]);
    } else {
      let newArray = [];
      const indexOfRemovableValue = selectedBrands.findIndex((a) => a == brandId);

      selectedBrands.map((a, b) => {
        if (b == indexOfRemovableValue) {
        } else {
          newArray.push(a);
        }
      });

      setSelectendBrands(newArray);
    }
  };

  const selectedCategoriesHandler = (categoryId) => {
    const actualPosition = selectedCategories.findIndex((a) => a == categoryId);

    if (actualPosition == -1) {
      setSelectedCategories([...selectedCategories, categoryId]);
    } else {
      let newArray = [];
      const indexOfRemovableValue = selectedCategories.findIndex((a) => a == categoryId);

      selectedCategories.map((a, b) => {
        if (b == indexOfRemovableValue) {
        } else {
          newArray.push(a);
        }
      });

      setSelectedCategories(newArray);
    }
  };

  const getCategoryElements = () => {
    const query = `{categories{name,id,priceReduce}}`;
    try {
      axios(GraphQlConfig(query)).then(function (response) {
        setCategories(response.data.data.categories);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getBrandElements = () => {
    const query = `{brands{name,id,priceReduce}}`;
    try {
      axios(GraphQlConfig(query))
        .then(function (response) {
          setBrands(response.data.data.brands);
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };
  const getProducts = () => {
    // const brandQuery = `{products{id,name,netPrice,vat,isFeatured,priceReduce,imgurl,category{id,name},brand{id,name}}}`;
    const brandQuery = `{searchProduct(name:"${searchKeyword}",categoryList:[${[...selectedCategories]}],brandList:[${[
      ...selectedBrands,
    ]}]){name,id,vat,netPrice,isFeatured,priceReduce,category{id,name}brand{id,name}imgurl}}`;

    axios(GraphQlConfig(brandQuery))
      .then(async function (response) {
        await setItemSrc(response.data.data.searchProduct);
        await setFake(!fake);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    getProducts();
    getCategoryElements();
    getBrandElements();
  }, []);

  useEffect(() => {
    getProducts();
  }, [searchKeyword, selectedBrands, selectedCategories]);

  return (
    <div class="ui segment" style={{ marginBottom: "1rem" }}>
      <h4>Manage products</h4>
      <div>
        <input
          type="text"
          placeholder="Search product"
          onChange={(e) => {
            clearTimeout(timeOutContainer);
            timeOutContainer = setTimeout(() => {
              setSearchKeyWord(e.target.value);
            }, 400);
          }}
        />
      </div>
      <div class="ui grid">
        <div class="four wide column">
          Category
          <ul>
            {categories.map((a) => (
              <li style={{ width: "12rem" }}>
                <input type="checkbox" onChange={(e) => selectedCategoriesHandler(a.id)} />
                <p style={{ float: "right" }}>{a.name}</p>
              </li>
            ))}
          </ul>
        </div>
        <div class="four wide column">
          Brands
          <ul>
            {brands.map((a) => (
              <li style={{ width: "12rem" }}>
                <input type="checkbox" onChange={(e) => selectedBrandsHandler(a.id)} />
                <p style={{ float: "right" }}>{a.name}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div class="ui grid">
        {itemSrc.map((a) => {
          return <ManageProductItem id={a.id} productData={a} forceRefresh={getProducts} exportFake={fake} />;
        })}
      </div>
    </div>
  );
};

export default ManageProducts;
