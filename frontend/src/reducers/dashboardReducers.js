import {
  DASHBOARD_TAB_CHANGE,
  DASHBOARD_SELECT_SHOP,
  DASHBOARD_ERROR_HIDE,
  GET_SHOP_DETAIL_REQUEST,
  GET_SHOP_DETAIL_SUCCESS,
  GET_SHOP_DETAIL_FAILURE,
} from "../actions/dashboardActions";

const initialState = {
  tabValue: 0,
  selectedShop: 0,
  loading: false,
  shops: [],
};

const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case DASHBOARD_TAB_CHANGE:
      return { ...state, tabValue: action.payload };

    case DASHBOARD_ERROR_HIDE:
      return { ...state, error: "" };

    case DASHBOARD_SELECT_SHOP:
      return { ...state, selectedShop: action.payload };

    case GET_SHOP_DETAIL_REQUEST:
      return { ...state, loading: true };
    case GET_SHOP_DETAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        shops: [...state.shops, action.payload],
      };
    case GET_SHOP_DETAIL_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default dashboardReducer;
