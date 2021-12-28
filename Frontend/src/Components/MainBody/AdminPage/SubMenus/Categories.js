import React, { useState } from "react";
import CategoryItem from "./CategoryManagerItem/CategoryItem";
import axios from "axios";
import GraphQlConfig from "../../../Api/GraphQuery";
import { Button, Header, Image, Modal } from "semantic-ui-react";
import { useSelector } from "react-redux";

import { useEffect } from "react";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [fake, setFake] = useState(true);
  const [newCategoryName, setNewCategoryName] = useState("");

  const [open, setOpen] = React.useState(false);

  const adminStatus = useSelector((state) => state.adminStatus);
  const demoAdminStatus = useSelector((state) => state.demoAdminStatus);
  const [open2, setOpen2] = React.useState(false);

  const getCategoryElements = () => {
    const brandQuery = `{categories{name,id,priceReduce}}`;

    axios(GraphQlConfig(brandQuery))
      .then(function (response) {
        setCategories(response.data.data.categories);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    getCategoryElements();
  }, [fake]);

  const forceRefresh = () => {
    setFake(!fake);
  };

  const createNewCategory = () => {
    if (adminStatus != true) {
      setOpen2(true);
      return;
    }
    const query = `mutation{createNewCategory(name:"${newCategoryName}",priceReduce:0){fieldCount}}`;

    axios(GraphQlConfig(query))
      .then(function (response) {
        setFake(!fake);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div>
      <input
        value={newCategoryName}
        onChange={(e) => setNewCategoryName(e.target.value)}
        type="text"
        placeholder="New Category name"
        style={{ marginBottom: "1rem" }}
      />
      <br />
      <button
        class="btn btn-default"
        onClick={() => {
          if (!newCategoryName.length > 1) {
            setOpen(true);
          }
          createNewCategory();
        }}
        disabled={!adminStatus}
      >
        Create new Category
      </button>

      <div class="ui middle aligned divided list" style={{ width: "30rem" }}>
        {categories.map((a) => (
          <CategoryItem name={a.name} categoryId={a.id} forceRefresh={forceRefresh} priceReduce={a.priceReduce} />
        ))}
      </div>
      <React.Fragment>
        <Modal style={{ marginBottom: "30rem" }} onClose={() => setOpen(false)} onOpen={() => setOpen(true)} open={open}>
          <Modal.Header>Error description</Modal.Header>
          <Modal.Content image>
            <Modal.Description>
              <Header>The new category name must be 2 characters long!</Header>
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

export default Categories;
