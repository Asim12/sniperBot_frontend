// store.js
import { configureStore } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from './userSlice';
import walletReducer from './walletSlice'
import orderReducer from './orderSlice'
import notificationReducer from './NotificationSlice'
import graphReducer from './GraphSlice'

const persistConfig = {
  key: 'root',
  storage,
};

const persistedUserReducer = persistReducer(persistConfig, userReducer);
const persistedWalletReducer = persistReducer(persistConfig, walletReducer);
const persistedOrderReducer = persistReducer(persistConfig, orderReducer);
const persistedNotificationReducer = persistReducer(persistConfig, notificationReducer);
const persistedGraphReducer = persistReducer(persistConfig, graphReducer);


const store = configureStore({
  reducer: {
    user: persistedUserReducer,
    wallet:persistedWalletReducer,
    order:persistedOrderReducer,
    notification:persistedNotificationReducer,
    graph:persistedGraphReducer
  },
});

const persistor = persistStore(store);


export { store,persistor};
