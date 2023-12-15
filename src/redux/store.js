// store.js
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from './userSlice';
import walletReducer from './walletSlice';
import orderReducer from './orderSlice';
import notificationReducer from './NotificationSlice';
import graphReducer from './GraphSlice';

const persistConfig = {
  key: 'root',
  storage,
};

const nonSerializableCheckOption = {
  serializableCheck: {
    ignoredActions: ['persist/PERSIST'], // Ignore this action from the check
    ignoredPaths: ['user'], // Ignore the 'user' slice from the check
  },
};

const persistedUserReducer = persistReducer(
  { ...persistConfig, ...nonSerializableCheckOption },
  userReducer
);
const persistedWalletReducer = persistReducer(
  { ...persistConfig, ...nonSerializableCheckOption },
  walletReducer
);
const persistedOrderReducer = persistReducer(
  { ...persistConfig, ...nonSerializableCheckOption },
  orderReducer
);
const persistedNotificationReducer = persistReducer(
  { ...persistConfig, ...nonSerializableCheckOption },
  notificationReducer
);
const persistedGraphReducer = persistReducer(
  { ...persistConfig, ...nonSerializableCheckOption },
  graphReducer
);

const store = configureStore({
  reducer: {
    user: persistedUserReducer,
    wallet: persistedWalletReducer,
    order: persistedOrderReducer,
    notification: persistedNotificationReducer,
    graph: persistedGraphReducer,
  },
  middleware: getDefaultMiddleware({
    ...nonSerializableCheckOption,
  }),
});

const persistor = persistStore(store);

export { store, persistor };
