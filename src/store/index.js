import { createStore, combineReducers, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import thunk from "redux-thunk";
import logger from 'redux-logger'
import AsyncStorage from '@react-native-community/async-storage';

import auth from "./reducers/auth";

const authPersistConfig = {
  key: "auth",
  storage: AsyncStorage
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, auth)
});

const configureStore = () => {
  return createStore(rootReducer, applyMiddleware(logger,thunk));
};

export default configureStore;
