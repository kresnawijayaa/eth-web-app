import axios from "axios";

export const FETCH_CARDS_REQUEST = "FETCH_CARDS_REQUEST";
export const FETCH_CARDS_SUCCESS = "FETCH_CARDS_SUCCESS";
export const FETCH_CARDS_FAILURE = "FETCH_CARDS_FAILURE";

const fetchCardsRequest = () => ({
  type: FETCH_CARDS_REQUEST,
});

const fetchCardsSuccess = (cards) => ({
  type: FETCH_CARDS_SUCCESS,
  payload: cards,
});

const fetchCardsFailure = (error) => ({
  type: FETCH_CARDS_FAILURE,
  payload: error,
});

export const fetchCards = () => {
  return (dispatch) => {
    dispatch(fetchCardsRequest());

    setTimeout(() => {
      axios
        .get("http://localhost:3000/cards")
        .then((response) => {
          dispatch(fetchCardsSuccess(response.data));
        })
        .catch((error) => {
          dispatch(fetchCardsFailure(error.message));
        });
    }, 3000);
  };
};
