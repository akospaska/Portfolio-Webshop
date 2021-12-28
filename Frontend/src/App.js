import React, { useState } from "react";
import FooterContent from "./Components/FooterContent/FooterContent";
import Header from "./Components/Header/Header";
import DetailedProductPage from "./Components/MainBody/DetailerProductPage/DetailerProductPage";
import MainMenuBodyContent from "./Components/MainBody/MainMenuBodyContent/MainMenuBodyContent";
import ProductsPage from "./Components/MainBody/ProductsPage/ProductsPage";
import CheckOutPage from "./Components/MainBody/CheckoutPage/CheckOutPage";
import CartPage from "./Components/MainBody/CartPage/CartPage";
import LoginPage from "./Components/MainBody/LoginPage/LoginPage";
import Content404Page from "./Components/Content404Page/Content404Page";
import Route from "./Components/HelperComponents/Route/Route";
import AccountPage from "./Components/MainBody/AccountPage/accountPage";
import AdminPage from "./Components/MainBody/AdminPage/AdminPage";
import Successful from "./Components/stripeEndings/successful";
import Failed from "./Components/stripeEndings/failed";

const App = () => {
  const [actualItemId, setActualItemId] = useState(1);

  return (
    <div className="App">
      <Route path="/404">
        <Content404Page />
      </Route>
      <Header />
      <Route path="/">
        <MainMenuBodyContent />
      </Route>
      <Route path="/login">
        <LoginPage />
      </Route>
      <Route path="/account">
        <AccountPage />
      </Route>
      <Route path="/admin">
        <AdminPage />
      </Route>
      <Route path="/productspage">
        <ProductsPage />
      </Route>
      <Route path="/checkout">
        <CheckOutPage />
      </Route>
      <Route path="/detailedproductpage">
        <DetailedProductPage actualItemId={actualItemId} />
      </Route>
      <Route path="/cart">
        <CartPage />
      </Route>
      <Route path="/stripesuccessful">
        <Successful />
      </Route>
      <Route path="/stripefailed">
        <Failed />
      </Route>
      <FooterContent />
    </div>
  );
};

export default App;
