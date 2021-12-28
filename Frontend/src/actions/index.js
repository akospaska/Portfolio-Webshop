//CART DECORATION NUMBER
export const cartCountIncrement = (itemId) => {
  return {
    type: "CART_ITEM_COUNT_INCREMENT",
    payload: itemId,
  };
};

export const cartCountDecrement = (itemId) => {
  return {
    type: "CART_ITEM_COUNT_DECREMENT",
    payload: itemId,
  };
};

//CART MANAGER
export const addItemToCart = (itemId) => {
  return {
    type: "ADD_ITEM_TO_CART",
    payload: itemId,
  };
};

export const removeItemFromCart = (itemId) => {
  return {
    type: "REMOVE_ITEM_FROM_CART",
    payload: itemId,
  };
};

// LIST SHOP ITEMS
export const getFeaturedItems = () => {
  return {
    type: "GET_ITEMS_BY_FEATURED",
  };
};

export const getItemsByCategoryId = (selectorId) => {
  return {
    type: "GET_ITEMS_BY_CATEGORYID",
    payload: selectorId,
  };
};

export const getItemsByBrandId = (selectorId) => {
  return {
    type: "GET_ITEMS_BY_BRANDID",
    payload: selectorId,
  };
};

export const setCartSize = (cartSize) => {
  return {
    type: "GET_CART_SIZE",
    payload: cartSize,
  };
};

export const setRefreshCartSize = () => {
  return {
    type: "REFRESH_CART_SIZE",
  };
};

export const setLoginStatus = (loginStatus) => {
  return {
    type: "SET_LOGIN_STATUS",
    payload: loginStatus,
  };
};

export const setAdminStatus = (adminStatus) => {
  const inCaseOfUndefined = false;
  return {
    type: "SET_ADMIN_STATUS",
    payload: adminStatus ? adminStatus : inCaseOfUndefined,
  };
};

export const setDemoAdminStatus = (demoAdminStatus) => {
  const inCaseOfUndefined = false;
  return {
    type: "SET_DEMOADMIN_STATUS",
    payload: demoAdminStatus ? demoAdminStatus : inCaseOfUndefined,
  };
};

export const addChecboxItem = (orderId) => {
  return {
    type: "ADD_CHECKBOX_ITEM",
    payload: orderId,
  };
};

export const toggleCheckbox = (orderId) => {
  return {
    type: "CHECKBOX_TOGGLE",
    payload: orderId,
  };
};

export const clearCheckbox = () => {
  return {
    type: "CLEAR_CHECKBOX",
  };
};

export const selectAllCheckbox = () => {
  return {
    type: "TOGGLE_ALL_ON",
  };
};

export const deSelectAllCheckbox = () => {
  return {
    type: "TOGGLE_ALL_OFF",
  };
};
