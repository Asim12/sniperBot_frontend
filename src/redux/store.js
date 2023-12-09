// store.js
import { configureStore } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from './userSlice';
import walletReducer from './walletSlice'

const persistConfig = {
  key: 'root',
  storage,
};

const persistedUserReducer = persistReducer(persistConfig, userReducer);
const persistedWalletReducer = persistReducer(persistConfig, walletReducer);


const store = configureStore({
  reducer: {
    user: persistedUserReducer,
    wallet:persistedWalletReducer
  },
});

const persistor = persistStore(store);


export { store,persistor};
