import {
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAILURE,
  AUTH_ERROR_HIDE,
} from "../actions/authActions";

const initialState = {
  loading: false,
  user: {},
  error: "",
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_LOGIN_REQUEST:
      return { ...state, loading: true };
    case AUTH_LOGIN_SUCCESS:
      return { ...state, loading: false, user: action.payload, error: "" };
    case AUTH_LOGIN_FAILURE:
      return { ...state, loading: false, user: "", error: action.payload };

    case AUTH_ERROR_HIDE:
      return { ...state, error: "" };
    default:
      return state;
  }
};

export default authReducer;
