const getCartSize = (state = 0, action) => {
  switch (action.type) {
    case 'GET_CART_SIZE':
      return action.payload;

    default:
      return state;
  }
};

export default getCartSize;
