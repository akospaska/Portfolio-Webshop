import React, { useState } from 'react';
import DetailedProductPage from '../DetailerProductPage/DetailerProductPage';
import LeftSideBarContainer from '../MainMenuBodyContent/MainContentContainer/LeftsideBarContainer/LeftsideBarContainer';
import { useEffect } from 'react';

import ProductsList from './ProductsList/ProductsList';

const ProductsPage = (props) => {
  const [showList, setShowList] = useState(true);
  const [choosenItemId, setChoosenItemId] = useState(1);

  return (
    <div className="container">
      <div className="row">
        <LeftSideBarContainer />
        {showList ? <ProductsList /> : <DetailedProductPage itemId={choosenItemId} />}
      </div>
    </div>
  );
};

export default ProductsPage;
