const printListManagerReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_CHECKBOX_ITEM': {
      return [...state, { orderId: action.payload, isChecked: false }];
    }

    case 'CHECKBOX_TOGGLE': {
      let temporaryState = state;

      let positionOfTheSearchedStateObject = state.findIndex((a) => a.orderId == action.payload);

      temporaryState[positionOfTheSearchedStateObject].isChecked =
        !temporaryState[positionOfTheSearchedStateObject].isChecked;

      return temporaryState;
    }

    case 'TOGGLE_ALL_ON': {
      let temporaryState = state;

      temporaryState.map((a) => (a.isChecked = true));

      return temporaryState;
    }
    case 'TOGGLE_ALL_OFF': {
      let temporaryState = state;

      temporaryState.map((a) => (a.isChecked = false));

      return temporaryState;
    }

    case 'CLEAR_CHECKBOX': {
      state = [];
      return state;
    }

    default:
      return state;
  }
};

export default printListManagerReducer;
