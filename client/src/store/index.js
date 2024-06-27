import { legacy_createStore as createStore, applyMiddleware, combineReducers } from 'redux';
import { thunk } from 'redux-thunk';
import { cardsReducer } from '../reducers/cardsReducer';
import { detailsReducer } from '../reducers/detailsReducer';
import { authReducer } from '../reducers/authReducer';
import { profileReducer } from '../reducers/profileReducer';

const rootReducer = combineReducers({
  cards: cardsReducer,
  details: detailsReducer,
  auth: authReducer,
  profile: profileReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
