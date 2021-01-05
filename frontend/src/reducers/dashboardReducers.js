import {
  DASHBOARD_TAB_CHANGE,
  DASHBOARD_SELECT_SHOP,
  DASHBOARD_ERROR_INFO_HIDE,
  DASHBOARD_SET_ERROR_OR_INFO,
  DASHBOARD_TOGGLE_DRAWER,
  GET_SHOP_DETAIL_REQUEST,
  GET_SHOP_DETAIL_SUCCESS,
  GET_SHOP_DETAIL_FAILURE,
  UPDATE_SHOP_DETAIL,
} from "../actions/dashboardActions";

const initialState = {
  tabValue: 0,
  selectedShop: 0,
  loading: false,
  shopsList: [],
  error: "",
  info: "",
  drawerOpen: false,
};

const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case DASHBOARD_TAB_CHANGE:
      return { ...state, tabValue: action.payload };

    case DASHBOARD_ERROR_INFO_HIDE:
      return { ...state, error: "", info: "" };

    case DASHBOARD_SELECT_SHOP:
      return { ...state, selectedShop: action.payload };

    case DASHBOARD_SET_ERROR_OR_INFO:
      const errorOrInfo = action.payload;
      return {
        ...state,
        error: errorOrInfo.error || "",
        info: errorOrInfo.info || "",
        loading: false,
      };

    case DASHBOARD_TOGGLE_DRAWER:
      return { ...state, drawerOpen: !state.drawerOpen };

    case GET_SHOP_DETAIL_REQUEST:
      return { ...state, loading: true };
    case GET_SHOP_DETAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        shopsList: [...state.shopsList, action.payload],
      };
    case GET_SHOP_DETAIL_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case UPDATE_SHOP_DETAIL:
      const updatedShopDetail = action.payload;
      const updatedShopsList = state.shopsList.map((shopDetail) => {
        if (shopDetail.id == updatedShopDetail.id) return updatedShopDetail;
        return shopDetail;
      });
      return {
        ...state,
        loading: false,
        error: "",
        info: "Operation Successful!",
        shopsList: updatedShopsList,
      };

    default:
      return state;
  }
};

export default dashboardReducer;
