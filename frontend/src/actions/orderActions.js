import axiosInstance from "../utils/networkUtils";
import { updateOrderInShop } from "../utils/shopUtils";
import { updateShopDetail, setErrorOrInfo } from "./dashboardActions";

export const UPDATE_ORDER_STATUS_REQUEST = "UPDATE_ORDER_STATUS_REQUEST";
export const UPDATE_ORDER_STATUS_SUCCESS = "UPDATE_ORDER_STATUS_SUCCESS";
export const UPDATE_ORDER_STATUS_FAILURE = "UPDATE_ORDER_STATUS_FAILURE";

export const updateOrderStatusRequest = () => ({
  type: UPDATE_ORDER_STATUS_REQUEST,
});
export const updateOrderStatusSuccess = () => ({
  type: UPDATE_ORDER_STATUS_SUCCESS,
});
export const updateOrderStatusFailure = () => ({
  type: UPDATE_ORDER_STATUS_FAILURE,
});

export const updateOrderStatus = (shopDetail, order) => {
  return (dispatch) => {
    dispatch(updateOrderStatusRequest());
    axiosInstance()
      .patch(`/shop/${shopDetail.id}/orders/${order.id}/`, order)
      .then((response) => {
        const updatedOrder = response.data;
        const updatedShopDetail = updateOrderInShop(shopDetail, updatedOrder);
        dispatch(updateOrderStatusSuccess());
        dispatch(updateShopDetail(updatedShopDetail));
      })
      .catch((error) => {
        // const errors = error.response.data;
        console.log(error);
        dispatch(updateOrderStatusFailure());
        dispatch(setErrorOrInfo({ error: "Something is wrong!" }));
      });
  };
};
