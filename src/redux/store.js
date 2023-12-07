// store.js
import { configureStore } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from './userSlice';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, userReducer);


const store = configureStore({
  reducer: {
    user: persistedReducer,
  },
});

const persistor = persistStore(store);


export { store,persistor};
