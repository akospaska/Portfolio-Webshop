import React from 'react';
import ManageProducts from './ProductManager/ManageProducts/ManageProducts';
import RegisterNewProduct from './ProductManager/RegisterNewItem/RegisterNewProduct';

const ProductManager = () => {
  return (
    <div class="MainProductManager">
      <RegisterNewProduct />
      <ManageProducts />
    </div>
  );
};

export default ProductManager;
