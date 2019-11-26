import { combineReducers } from 'redux';
// import { connectRouter } from 'connected-react-router'

// import itemsReducer from './items/reducer';
// import authenticationReducer from './authentication/reducer';
// import appReducer from './app/reducer';
import itemsReducer from './items/reducer';

export default function createReducer(history) {
  return combineReducers({
    // router: connectRouter(history),
    items: itemsReducer,
  });
}
