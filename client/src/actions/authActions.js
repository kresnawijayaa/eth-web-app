import axios from "axios";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILURE = "REGISTER_FAILURE";

const loginRequest = () => ({
  type: LOGIN_REQUEST,
});

const loginSuccess = (user) => ({
  type: LOGIN_SUCCESS,
  payload: user,
});

const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error,
});

const registerRequest = () => ({
  type: REGISTER_REQUEST,
});

const registerSuccess = (user) => ({
  type: REGISTER_SUCCESS,
  payload: user,
});

const registerFailure = (error) => ({
  type: REGISTER_FAILURE,
  payload: error,
});

export const login = (credentials) => {
  return (dispatch) => {
    dispatch(loginRequest());
    axios
      .get(
        `http://localhost:3000/users?username=${credentials.username}&password=${credentials.password}`
      )
      .then((response) => {
        if (response.data.length > 0) {
          dispatch(loginSuccess(response.data[0]));
        } else {
          dispatch(loginFailure("Invalid username or password"));
        }
      })
      .catch((error) => {
        dispatch(loginFailure(error.message));
      });
  };
};

export const register = (userInfo) => {
  return (dispatch) => {
    dispatch(registerRequest());
    axios
      .post("http://localhost:3000/users", userInfo)
      .then((response) => {
        dispatch(registerSuccess(response.data));
      })
      .catch((error) => {
        dispatch(registerFailure(error.message));
      });
  };
};
