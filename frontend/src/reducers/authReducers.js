import {
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAILURE,
  AUTH_REGISTER_REQUEST,
  AUTH_REGISTER_SUCCESS,
  AUTH_REGISTER_FAILURE,
  AUTH_LOGOUT_REQUEST,
  AUTH_LOGOUT_SUCCESS,
  AUTH_LOGOUT_FAILURE,
  AUTH_UPDATE_USER,
  AUTH_ERROR_HIDE,
} from "../actions/authActions";

const initialState = {
  loading: false,
  user: { authenticated: false, owner_shops: [] },
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

    case AUTH_REGISTER_REQUEST:
      return { ...state, loading: true };
    case AUTH_REGISTER_SUCCESS:
      return { ...state, loading: false, user: action.payload, error: "" };
    case AUTH_REGISTER_FAILURE:
      return { ...state, loading: false, user: "", error: action.payload };

    case AUTH_LOGOUT_REQUEST:
      return { ...state, loading: true };
    case AUTH_LOGOUT_SUCCESS:
      return {
        ...state,
        user: { authenticated: false, owner_shops: [] },
        loading: false,
      };
    case AUTH_LOGOUT_FAILURE:
      return {
        ...state,
        loading: false,
        user: { authenticated: false, owner_shops: [] },
        error: action.payload,
      };

    case AUTH_UPDATE_USER:
      return { ...state, user: action.payload };

    case AUTH_ERROR_HIDE:
      return { ...state, error: "" };
    default:
      return state;
  }
};

export default authReducer;
