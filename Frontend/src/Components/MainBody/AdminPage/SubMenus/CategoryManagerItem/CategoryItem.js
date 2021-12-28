import React, { useEffect } from "react";
import axios from "axios";
import GraphQlConfig from "../../../../Api/GraphQuery";
import { Button, Header, Image, Modal } from "semantic-ui-react";
import { useSelector } from "react-redux";

import { useState } from "react";

const CategoryItem = (props) => {
  const [categoryName, setCategoryName] = useState(props.name);
  const [open, setOpen] = React.useState(false);

  const adminStatus = useSelector((state) => state.adminStatus);
  const demoAdminStatus = useSelector((state) => state.demoAdminStatus);
  const [open2, setOpen2] = React.useState(false);

  const [priceReduce, setPriceReduce] = useState([props.priceReduce]);

  const deleteCategory = () => {
    if (adminStatus != true) {
      setOpen2(true);
      return;
    }
    const query = `mutation{deleteCategory(categoryId:${props.categoryId}){fieldCount}}`;

    axios(GraphQlConfig(query))
      .then(function (response) {
        props.forceRefresh();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const modifyCategory = () => {
    if (adminStatus != true) {
      setOpen2(true);
      return;
    }
    const query = `mutation{updateCategory(categoryId:${props.categoryId},categoryName:"${categoryName}",priceReduce:${priceReduce}){fieldCount}}`;

    axios(GraphQlConfig(query))
      .then(function (response) {
        props.forceRefresh();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {}, []);

  return (
    <div class="ui segment" style={{ width: "35rem", height: "22rem" }}>
      <div class="row">
        <div class="col-sm-4">
          <div class="signup-form">
            <form>
              <p style={{ width: "max-content" }}>Category Name</p>
              <input
                style={{ width: "25rem" }}
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                type="email"
                placeholder="Mygls Account name"
              />
              <p style={{ width: "max-content" }}>Price reduce percent</p>
              <input
                value={priceReduce}
                onChange={(e) => {
                  if (Number(e.target.value) > 25) setPriceReduce(25);
                  else if (Number(e.target.value) < 0) setPriceReduce(0);
                  else {
                    setPriceReduce(e.target.value);
                  }
                }}
                type="number"
                min={0}
                max={25}
              />

              <button
                class="btn btn-default"
                onClick={(e) => {
                  e.preventDefault();
                  modifyCategory();
                }}
              >
                Modify Category
              </button>
              <button
                style={{ marginTop: "-37%", marginLeft: "200%", width: "14rem" }}
                class="btn btn-default"
                onClick={(e) => {
                  e.preventDefault();
                  setOpen(true);
                }}
              >
                Delete Category
              </button>
            </form>
          </div>
        </div>
      </div>
      <React.Fragment>
        <Modal style={{ marginBottom: "30rem" }} onClose={() => setOpen(false)} onOpen={() => setOpen(true)} open={open}>
          <Modal.Header>Attention!</Modal.Header>
          <Modal.Content image>
            <Modal.Description>
              <Header>Are You sure would like to delete this Category and All of the products with it?</Header>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button
              content="Ok"
              labelPosition="right"
              icon="checkmark"
              onClick={() => {
                deleteCategory();
                setOpen(false);
              }}
              positive
            />
            <Button
              content="No"
              labelPosition="right"
              icon="checkmark"
              onClick={() => {
                setOpen(false);
              }}
              negative
            />
          </Modal.Actions>
        </Modal>
      </React.Fragment>

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

export default CategoryItem;
