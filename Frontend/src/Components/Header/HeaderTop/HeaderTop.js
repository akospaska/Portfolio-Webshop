import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { faMailBulk } from '@fortawesome/free-solid-svg-icons';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaDribbble, FaGoogle } from 'react-icons/fa';

const HeaderTop = () => {
  return (
    <div className="header_top">
      <div className="container">
        <div className="row">
          <div className="col-sm-6">
            <div className="contactinfo">
              <ul className="nav nav-pills">
                <li>
                  <a>
                    <i>
                      {' '}
                      <FontAwesomeIcon icon={faPhone} />
                    </i>{' '}
                    +36 20 222-2222
                  </a>
                </li>
                <li>
                  <a>
                    <i>
                      <FontAwesomeIcon icon={faMailBulk} />
                    </i>{' '}
                    akos.paska9011@gmail.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="social-icons pull-right">
              <ul className="nav navbar-nav">
                <li>
                  <a href="#">
                    <FaFacebookF />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <FaTwitter />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <FaLinkedinIn />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <FaDribbble />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <FaGoogle />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderTop;
