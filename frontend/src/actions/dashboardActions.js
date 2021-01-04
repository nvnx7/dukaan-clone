import axiosInstance from "../utils/networkUtils";

// Dashboard actions
export const DASHBOARD_TAB_CHANGE = "DASHBOARD_TAB_CHANGE";
export const DASHBOARD_SELECT_SHOP = "DASHBOARD_SELECT_SHOP";
export const DASHBOARD_ERROR_INFO_HIDE = "DASHBOARD_ERROR_INFO_HIDE";
export const DASHBOARD_SET_ERROR_OR_INFO = "DASHBOARD_SET_ERROR_OR_INFO";

// Get shop details actions
export const GET_SHOP_DETAIL_REQUEST = "GET_SHOP_DETAIL_REQUEST";
export const GET_SHOP_DETAIL_SUCCESS = "GET_SHOP_DETAIL_SUCCESS";
export const GET_SHOP_DETAIL_FAILURE = "GET_SHOP_DETAIL_FAILURE";

// Update shop detail acion
export const UPDATE_SHOP_DETAIL = "UPDATE_SHOP_DETAIL";

// Dashboard actions creators
export const changeTab = (tabValue) => {
  return { type: DASHBOARD_TAB_CHANGE, payload: tabValue };
};

export const selectShop = (shopId) => {
  return { type: DASHBOARD_SELECT_SHOP, payload: shopId };
};

// Get shop details action creators
export const getShopDetailRequest = () => ({
  type: GET_SHOP_DETAIL_REQUEST,
});

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
        const errors = error.response.data;
        dispatch(getShopDetailFailure(errors));
      });
  };
};

export const updateShopDetail = (updatedShopDetail) => ({
  type: UPDATE_SHOP_DETAIL,
  payload: updatedShopDetail,
});

export const setErrorOrInfo = (errorOrInfo) => ({
  type: DASHBOARD_SET_ERROR_OR_INFO,
  payload: errorOrInfo,
});

export const hideErrorInfo = () => ({ type: DASHBOARD_ERROR_INFO_HIDE });
