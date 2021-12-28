const demoAdminStatusReducer = (state = false, action) => {
  switch (action.type) {
    case "SET_DEMOADMIN_STATUS":
      return action.payload;

    default:
      return state;
  }
};

export default demoAdminStatusReducer;
