import axiosInstance from "../utils/networkUtils";
import { updateProductCountInBag } from "../utils/customerUtils";

// Get shopfront actions
export const CUSTOMER_GET_SHOP_REQUEST = "CUSTOMER_GET_SHOP_REQUEST";
export const CUSTOMER_GET_SHOP_SUCCESS = "CUSTOMER_GET_SHOP_SUCCESS";
export const CUSTOMER_GET_SHOP_FAILURE = "CUSTOMER_GET_SHOP_FAILURE";

// Bag Actions
export const UPDATE_BAG = "UPDATE_BAG";

// Place Order Actions
export const CUSTOMER_PLACE_ORDER_REQUEST = "CUSTOMER_PLACE_ORDER_REQUEST";
export const CUSTOMER_PLACE_ORDER_SUCCESS = "CUSTOMER_PLACE_ORDER_SUCCESS";
export const CUSTOMER_PLACE_ORDER_FAILURE = "CUSTOMER_PLACE_ORDER_FAILURE";

export const TOGGLE_PLACE_ORDER_FORM_DIALOG = "TOGGLE_PLACE_ORDER_FORM_DIALOG";

// Error/Info message actions
export const CUSTOMER_SET_ERROR_OR_INFO = "CUSTOMER_SET_ERROR_OR_INFO";
export const CUSTOMER_ERROR_INFO_HIDE = "CUSTOMER_ERROR_INFO_HIDE";

// Get shopfront  action creators
export const getCustomerShopRequest = () => ({
  type: CUSTOMER_GET_SHOP_REQUEST,
});
export const getCustomerShopSuccess = (shopDetail) => ({
  type: CUSTOMER_GET_SHOP_SUCCESS,
  payload: shopDetail,
});
export const getCustomerShopFailure = (error) => ({
  type: CUSTOMER_GET_SHOP_FAILURE,
  payload: error,
});
export const getCustomerShop = (shopId) => {
  return (dispatch) => {
    console.log(shopId);
    dispatch(getCustomerShopRequest());
    axiosInstance()
      .get(`/shop/${shopId}/`)
      .then((response) => {
        const shopDetail = response.data;
        console.log(shopDetail);
        dispatch(getCustomerShopSuccess(shopDetail));
      })
      .catch((error) => {
        // const errors = error.response.data;
        console.log(error);
        const msg =
          error.response.status == 404
            ? "Shop Does Not Exist!"
            : "Something Went Wrong!";
        dispatch(getCustomerShopFailure(msg));
      });
  };
};

// Bag action creators
export const updateBag = (bag) => ({ type: UPDATE_BAG, payload: bag });
export const updateBagProductCount = (bag, product, count) => {
  return (dispatch) => {
    console.log(`${count} ${product.id}`);
    const updatedBag = updateProductCountInBag(bag, product, count);
    localStorage.setItem("bag", JSON.stringify(updatedBag));
    dispatch(updateBag(updatedBag));
  };
};

// Place Order action creators
export const placeOrderRequest = () => ({ type: CUSTOMER_PLACE_ORDER_REQUEST });
export const placeOrderSuccess = (orderData) => ({
  type: CUSTOMER_PLACE_ORDER_SUCCESS,
  payload: orderData,
});
export const placeOrderFailure = (error) => ({
  type: CUSTOMER_PLACE_ORDER_FAILURE,
  payload: error,
});
export const placeOrder = (shopDetail, orderData) => {
  return (dispatch) => {
    dispatch(placeOrderRequest());
    axiosInstance()
      .post(`/shop/${shopDetail.id}/orders/`, orderData)
      .then((response) => {
        dispatch(placeOrderSuccess(response.data));
        // Empty bag
        localStorage.setItem("bag", JSON.stringify([]));
        dispatch(updateBag([]));
      })
      .catch((error) => {
        dispatch(placeOrderFailure("Failed To Place Order!"));
      });
  };
};

export const togglePlaceOrderFormDialog = {
  type: TOGGLE_PLACE_ORDER_FORM_DIALOG,
};

export const setErrorOrInfo = (errorOrInfo) => ({
  type: CUSTOMER_SET_ERROR_OR_INFO,
  payload: errorOrInfo,
});

export const hideErrorInfo = () => ({ type: CUSTOMER_ERROR_INFO_HIDE });
