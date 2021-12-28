import cartCounterReducer from "./cartCounterReducer";
import cartItemManagerReducer from "./cartItemManagerReducer";
import listItemsReducer from "./listItemsReducer";
import getCartSize from "./getCartSize";
import refreshCartSizeReducer from "./refreshCartSizeReducer";
import loginStatusReducer from "./loginStatusReducer";
import adminStatusReducer from "./adminCheckerReducer";
import printListManagerReducer from "./printlistReducer";
import demoAdminStatusReducer from "./demoAdminCheckerReducer";

import { combineReducers } from "redux";

const allReducers = combineReducers({
  cartItemManager: cartItemManagerReducer,
  listItemsRenderer: listItemsReducer,
  getCartSize: getCartSize,
  refreshCartSize: refreshCartSizeReducer,
  loginStatus: loginStatusReducer,
  adminStatus: adminStatusReducer,
  demoAdminStatus: demoAdminStatusReducer,
  printListCheckbox: printListManagerReducer,
});
export default allReducers;
