import React, { Component } from 'react';
import MainContentContainer from './MainContentContainer/MainContentContainer';
import Slider from './Slider/Slider';

const MainMenuBodyContent = () => {
  return (
    <div>
      <Slider />
      <MainContentContainer />
    </div>
  );
};

export default MainMenuBodyContent;
