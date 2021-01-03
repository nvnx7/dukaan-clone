import { combineReducers } from "redux";

import authReducer from "./authReducers";
import dashboardReducer from "./dashboardReducers";
import shopReducer from "./shopReducers";

const rootReducer = combineReducers({
  auth: authReducer,
  dashboard: dashboardReducer,
  shop: shopReducer,
});

export default rootReducer;
