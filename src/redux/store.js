import { configureStore } from "@reduxjs/toolkit"
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from 'redux-persist';
import { combineReducers } from "redux";
import userReducer from './features/userSlice'
import departmentReducer from './features/departmenttSlice'
import tabviewReducer from "./features/tabviewSlice";
import languageReducer from "./features/languageSlice"
const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  user: userReducer,
  department: departmentReducer,
  tabview: tabviewReducer,
  language: languageReducer,
});



const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
});




export const persistor = persistStore(store);