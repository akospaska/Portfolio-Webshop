import React from 'react';
import HeaderTop from './HeaderTop/HeaderTop';
import HeaderMiddle from './HeaderMiddle/HeaderMiddle';
import HeaderBottom from './HeaderBottom/HeaderBottom';

const Header = (props) => {
  return (
    <div>
      {props.children}
      <HeaderTop />
      <HeaderMiddle />
      <HeaderBottom />
    </div>
  );
};

export default Header;
