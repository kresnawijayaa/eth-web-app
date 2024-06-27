import axios from "axios";

export const FETCH_PROFILE_REQUEST = "FETCH_PROFILE_REQUEST";
export const FETCH_PROFILE_SUCCESS = "FETCH_PROFILE_SUCCESS";
export const FETCH_PROFILE_FAILURE = "FETCH_PROFILE_FAILURE";

export const EDIT_PROFILE_REQUEST = "EDIT_PROFILE_REQUEST";
export const EDIT_PROFILE_SUCCESS = "EDIT_PROFILE_SUCCESS";
export const EDIT_PROFILE_FAILURE = "EDIT_PROFILE_FAILURE";

const fetchProfileRequest = () => ({
  type: FETCH_PROFILE_REQUEST,
});

const fetchProfileSuccess = (profile) => ({
  type: FETCH_PROFILE_SUCCESS,
  payload: profile,
});

const fetchProfileFailure = (error) => ({
  type: FETCH_PROFILE_FAILURE,
  payload: error,
});

const editProfileRequest = () => ({
  type: EDIT_PROFILE_REQUEST,
});

const editProfileSuccess = (profile) => ({
  type: EDIT_PROFILE_SUCCESS,
  payload: profile,
});

const editProfileFailure = (error) => ({
  type: EDIT_PROFILE_FAILURE,
  payload: error,
});

export const fetchProfile = (userId) => {
  return (dispatch) => {
    dispatch(fetchProfileRequest());

    setTimeout(() => {
    axios
      .get(`http://localhost:3000/users?id=${userId}`)
      .then((response) => {
        dispatch(fetchProfileSuccess(response.data[0]));
      })
      .catch((error) => {
        dispatch(fetchProfileFailure(error.message));
      });
    }, 3000);
  };
};

export const editProfile = (userId, profileData) => {
  return (dispatch) => {
    dispatch(editProfileRequest());
    axios
      .put(`http://localhost:3000/users/${userId}`, profileData)
      .then((response) => {
        dispatch(editProfileSuccess(response.data));
      })
      .catch((error) => {
        dispatch(editProfileFailure(error.message));
      });
  };
};
