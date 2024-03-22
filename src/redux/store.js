import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userChoiceReducer from './reducers/user-action-reducer';

const rootReducer = combineReducers({
  userChoiceReducer,
});

export default configureStore({
  reducer: rootReducer,
});
