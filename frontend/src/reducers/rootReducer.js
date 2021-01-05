import { combineReducers } from "redux";

import authReducer from "./authReducers";
import dashboardReducer from "./dashboardReducers";
import shopReducer from "./shopReducers";
import orderReducer from "./orderReducers";

const rootReducer = combineReducers({
  auth: authReducer,
  dashboard: dashboardReducer,
  shop: shopReducer,
  order: orderReducer,
});

export default rootReducer;
