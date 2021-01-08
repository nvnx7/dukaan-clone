import { combineReducers } from "redux";

import authReducer from "./authReducers";
import dashboardReducer from "./dashboardReducers";
import shopReducer from "./shopReducers";
import orderReducer from "./orderReducers";
import customerReducer from "./customerReducers";

const rootReducer = combineReducers({
  auth: authReducer,
  dashboard: dashboardReducer,
  shop: shopReducer,
  order: orderReducer,
  customer: customerReducer,
});

export default rootReducer;
