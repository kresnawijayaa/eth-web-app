import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
  } from '../actions/authActions';
  
  const initialState = {
    loading: false,
    user: null,
    error: '',
  };
  
  export const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case LOGIN_REQUEST:
      case REGISTER_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case LOGIN_SUCCESS:
      case REGISTER_SUCCESS:
        return {
          loading: false,
          user: action.payload,
          error: '',
        };
      case LOGIN_FAILURE:
      case REGISTER_FAILURE:
        return {
          loading: false,
          user: null,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  