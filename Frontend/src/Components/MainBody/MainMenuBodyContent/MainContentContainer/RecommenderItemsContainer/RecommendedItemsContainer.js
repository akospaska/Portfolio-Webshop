import React, { Component } from 'react';

import RecommendedItems from './RecommendedItems/RecommendedItems';
import Carousel from 'react-elastic-carousel';

const RecommendedItemsContainer = () => {
  return (
    <div class="recommended_items">
      <h2 class="title text-center">recommended items</h2>

      <div id="recommended-item-carousel" class="carousel slide" data-ride="carousel">
        <div class="carousel-inner">
          <Carousel>
            <RecommendedItems isActive={'active'} />
            <RecommendedItems isActive={'active'} />
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default RecommendedItemsContainer;
