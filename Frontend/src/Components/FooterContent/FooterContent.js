import React from 'react';
import FooterBottom from './FooterBottom/FooterBottom';

import FooterContentTop from './FooterContentTop/FooterContenTop';
import FooterWidgetsContainer from './FooterWidgets/FooterWidgetsContainer';

const FooterContent = () => {
  return (
    <footer id="footer">
      <FooterContentTop />

      <FooterWidgetsContainer />
      <FooterBottom />
    </footer>
  );
};

export default FooterContent;
