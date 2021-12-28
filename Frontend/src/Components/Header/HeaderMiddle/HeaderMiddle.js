import React, { useEffect } from "react";
import { FaUser, FaStar, FaList, FaCartArrowDown, FaLock } from "react-icons/fa";
import Link from "../../HelperComponents/Link/Link";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setCartSize, setLoginStatus, setAdminStatus, setDemoAdminStatus } from "../../../actions";

import GraphQlConfig from "../../Api/GraphQuery";

import BackendRESTrequest from "../../Api/BackendRESTrequest";

const HeaderMiddle = () => {
  var axios = require("axios");
  const cartCounter = useSelector((state) => state.getCartSize);
  const loginStatus = useSelector((state) => state.loginStatus);
  const adminStatus = useSelector((state) => state.adminStatus);
  const demoAdminStatus = useSelector((state) => state.demoAdminStatus);
  const refreshCartSize = useSelector((state) => state.refreshCartSize);
  const dispatch = useDispatch();

  const getShoppingCartItemsQuery = "{shoppingCartItems{name}}";

  const getCartActualSize = () => {
    axios(GraphQlConfig(getShoppingCartItemsQuery))
      .then(function (response) {
        dispatch(setCartSize(response.data.data.shoppingCartItems.length));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getLogStatis = async () => {
    const response = await BackendRESTrequest.get("/sessionhandler");

    dispatch(setLoginStatus(response.data.isLoggedIn));
    dispatch(setAdminStatus(response.data.isAdminAccount));
    dispatch(setDemoAdminStatus(response.data.adminDemo));

    //MOCKED
    /*   dispatch(setLoginStatus(true));
    dispatch(setAdminStatus(false));
    dispatch(setDemoAdminStatus(true)); */
  };
  const logOut = async () => {
    const response = await BackendRESTrequest.get("/logout");
    dispatch(setDemoAdminStatus(false));
    dispatch(setLoginStatus(false));
    dispatch(setAdminStatus(false));
    document.location.href = "/";
  };

  getLogStatis();

  useEffect(() => {
    getCartActualSize();
  }, [cartCounter, refreshCartSize]);

  return (
    <div className="header-middle">
      <div className="container">
        <div className="row">
          <div className="col-sm-4">
            <div className="logo pull-left">
              <a href="/">
                <img src="images/home/logo.jpg" alt="" />
              </a>
            </div>
            <div className="btn-group pull-right"></div>
          </div>
          <div className="col-sm-8">
            <div className="shop-menu pull-right">
              <ul className="nav navbar-nav">
                {loginStatus ? (
                  adminStatus || demoAdminStatus ? (
                    <li>
                      <Link href="admin">
                        <FaUser /> Admin
                      </Link>
                    </li>
                  ) : (
                    <li>
                      <Link href="account">
                        <FaUser /> Account
                      </Link>
                    </li>
                  )
                ) : (
                  ""
                )}

                {adminStatus || demoAdminStatus ? (
                  ""
                ) : (
                  <li>
                    <Link href="checkout">
                      <FaList /> Checkout
                    </Link>
                  </li>
                )}

                {adminStatus || demoAdminStatus ? (
                  ""
                ) : (
                  <li>
                    <Link href="/cart" onClick={() => {}}>
                      <FaCartArrowDown /> Cart ({cartCounter})
                    </Link>
                  </li>
                )}

                <li>
                  {loginStatus != true ? (
                    <Link href="login">
                      <FaLock /> Login
                    </Link>
                  ) : (
                    <a
                      onClick={(e) => {
                        e.preventDefault();

                        logOut();
                      }}
                    >
                      <FaLock /> LogOut
                    </a>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderMiddle;
