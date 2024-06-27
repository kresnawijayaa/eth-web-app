import axios from 'axios';

export const FETCH_DETAILS_REQUEST = 'FETCH_DETAILS_REQUEST';
export const FETCH_DETAILS_SUCCESS = 'FETCH_DETAILS_SUCCESS';
export const FETCH_DETAILS_FAILURE = 'FETCH_DETAILS_FAILURE';

const fetchDetailsRequest = () => ({
  type: FETCH_DETAILS_REQUEST,
});

const fetchDetailsSuccess = (details) => ({
  type: FETCH_DETAILS_SUCCESS,
  payload: details,
});

const fetchDetailsFailure = (error) => ({
  type: FETCH_DETAILS_FAILURE,
  payload: error,
});

export const fetchDetails = (id) => {
  return (dispatch) => {
    dispatch(fetchDetailsRequest());

    setTimeout(() => {
    axios
      .get(`http://localhost:3000/details/${id}`)
      .then((response) => {
        dispatch(fetchDetailsSuccess(response.data));
      })
      .catch((error) => {
        dispatch(fetchDetailsFailure(error.message));
      });
    }, 3000);
  };
};
