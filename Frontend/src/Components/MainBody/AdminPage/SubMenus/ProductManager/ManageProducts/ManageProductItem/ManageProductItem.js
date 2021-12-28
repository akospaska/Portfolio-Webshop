import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import GraphQlConfig from "../../../../../../Api/GraphQuery";
import axios from "axios";
import { Button, Header, Image, Modal } from "semantic-ui-react";
import { useSelector } from "react-redux";

const ManageProductItem = (props) => {
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);

  const [showContent, setShowContent] = useState(false);

  const [name, setName] = useState("");
  const [netPrice, setNetPrice] = useState(0);
  const [vat, setVat] = useState(0);
  const [priceReduce, setPriceReduce] = useState(0);

  const [isFeatured, setIsFeatured] = useState(0);
  const [fake, setFake] = useState(true);

  const adminStatus = useSelector((state) => state.adminStatus);
  const demoAdminStatus = useSelector((state) => state.demoAdminStatus);
  const [open3, setOpen3] = React.useState(false);

  useEffect(() => {
    getData(props.id);
    /*  setDefaultValue(); */
  }, [fake, props.exportFake]);

  const setDefaultValue = () => {
    setShowContent(0);
    setName(props.productData.name);
    setNetPrice(props.productData.netPrice);
    setVat(props.productData.vat);
    setPriceReduce(props.productData.priceReduce);
    setIsFeatured(props.productData.isFeatured);
  };

  const getData = (productId) => {
    const query = `{product(id:${productId}){id,name,category{id,name},brand{id,name},netPrice,vat,priceReduce,isFeatured,imgurl}}`;

    axios(GraphQlConfig(query))
      .then(function (response) {
        setName(response.data.data.product[0].name);
        setNetPrice(response.data.data.product[0].netPrice);
        setVat(response.data.data.product[0].vat);
        setPriceReduce(response.data.data.product[0].priceReduce);
        setIsFeatured(response.data.data.product[0].isFeatured);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const updateProduct = () => {
    if (adminStatus != true) {
      setOpen3(true);
      return;
    }
    const query = `mutation{updateProduct(productId:${props.id},name:"${name}",netPrice:${netPrice},vat:${vat},priceReduce:${priceReduce},isFeatured:${
      isFeatured ? 1 : 0
    }){fieldCount}}`;

    axios(GraphQlConfig(query))
      .then(function (response) {
        props.forceRefresh();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const deleteProduct = () => {
    if (adminStatus != true) {
      setOpen3(true);
      return;
    }
    const query = `mutation{deleteProduct(productId:${props.id}){fieldCount}}`;

    axios(GraphQlConfig(query))
      .then(function (response) {
        props.forceRefresh();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const inputValidator = () => {
    const nameIssue = `The name length must be at least 3 characters long!`;
    const netPriceIssue = `The net price must be greater than 0`;
    const vatIssue = `Te vat must be between 0 and 50!`;
    const priceReduceIssue = `The The priceReduce must be lower than 25%`;
    const messageArray = [nameIssue, netPriceIssue, vatIssue, priceReduceIssue];

    const nameIsValid = name.length > 2;
    const netPriceIsValid = netPrice >= 0;
    const vatIsValid = vat >= 0 && vat <= 50;
    const priceReduceIsValid = priceReduce >= 0 && priceReduce <= 25;

    const checkArray = [nameIsValid, netPriceIsValid, vatIsValid, priceReduceIsValid];

    let extractedErrorMessages = [];

    checkArray.map((a, b) => {
      !a ? extractedErrorMessages.push(messageArray[b]) : "";
    });

    return extractedErrorMessages;
  };

  return (
    <div class="eight wide column">
      <div key={props.id} class="ui segment" style={{ height: showContent ? "" : "", width: "fit-content" }}>
        <div class="row">
          <div class="col-sm-4">
            <div class="signup-form">
              <form style={{ width: showContent ? "50rem" : "29rem" }}>
                <p style={{ width: "max-content" }}>Product Item</p>
                <button
                  style={{ float: "right", marginTop: "-3rem" }}
                  class="btn btn-default"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowContent(!showContent);
                  }}
                >
                  {showContent ? "Hide" : "Show"}
                </button>
                <div className="cart_product">
                  <img style={{ height: "80px" }} src={props.productData.imgurl} alt="" />
                </div>
                <input
                  style={{ width: "25rem" }}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  placeholder="Mygls Account name"
                  disabled={showContent ? false : true}
                />
                <div style={{ display: showContent ? "" : "none" }}>
                  <p style={{ width: "max-content" }}>Net Price</p>
                  <input
                    style={{ width: "12rem" }}
                    value={netPrice}
                    onChange={(e) => setNetPrice(e.target.value)}
                    type="number"
                    placeholder="Mygls Account name"
                  />
                  <p style={{ width: "max-content" }}>Vat %</p>
                  <input style={{ width: "12rem" }} value={vat} onChange={(e) => setVat(e.target.value)} type="number" placeholder="Mygls Account name" />
                  <p style={{ width: "max-content" }}>Price reduce percent</p>
                  <input
                    style={{ width: "12rem" }}
                    value={priceReduce}
                    onChange={(e) => setPriceReduce(e.target.value)}
                    type="number"
                    placeholder="Mygls Account name"
                  />
                  <p style={{ fontSize: "25px" }}>Featured</p>
                  <input
                    style={{ marginTop: "-4rem", marginLeft: "-10rem", height: "25px" }}
                    checked={isFeatured == 1 ? true : false}
                    type="checkbox"
                    id="vehicle1"
                    name="vehicle1"
                    value="Bike"
                    onChange={(e) => setIsFeatured(!isFeatured)}
                  />
                  <button
                    class="btn btn-default"
                    onClick={(e) => {
                      e.preventDefault();
                      inputValidator().length > 0 ? setOpen(true) : updateProduct();
                    }}
                  >
                    Modify Product
                  </button>
                  <button
                    style={{ marginTop: "-6.3%", marginLeft: "35%" }}
                    class="btn btn-default"
                    onClick={(e) => {
                      e.preventDefault();
                      setOpen2(true);
                    }}
                  >
                    Delete Product
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <React.Fragment>
        <Modal style={{ marginBottom: "30rem" }} onClose={() => setOpen(false)} onOpen={() => setOpen(true)} open={open}>
          <Modal.Header>Error description</Modal.Header>
          <Modal.Content image>
            <Modal.Description>
              {inputValidator().map((a) => {
                return <Header>{a}</Header>;
              })}
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button
              content="Ok"
              labelPosition="right"
              icon="checkmark"
              onClick={() => {
                setOpen(false);
              }}
              positive
            />
          </Modal.Actions>
        </Modal>
      </React.Fragment>
      {/*For Product Delete */}
      <React.Fragment>
        <Modal style={{ marginBottom: "30rem" }} onClose={() => setOpen2(false)} onOpen={() => setOpen2(true)} open={open2}>
          <Modal.Header>Error description</Modal.Header>
          <Modal.Content image>
            <Modal.Description>
              <Header>Are You Sure?!</Header>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button
              content="Sure"
              labelPosition="right"
              icon="checkmark"
              onClick={() => {
                deleteProduct();
                setOpen2(false);
              }}
              positive
            />
            <Button
              content="NoNoNo"
              labelPosition="right"
              icon="checkmark"
              onClick={() => {
                setOpen2(false);
              }}
              negative
            />
          </Modal.Actions>
        </Modal>
      </React.Fragment>

      <React.Fragment>
        <Modal style={{ marginBottom: "30rem" }} onClose={() => setOpen3(false)} onOpen={() => setOpen3(true)} open={open3}>
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
                setOpen3(false);
              }}
              positive
            />
          </Modal.Actions>
        </Modal>
      </React.Fragment>
    </div>
  );
};

export default ManageProductItem;
