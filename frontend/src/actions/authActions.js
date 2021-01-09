import axiosInstance from "../utils/networkUtils";

// Login actions
export const AUTH_LOGIN_REQUEST = "AUTH_LOGIN_REQUEST";
export const AUTH_LOGIN_SUCCESS = "AUTH_LOGIN_SUCCESS";
export const AUTH_LOGIN_FAILURE = "AUTH_LOGIN_FAILURE";

// Register user actions
export const AUTH_REGISTER_REQUEST = "AUTH_REGISTER_REQUEST";
export const AUTH_REGISTER_SUCCESS = "AUTH_REGISTER_SUCCESS";
export const AUTH_REGISTER_FAILURE = "AUTH_REGISTER_FAILURE";

// Logout actions
export const AUTH_LOGOUT_REQUEST = "AUTH_LOGOUT_REQUEST";
export const AUTH_LOGOUT_SUCCESS = "AUTH_LOGOUT_SUCCESS";
export const AUTH_LOGOUT_FAILURE = "AUTH_LOGOUT_FAILURE";

// Update actions
export const AUTH_UPDATE_USER = "AUTH_UPDATE_USER ";

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
    axiosInstance()
      .post("/login/", userData)
      .then((response) => {
        const userInfo = response.data;
        localStorage.setItem("token", userInfo.token);
        delete userInfo.token;
        userInfo.authenticated = true;
        dispatch(loginSuccess(userInfo));
      })
      .catch((error) => {
        const errors = error.response.data;
        let errorMsg = "";
        if (errors["phone"]) errorMsg = errors["phone"][0];
        else if (errors["password"]) errorMsg = errors["password"][0];
        else if (errors["non_field_errors"])
          errorMsg = errors["non_field_errors"][0];
        else errorMsg = "Something went wrong!";

        dispatch(loginFailure(errorMsg));
      });
  };
};
export const tryTokenLogin = () => {
  return (dispatch) => {
    if (localStorage.getItem("token")) {
      dispatch(loginRequest());
      axiosInstance()
        .post("/login/")
        .then((response) => {
          const userInfo = response.data;
          localStorage.setItem("token", userInfo.token);
          delete userInfo.token;
          userInfo.authenticated = true;
          dispatch(loginSuccess(userInfo));
        })
        .catch((error) => {
          console.log(error);
          localStorage.removeItem("token");
        });
    }
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
    axiosInstance()
      .post("/signup/", {
        first_name: userData.firstName,
        last_name: userData.lastName,
        phone: userData.phone,
        password: userData.password,
      })
      .then((response) => {
        const userInfo = response.data;
        localStorage.setItem("token", userInfo.token);
        delete userInfo.token;
        userInfo.authenticated = true;
        dispatch(registerSuccess(userInfo));
      })
      .catch((error) => {
        const errors = error.response ? error.response.data : {};
        let errorMsg = "";
        if (errors["first_name"]) errorMsg = errors["first_name"][0];
        if (errors["last_name"]) errorMsg = errors["last_name"][0];
        else if (errors["phone"]) errorMsg = errors["phone"][0];
        else if (errors["password"]) errorMsg = errors["password"][0];
        else if (errors["non_field_errors"])
          errorMsg = errors["non_field_errors"][0];
        else errorMsg = "Something went wrong!";

        console.log(errors);
        dispatch(registerFailure(errorMsg));
      });
  };
};

// Login action creators
export const logoutRequest = () => ({
  type: AUTH_LOGOUT_REQUEST,
});

export const logoutSuccess = () => ({
  type: AUTH_LOGOUT_SUCCESS,
});

export const logoutFailure = (error) => ({
  type: AUTH_LOGOUT_FAILURE,
  payload: error,
});

export const logout = () => {
  return (dispatch) => {
    dispatch(logoutRequest());
    axiosInstance()
      .post("/logout/")
      .then((response) => {
        localStorage.removeItem("token");
        dispatch(logoutSuccess());
      })
      .catch((error) => {
        localStorage.removeItem("token");
        const errors = error.response.data;
        let errorMsg = "";
        if (errors["phone"]) errorMsg = errors["phone"][0];
        else if (errors["password"]) errorMsg = errors["password"][0];
        else if (errors["non_field_errors"])
          errorMsg = errors["non_field_errors"][0];
        else errorMsg = "Something went wrong!";
        dispatch(logoutFailure(errorMsg));
      });
  };
};

export const updateUser = (userInfo) => ({
  type: AUTH_UPDATE_USER,
  payload: userInfo,
});

// Error action creators
export const hideError = () => ({ type: AUTH_ERROR_HIDE });
