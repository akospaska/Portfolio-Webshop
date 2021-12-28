import React from 'react';
import { FaPlay } from 'react-icons/fa';

const FooterVideoContent = (props) => {
  return (
    <div class="col-sm-3">
      <div class="video-gallery text-center">
        <a href="#">
          <div class="iframe-img">
            <img src={`images/home/iframe${props.imgID}.png`} alt="" />
          </div>
          <div class="overlay-icon">
            <i>
              <FaPlay />
            </i>
          </div>
        </a>
        <p>{props.textContent}</p>
        <h2>{props.date}</h2>
      </div>
    </div>
  );
};

export default FooterVideoContent;
