// store.js
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import {  persistReducer } from 'redux-persist';
import { combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';

import userReducer from './userSlice';
import walletReducer from './walletSlice';
import orderReducer from './orderSlice';
import notificationReducer from './NotificationSlice';
import graphReducer from './GraphSlice';
import settingsReducer from './settingsSlice'

const persistConfig = {
  key: 'root',
  storage,
};

const reducer=combineReducers({
  user:userReducer,
  wallet:walletReducer,
  order:orderReducer,
  notification:notificationReducer,
  graph:graphReducer,
  settings:settingsReducer
})

const persistedReducer=persistReducer(persistConfig,reducer)

export const store = configureStore({
  reducer:persistedReducer
});


