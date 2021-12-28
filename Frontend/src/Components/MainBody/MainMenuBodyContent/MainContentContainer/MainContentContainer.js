import React, { Component } from 'react';
import LeftSideBarContainer from './LeftsideBarContainer/LeftsideBarContainer';

import MainMenuCenterContent from './MainMenuCenterContent/MainMenuCenterContent';

//   <FeaturesItemsContainer /> <CategoryContainer />

const MainContentContainer = () => {
  return (
    <div className="container">
      <div className="row">
        <LeftSideBarContainer />
        <MainMenuCenterContent />
      </div>
    </div>
  );
};

export default MainContentContainer;
