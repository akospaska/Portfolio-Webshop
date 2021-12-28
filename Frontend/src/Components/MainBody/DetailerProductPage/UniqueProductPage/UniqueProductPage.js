import React from 'react';
import RecommendedItemsContainer from '../../MainMenuBodyContent/MainContentContainer/RecommenderItemsContainer/RecommendedItemsContainer';
import ReviewAndOthersSection from '../ReviewAndOthersSection/ReviewAndOtherSection';
import UniqueProductPageCartContainer from './UniqueProductPageCartContainer/UniqueProductPageCartContainer';
import UniqueProductPageImagesContainer from './UniqueProductPageImagesContainer/UniqueProductPageImagesContainer';

const UniqueProductPage = (props) => {
  return (
    <div class="col-sm-9 padding-right">
      <div class="product-details">
        <UniqueProductPageImagesContainer fakeApiSrc={props.fakeApiSrc} />
        <UniqueProductPageCartContainer fakeApiSrc={props.fakeApiSrc} />
      </div>
      {/*   <ReviewAndOthersSection fakeApiSrc={props.fakeApiSrc} /> */}
      {/*     <RecommendedItemsContainer /> */}
    </div>
  );
};

export default UniqueProductPage;
