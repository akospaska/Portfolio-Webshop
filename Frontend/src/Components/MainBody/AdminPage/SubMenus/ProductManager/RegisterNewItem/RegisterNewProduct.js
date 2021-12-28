import React, { useEffect } from "react";
import { useState } from "react";
import ReactDOM from "react-dom";
import ImageUploading from "react-images-uploading";
import { useSelector } from "react-redux";
import { Button, Header, Image, Modal } from "semantic-ui-react";

import axios from "axios";
import GraphQlConfig from "../../../../../Api/GraphQuery";
import apiEndpoint from "../../../../../../globalVariables/apiEndpint";

const RegisterNewProduct = () => {
  const [itemName, setItemName] = useState("");
  const [netPrice, setNetPrice] = useState(0);
  const [vat, setVat] = useState(0);
  const [priceReduce, setPriceReduce] = useState(0);
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [featured, setFeatured] = useState(false);

  const [categoriesSrc, setCategoriesSrc] = useState([]);
  const [brandsSrc, setBrandsSrc] = useState([]);
  const adminStatus = useSelector((state) => state.adminStatus);
  const demoAdminStatus = useSelector((state) => state.demoAdminStatus);
  const [open2, setOpen2] = React.useState(false);
  /*img uploade */
  const [images, setImages] = React.useState([]);
  const maxNumber = 69;
  const onChange = (imageList, addUpdateIndex) => {
    // data for submit

    setImages(imageList);
  };

  const uploadPhoto = (photo) => {
    if (adminStatus != true) {
      setOpen2(true);
      return;
    }
    var data = images[0];

    data.itemName = itemName;
    data.netPrice = netPrice;
    data.vat = vat;
    data.priceReduce = priceReduce;

    data.categoryId = category;
    data.brandId = brand;

    var config = {
      method: "post",
      url: `${apiEndpoint}/api/registernewproduct`,

      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(data),
    };

    axios(config)
      .then(function (response) {})
      .catch(function (error) {
        console.log(error);
      });
  };

  const getCategories = () => {
    const brandQuery = `{categories{name,id,priceReduce}}`;

    axios(GraphQlConfig(brandQuery))
      .then(function (response) {
        setCategoriesSrc(response.data.data.categories);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getBrands = () => {
    const brandQuery = `{brands{name,id,priceReduce}}`;

    axios(GraphQlConfig(brandQuery))
      .then(function (response) {
        setBrandsSrc(response.data.data.brands);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  useEffect(() => {
    getCategories();
    getBrands();
  }, []);

  const resetAllState = () => {
    setBrand("");
    setCategory("");
    setFeatured("");
    setImages([]);
    setItemName("");
    setNetPrice(0);
  };

  /*img uploade */

  return (
    <div class="ui segment ">
      <h4>Register new Product</h4>

      <div class="ui segment">
        <div class="ui input" style={{ fontSize: "1.4rem", marginBottom: "1rem" }}>
          <input value={itemName} type="text" placeholder="Product name" onChange={(e) => setItemName(e.target.value)} />
        </div>
        <br />
        <div class="ui input" style={{ fontSize: "1.4rem", marginBottom: "1rem" }}>
          <p style={{ position: "absolute" }}>Net Price</p>
          <input style={{ marginTop: "10%" }} value={netPrice} type="number" placeholder="net price" onChange={(e) => setNetPrice(Number(e.target.value))} />
        </div>
        <div class="ui input" style={{ fontSize: "1.4rem", marginBottom: "1rem" }}>
          <p style={{ position: "absolute" }}>Vat %</p>
          <input style={{ marginTop: "10%" }} value={vat} type="number" placeholder="Vat" onChange={(e) => setVat(Number(e.target.value))} />
        </div>
        <div class="ui input" style={{ fontSize: "1.4rem", marginBottom: "1rem" }}>
          <p style={{ position: "absolute" }}>Price reduce %</p>
          <input
            style={{ marginTop: "10%" }}
            value={priceReduce}
            type="number"
            placeholder="Price reduce %"
            onChange={(e) => setPriceReduce(Number(e.target.value))}
          />
        </div>
        <br />
        <select value={category} onChange={(e) => setCategory(e.target.value)} class="ui dropdown" style={{ width: "15rem", marginBottom: "1rem" }}>
          <option value="">Category</option>
          {categoriesSrc.map((a) => (
            <option value={a.id}>{a.name}</option>
          ))}
        </select>
        <br />
        <select value={brand} onChange={(e) => setBrand(e.target.value)} class="ui dropdown" style={{ width: "15rem", marginBottom: "1rem" }}>
          <option value="">Brand</option>
          {brandsSrc.map((a) => (
            <option value={a.id}>{a.name}</option>
          ))}
        </select>
        <br />

        <div className="App">
          <ImageUploading multiple value={images} onChange={onChange} maxNumber={maxNumber} dataURLKey="data_url">
            {({ imageList, onImageUpload, onImageRemoveAll, onImageUpdate, onImageRemove, isDragging, dragProps }) => (
              // write your building UI
              <div className="upload__image-wrapper">
                <button style={isDragging ? { color: "red" } : null} class="btn btn-default" onClick={onImageUpload} {...dragProps}>
                  Click or Drop Your Photo here
                </button>
                &nbsp;
                <button class="btn btn-default" onClick={onImageRemoveAll}>
                  Remove all images
                </button>
                {imageList.map((image, index) => (
                  <div key={index} className="image-item">
                    <img src={image.data_url} alt="" width="100" />
                    <div className="image-item__btn-wrapper">
                      <button class="btn btn-default" onClick={() => onImageUpdate(index)}>
                        Update
                      </button>
                      <button class="btn btn-default" onClick={() => onImageRemove(index)}>
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
                <br />
                <button
                  class="btn btn-default"
                  onClick={() => {
                    if (itemName.length < 2 || netPrice <= 0 || category == "" || brand == "") {
                      alert("You have missed something");
                    } else {
                      uploadPhoto(imageList[0].data_url);

                      // resetAllState();
                    }
                  }}
                  style={{ marginBottom: "1rem", display: imageList.length >= 1 ? "" : "none" }}
                  disabled={!adminStatus}
                >
                  Register Product
                </button>
              </div>
            )}
          </ImageUploading>
        </div>
      </div>
      <React.Fragment>
        <Modal style={{ marginBottom: "30rem" }} onClose={() => setOpen2(false)} onOpen={() => setOpen2(true)} open={open2}>
          <Modal.Header>Error description</Modal.Header>
          <Modal.Content image>
            <Modal.Description>
              <Header>Access Denied!</Header>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button
              content="Ok"
              labelPosition="right"
              icon="checkmark"
              onClick={() => {
                setOpen2(false);
              }}
              positive
            />
          </Modal.Actions>
        </Modal>
      </React.Fragment>
    </div>
  );
};

export default RegisterNewProduct;
