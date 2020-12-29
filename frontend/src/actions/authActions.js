import request from "../network";

// Login actions
export const AUTH_LOGIN_REQUEST = "AUTH_LOGIN_REQUEST";
export const AUTH_LOGIN_SUCCESS = "AUTH_LOGIN_SUCCESS";
export const AUTH_LOGIN_FAILURE = "AUTH_LOGIN_FAILURE";

// Register user actions
export const AUTH_REGISTER_REQUEST = "AUTH_REGISTER_REQUEST";
export const AUTH_REGISTER_SUCCESS = "AUTH_REGISTER_SUCCESS";
export const AUTH_REGISTER_FAILURE = "AUTH_REGISTER_FAILURE";

// Visibility of error message
export const AUTH_ERROR_HIDE = "AUTH_ERROR_HIDE";

// Login action creators
export const loginRequest = () => ({
  type: AUTH_LOGIN_REQUEST,
});

export const loginSuccess = (userInfo) => ({
  type: AUTH_LOGIN_SUCCESS,
  payload: userInfo,
});

export const loginFailure = (error) => ({
  type: AUTH_LOGIN_FAILURE,
  payload: error,
});

export const login = (userData) => {
  return (dispatch) => {
    dispatch(loginRequest());
    request
      .post("/login/", {
        phone: userData.phone,
        password: userData.password,
      })
      .then((response) => {
        const userInfo = response.data;
        localStorage.setItem("token", userInfo.token);
        delete userInfo.token;
        userInfo.authenticated = true;
        dispatch(loginSuccess(userInfo));
      })
      .catch((error) => {
        // console.log(error.response.data);
        let msg = "Error Ocurred!";
        if (error.response.status === 401) {
          msg = "Phone or password is incorrect!";
        }
        dispatch(loginFailure(msg));
      });
  };
};

// Register action creators
export const registerRequest = () => ({
  type: AUTH_REGISTER_REQUEST,
});

export const registerSuccess = (userInfo) => ({
  type: AUTH_REGISTER_SUCCESS,
  payload: userInfo,
});

export const registerFailure = (error) => ({
  type: AUTH_REGISTER_FAILURE,
  payload: error,
});

export const register = (userData) => {
  return (dispatch) => {
    dispatch(registerRequest());
    request
      .post("/signup/", {
        first_name: userData.firstName,
        last_name: userData.lastName,
        phone: userData.phone,
        password: userData.password,
      })
      .then((response) => {
        const token = response.data;
        console.log(token);
        dispatch(loginSuccess(token.token));
      })
      .catch((error) => {
        dispatch(loginFailure(error.message));
      });
  };
};

// Error action creators
export const hideError = () => ({ type: AUTH_ERROR_HIDE });
