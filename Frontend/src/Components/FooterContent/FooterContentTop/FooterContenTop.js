import React from 'react';
import { FaPlay } from 'react-icons/fa';
import FooterAddress from './FooterAddress/FooterAddress';
import FooterCompanyInfo from './FooterCompanyInfo/FooterCompanyInfo';
import FooterVideoContent from './FooterVideoContent/FooterVideoContent';

const FooterContentTop = () => {
  return (
    <div class="footer-top">
      <div class="container">
        <div class="row">
          <FooterCompanyInfo />
          <div class="col-sm-7">
            <FooterVideoContent imgID={1} textContent={'Circle of Hands'} date={'2021 NOV 21'} />
            <FooterVideoContent imgID={2} textContent={'Circle of Hands'} date={'2021 NOV 21'} />
            <FooterVideoContent imgID={3} textContent={'Circle of Hands'} date={'2021 NOV 21'} />
            <FooterVideoContent imgID={4} textContent={'Circle of Hands'} date={'2021 NOV 21'} />
          </div>
          <FooterAddress />
        </div>
      </div>
    </div>
  );
};

export default FooterContentTop;
