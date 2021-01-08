import {
  CUSTOMER_GET_SHOP_REQUEST,
  CUSTOMER_GET_SHOP_SUCCESS,
  CUSTOMER_GET_SHOP_FAILURE,
  UPDATE_BAG,
  CUSTOMER_SET_ERROR_OR_INFO,
  CUSTOMER_ERROR_INFO_HIDE,
} from "../actions/customerActions";

const initialState = {
  customer: {},
  shopDetail: {},
  bag: [],
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
