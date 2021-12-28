import React from "react";
import BrandItem from "./BrandManagerItem/BrandManagerItem";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Button, Header, Image, Modal } from "semantic-ui-react";
import { useSelector } from "react-redux";

import GraphQlConfig from "../../../Api/GraphQuery";

const Brands = () => {
  const [brands, setBrands] = useState([]);
  const [fake, setFake] = useState(true);

  const [newBrandName, setNewBrandName] = useState("");

  const [open, setOpen] = React.useState(false);

  const adminStatus = useSelector((state) => state.adminStatus);

  const [open2, setOpen2] = React.useState(false);

  const getBrandElements = () => {
    const brandQuery = `{brands{name,id,priceReduce}}`;

    axios(GraphQlConfig(brandQuery))
      .then(function (response) {
        setBrands(response.data.data.brands);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    getBrandElements();
  }, [fake]);

  const forceRefresh = () => {
    setFake(!fake);
  };

  const createNewBrand = () => {
    if (adminStatus != true) {
      setOpen2(true);
      return;
    }
    const query = `mutation{createNewBrand(name:"${newBrandName}",priceReduce:0){fieldCount}}`;

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
      <input value={newBrandName} onChange={(e) => setNewBrandName(e.target.value)} type="text" placeholder="New Brand name" style={{ marginBottom: "1rem" }} />
      <br />
      <button
        onClick={() => {
          if (newBrandName.length > 1) {
            createNewBrand();
            setFake(!fake);
          } else {
            setOpen(true);
          }
        }}
        class="btn btn-default"
        disabled={!adminStatus}
      >
        Create new brand
      </button>

      <div class="ui middle aligned divided list" style={{ width: "30rem" }}>
        {brands.map((a) => (
          <BrandItem name={a.name} brandId={a.id} forceRefresh={forceRefresh} priceReduce={a.priceReduce} />
        ))}
      </div>
      <React.Fragment>
        <Modal style={{ marginBottom: "30rem" }} onClose={() => setOpen(false)} onOpen={() => setOpen(true)} open={open}>
          <Modal.Header>Error description</Modal.Header>
          <Modal.Content image>
            <Modal.Description>
              <Header>The new brand name must be 2 characters long!</Header>
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

export default Brands;
