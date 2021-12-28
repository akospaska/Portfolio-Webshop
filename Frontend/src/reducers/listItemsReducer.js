const listItemsReducer = (state = { type: 'getfeatureditems' }, action) => {
  switch (action.type) {
    case 'GET_ITEMS_BY_FEATURED':
      return { type: 'getfeatureditems' };

    case 'GET_ITEMS_BY_CATEGORYID':
      return { type: 'getitemsbycategory', selectorId: action.payload };

    case 'GET_ITEMS_BY_BRANDID':
      return { type: 'getitemsbybrand', selectorId: action.payload };

    default:
      return state;
  }
};

export default listItemsReducer;
