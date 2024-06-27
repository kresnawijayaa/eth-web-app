import {
  FETCH_PROFILE_REQUEST,
  FETCH_PROFILE_SUCCESS,
  FETCH_PROFILE_FAILURE,
  EDIT_PROFILE_REQUEST,
  EDIT_PROFILE_SUCCESS,
  EDIT_PROFILE_FAILURE,
} from '../actions/profileActions';

const initialState = {
  loading: false,
  profile: null,
  error: '',
};

export const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PROFILE_REQUEST:
    case EDIT_PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_PROFILE_SUCCESS:
    case EDIT_PROFILE_SUCCESS:
      return {
        loading: false,
        profile: action.payload,
        error: '',
      };
    case FETCH_PROFILE_FAILURE:
    case EDIT_PROFILE_FAILURE:
      return {
        loading: false,
        profile: null,
        error: action.payload,
      };
    default:
      return state;
  }
};
