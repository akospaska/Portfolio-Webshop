import React from "react";
import { FaAngleDown } from "react-icons/fa";
import { useRef } from "react";
import Link from "../../HelperComponents/Link/Link";

const HeaderBottom = () => {
  const mainMenu = useRef();

  function clickHandler() {
    mainMenu.current.className === "nav navbar-nav navbar-collapse collapse"
      ? (mainMenu.current.className = "nav navbar-nav navbar-collapse in")
      : (mainMenu.current.className = "nav navbar-nav navbar-collapse collapse");
  }

  return (
    <div className="header-bottom">
      <div className="container">
        <div className="row">
          <div className="col-sm-9">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse" onClick={clickHandler}>
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
            </div>
            <div className="mainmenu pull-left">
              <ul className="nav navbar-nav collapse navbar-collapse" ref={mainMenu}>
                <li>
                  <Link href="/" className="active">
                    Home
                  </Link>
                </li>
                <li className="dropdown">
                  <Link href="/productspage">
                    Shop
                    <FaAngleDown />
                  </Link>
                  <ul role="menu" className="sub-menu">
                    <li>
                      <Link href="/productspage">Products</Link>
                    </li>
                    <li>
                      <Link href="/productspage">Product Details</Link>
                    </li>
                    <li>
                      <Link href="/checkout">Checkout</Link>
                    </li>
                    <li>
                      <Link href="/cart">Cart</Link>
                    </li>
                    <li>
                      <Link href="/login">Login</Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderBottom;
