import axiosInstance from "../utils/networkUtils";

import { updateUser } from "./authActions";
import { addToUserShopsList } from "../utils/authUtils";

// Dashboard actions
export const DASHBOARD_TAB_CHANGE = "DASHBOARD_TAB_CHANGE";
export const DASHBOARD_SELECT_SHOP = "DASHBOARD_SELECT_SHOP";
export const DASHBOARD_ERROR_INFO_HIDE = "DASHBOARD_ERROR_INFO_HIDE";
export const DASHBOARD_SET_ERROR_OR_INFO = "DASHBOARD_SET_ERROR_OR_INFO";
export const DASHBOARD_TOGGLE_DRAWER = "DASHBOARD_TOGGLE_DRAWER";

// Get shop details actions
export const GET_SHOP_DETAIL_REQUEST = "GET_SHOP_DETAIL_REQUEST";
export const GET_SHOP_DETAIL_SUCCESS = "GET_SHOP_DETAIL_SUCCESS";
export const GET_SHOP_DETAIL_FAILURE = "GET_SHOP_DETAIL_FAILURE";

// Add shop details actions
export const ADD_SHOP_REQUEST = "ADD_SHOP_REQUEST";
export const ADD_SHOP_SUCCESS = "ADD_SHOP_SUCCESS";
export const ADD_SHOP_FAILURE = "ADD_SHOP_FAILURE";

// Update shop action
export const UPDATE_SHOP_LIST = "UPDATE_SHOP_LIST";
export const UPDATE_SHOP_DETAIL = "UPDATE_SHOP_DETAIL";

export const TOGGLE_ADD_SHOP_FORM_DIALOG = "TOGGLE_ADD_SHOP_FORM_DIALOG";

// Dashboard actions creators
export const changeTab = (tabValue) => {
  return { type: DASHBOARD_TAB_CHANGE, payload: tabValue };
};
export const selectShop = (shopId) => {
  return { type: DASHBOARD_SELECT_SHOP, payload: shopId };
};
export const toggleDrawer = () => ({ type: DASHBOARD_TOGGLE_DRAWER });

export const toggleAddShopFormDialog = () => ({
  type: TOGGLE_ADD_SHOP_FORM_DIALOG,
});

export const copyShopLink = (shopDetail) => {
  return (dispatch) => {
    const el = document.createElement("textarea");
    el.value = shopDetail.url;
    el.setAttribute("readonly", "");
    el.style.position = "absolute";
    el.style.left = "-9999px";
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);

    dispatch(setErrorOrInfo({ info: "Link Copied!" }));
  };
};

// Get shop details action creators
export const getShopDetailRequest = () => ({ type: GET_SHOP_DETAIL_REQUEST });
export const getShopDetailSuccess = (shopDetail) => ({
  type: GET_SHOP_DETAIL_SUCCESS,
  payload: shopDetail,
});
export const getShopDetailFailure = (error) => ({
  type: GET_SHOP_DETAIL_FAILURE,
  payload: error,
});
export const getShopDetail = (shopUrl) => {
  return (dispatch) => {
    dispatch(getShopDetailRequest());
    axiosInstance()
      .get(shopUrl)
      .then((response) => {
        const shopDetail = response.data;
        dispatch(getShopDetailSuccess(shopDetail));
      })
      .catch((error) => {
        // const errors = error.response.data;
        console.log(error);
        dispatch(getShopDetailFailure("Failed to get shop!"));
      });
  };
};

// Get shop details action creators
export const addShopRequest = () => ({ type: ADD_SHOP_REQUEST });
export const addShopSuccess = (shopDetail) => ({
  type: ADD_SHOP_SUCCESS,
  payload: shopDetail,
});
export const addShopFailure = (error) => ({
  type: ADD_SHOP_FAILURE,
  payload: error,
});
export const addShop = (user, shopDetail) => {
  return (dispatch) => {
    dispatch(addShopRequest());
    axiosInstance()
      .post(`/shopowner/${user.id}/shops/`, shopDetail)
      .then((response) => {
        const addedShopDetail = response.data;
        console.log(addedShopDetail);
        const updatedUser = addToUserShopsList(user, addedShopDetail);
        localStorage.setItem("user", updatedUser);
        console.log(updatedUser);
        dispatch(updateUser(updatedUser));
        dispatch(addShopSuccess(addedShopDetail));
      })
      .catch((error) => {
        // const errors = error.response.data;
        console.log(error);
        dispatch(addShopFailure("Error Adding Shop!"));
      });
  };
};

export const updateShopDetail = (updatedShopDetail) => ({
  type: UPDATE_SHOP_DETAIL,
  payload: updatedShopDetail,
});
export const updateShopsList = (updatedShopsList) => ({
  type: UPDATE_SHOP_LIST,
  payload: updatedShopsList,
});

export const setErrorOrInfo = (errorOrInfo) => ({
  type: DASHBOARD_SET_ERROR_OR_INFO,
  payload: errorOrInfo,
});

export const hideErrorInfo = () => ({ type: DASHBOARD_ERROR_INFO_HIDE });
