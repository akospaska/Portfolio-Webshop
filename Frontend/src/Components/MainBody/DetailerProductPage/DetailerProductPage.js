import React from "react";
import LeftSideBarContainer from "../MainMenuBodyContent/MainContentContainer/LeftsideBarContainer/LeftsideBarContainer";
import UniqueProductPage from "./UniqueProductPage/UniqueProductPage";

const fakeApiSrcObj = {
  name: "Easy Polo Black Edition",
  price: 50,
  mainPhoto: 1,
  subPhotos: { photo1: 1, photo2: 2, photo3: 3 },
  h2name: "Anne Klein Sleeveless Colorblock Scuba",
  webID: 1089772,
  stock: 1,
  condition: "new",
  brand: "Nike",
  text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
};

const DetailedProductPage = (props) => {
  return (
    <div className="container">
      <div className="row">
        <UniqueProductPage fakeApiSrc={fakeApiSrcObj} />
      </div>
    </div>
  );
};

export default DetailedProductPage;
