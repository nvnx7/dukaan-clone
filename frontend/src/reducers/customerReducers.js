import {
  CUSTOMER_GET_SHOP_REQUEST,
  CUSTOMER_GET_SHOP_SUCCESS,
  CUSTOMER_GET_SHOP_FAILURE,
  UPDATE_BAG,
  CUSTOMER_PLACE_ORDER_REQUEST,
  CUSTOMER_PLACE_ORDER_SUCCESS,
  CUSTOMER_PLACE_ORDER_FAILURE,
  TOGGLE_PLACE_ORDER_FORM_DIALOG,
  CUSTOMER_SET_ERROR_OR_INFO,
  CUSTOMER_ERROR_INFO_HIDE,
} from "../actions/customerActions";

const initialState = {
  customer: {},
  shopDetail: {},
  bag: localStorage.getItem("bag")
    ? JSON.parse(localStorage.getItem("bag"))
    : [],
  placeOrderFormDialogOpen: false,
  error: "",
  info: "",
  loading: false,
};

const customerReducer = (state = initialState, action) => {
  switch (action.type) {
    case CUSTOMER_GET_SHOP_REQUEST:
      return { ...state, loading: true };
    case CUSTOMER_GET_SHOP_SUCCESS:
      return { ...state, shopDetail: action.payload, loading: false };
    case CUSTOMER_GET_SHOP_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case UPDATE_BAG:
      return { ...state, bag: action.payload };

    case TOGGLE_PLACE_ORDER_FORM_DIALOG:
      return {
        ...state,
        placeOrderFormDialogOpen: !state.placeOrderFormDialogOpen,
      };

    case CUSTOMER_PLACE_ORDER_REQUEST:
      return { ...state, loading: true };
    case CUSTOMER_PLACE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        info: "Successfully Placed Order!",
        placeOrderFormDialogOpen: false,
      };
    case CUSTOMER_PLACE_ORDER_FAILURE:
      return { ...state, loading: false, error: action.payload, info: "" };

    case CUSTOMER_SET_ERROR_OR_INFO:
      const errorOrInfo = action.payload;
      return {
        ...state,
        error: errorOrInfo.error || "",
        info: errorOrInfo.info || "",
        loading: false,
      };
    case CUSTOMER_ERROR_INFO_HIDE:
      return { ...state, error: "", info: "" };

    default:
      return state;
  }
};

export default customerReducer;
