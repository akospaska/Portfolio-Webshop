const cartItemManagerReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_ITEM_TO_CART": {
      let indexNumber = state.findIndex((a) => a.productId == action.payload);

      if (indexNumber >= 0) {
        state[indexNumber].count = state[indexNumber].count + 1;
        return state;
      } else {
        // state.push({ productId: productId, count: 1 });
        return [...state, { productId: action.payload, count: 1 }];
      }
    }

    case "REMOVE_ITEM_FROM_CART": {
      action.payload;

      let filteredState = state.filter((a) => a.productId != action.payload);
      return filteredState;
    }

    case "CART_ITEM_COUNT_INCREMENT": {
      let temporaryState = state;

      let positionOfTheSearchedStateObject = state.findIndex((a) => a.productId == action.payload);
      temporaryState[positionOfTheSearchedStateObject].count = temporaryState[positionOfTheSearchedStateObject].count + 1;
      return temporaryState;
    }

    case "CART_ITEM_COUNT_DECREMENT": {
      let positionOfTheSearchedStateObject = state.findIndex((a) => a.productId == action.payload);

      if (state[positionOfTheSearchedStateObject].count <= 1) {
        return state;
      } else {
        state[positionOfTheSearchedStateObject].count = state[positionOfTheSearchedStateObject].count - 1;
        return state;
      }
    }

    default:
      return state;
  }
};

export default cartItemManagerReducer;
