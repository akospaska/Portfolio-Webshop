const adminStatusReducer = (state = false, action) => {
  switch (action.type) {
    case "SET_ADMIN_STATUS":
      return action.payload;

    default:
      return state;
  }
};

export default adminStatusReducer;
