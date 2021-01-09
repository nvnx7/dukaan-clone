import {
  DASHBOARD_TAB_CHANGE,
  DASHBOARD_SELECT_SHOP,
  DASHBOARD_ERROR_INFO_HIDE,
  DASHBOARD_SET_ERROR_OR_INFO,
  DASHBOARD_TOGGLE_DRAWER,
  GET_SHOP_DETAIL_REQUEST,
  GET_SHOP_DETAIL_SUCCESS,
  GET_SHOP_DETAIL_FAILURE,
  ADD_SHOP_REQUEST,
  ADD_SHOP_SUCCESS,
  ADD_SHOP_FAILURE,
  UPDATE_SHOP_DETAIL,
  TOGGLE_ADD_SHOP_FORM_DIALOG,
  UPDATE_SHOP_LIST,
} from "../actions/dashboardActions";
import { updateShopsList } from "../utils/shopUtils";

const initialState = {
  tabValue: 0,
  selectedShop: 0,
  loading: false,
  shopsList: [],
  error: "",
  info: "",
  drawerOpen: false,
  addShopDialogFormOpen: false,
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
        shopsList: updateShopsList(state.shopsList, action.payload),
      };
    case GET_SHOP_DETAIL_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case ADD_SHOP_REQUEST:
      return { ...state, loading: true };

    case ADD_SHOP_SUCCESS:
      const extendedShopsList = state.shopsList.slice(0);
      extendedShopsList.push(action.payload);
      return {
        ...state,
        shopsList: extendedShopsList,
        loading: false,
        info: "Successfully Added Shop!",
        addShopDialogFormOpen: false,
      };

    case ADD_SHOP_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case UPDATE_SHOP_DETAIL:
      return {
        ...state,
        loading: false,
        error: "",
        info: "Successfully Updated Shop!",
        shopsList: updateShopsList(state.shopsList, action.payload),
      };
    case UPDATE_SHOP_LIST:
      return { ...state, shopsList: action.payload };

    case TOGGLE_ADD_SHOP_FORM_DIALOG:
      return { ...state, addShopDialogFormOpen: !state.addShopDialogFormOpen };

    default:
      return state;
  }
};

export default dashboardReducer;
