import React from 'react';

const UniqueProductPageCartContainer = (props) => {
  const stock = props.fakeApiSrc.stock >= 1 ? 'In stock' : 'Out of stock';

  return (
    <div class="col-sm-7">
      <div class="product-information">
        <img src="images/product-details/new.jpg" class="newarrival" alt="" />
        <h2>{props.fakeApiSrc.name}</h2>
        <p>Web ID: {props.fakeApiSrc.webID}</p>
        <img src="images/product-details/rating.png" alt="" />
        <span>
          <span>US ${props.fakeApiSrc.price}</span>
          <label>Quantity:</label>
          <input type="text" value="1" />
          <button type="button" class="btn btn-fefault cart">
            <i class="fa fa-shopping-cart"></i>
            Add to cart
          </button>
        </span>
        <p>
          <b>Availability:</b>
          {stock}
        </p>
        <p>
          <b>Condition:</b> {props.fakeApiSrc.condition}
        </p>
        <p>
          <b>Brand:</b> {props.fakeApiSrc.brand}
        </p>
        <a href="">
          <img src="images/product-details/share.png" class="share img-responsive" alt="" />
        </a>
      </div>
    </div>
  );
};

export default UniqueProductPageCartContainer;
