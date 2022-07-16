import { configureStore } from '@reduxjs/toolkit';      // Redux store
import { cryptoApi } from '../services/cryptoApi';      // crypto api 
import { cryptoNewsApi } from '../services/cryptoNewsApi';    // News api

export default configureStore({
    reducer: {
      [cryptoApi.reducerPath]: cryptoApi.reducer,
      [cryptoNewsApi.reducerPath]: cryptoNewsApi.reducer,
    },
});