const refreshCartSizeReducer = (state = true, action) => {
  switch (action.type) {
    case "REFRESH_CART_SIZE":
      return !state;

    default:
      return state;
  }
};

export default refreshCartSizeReducer;
