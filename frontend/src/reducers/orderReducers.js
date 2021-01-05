import {
  UPDATE_ORDER_STATUS_REQUEST,
  UPDATE_ORDER_STATUS_SUCCESS,
  UPDATE_ORDER_STATUS_FAILURE,
} from "../actions/orderActions";

const initialState = {
  loading: false,
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_ORDER_STATUS_REQUEST:
      return { ...state, loading: true };
    case UPDATE_ORDER_STATUS_SUCCESS:
      return { ...state, loading: false };
    case UPDATE_ORDER_STATUS_FAILURE:
      return { ...state, loading: false };

    default:
      return state;
  }
};

export default orderReducer;
