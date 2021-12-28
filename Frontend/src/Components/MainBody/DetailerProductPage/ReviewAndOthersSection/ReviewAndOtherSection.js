import React from 'react';
import { FaUserAlt, FaClock, FaCalendarAlt } from 'react-icons/fa';
import ProductsPage from '../../ProductsPage/ProductsPage';

const ReviewAndOthersSection = (props) => {
  return (
    <div class="category-tab shop-details-tab">
      <div class="col-sm-12">
        <ul class="nav nav-tabs">
          <li>
            <a href="#details" data-toggle="tab">
              Details
            </a>
          </li>
          <li>
            <a href="#companyprofile" data-toggle="tab">
              Company Profile
            </a>
          </li>
          <li>
            <a href="#tag" data-toggle="tab">
              Tag
            </a>
          </li>
          <li class="active">
            <a href="#reviews" data-toggle="tab">
              Reviews (5)
            </a>
          </li>
        </ul>
      </div>
      <div class="tab-content">
        <div class="tab-pane fade active in" id="reviews">
          <div class="col-sm-12">
            <ul>
              <li>
                <a href="">
                  <i>
                    <FaUserAlt />
                  </i>
                  EUGEN
                </a>
              </li>
              <li>
                <a href="">
                  <i>
                    <FaClock />
                  </i>
                  12:41 PM
                </a>
              </li>
              <li>
                <a href="">
                  <i>
                    <FaCalendarAlt />
                  </i>
                  31 DEC 2014
                </a>
              </li>
            </ul>
            <p>{props.fakeApiSrc.text}</p>
            <p>
              <b>Write Your Review</b>
            </p>

            <form action="#">
              <span>
                <input type="text" placeholder="Your Name" />
                <input type="email" placeholder="Email Address" />
              </span>
              <textarea name=""></textarea>
              <b>Rating: </b> <img src="images/product-details/rating.png" alt="" />
              <button type="button" class="btn btn-default pull-right">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewAndOthersSection;
