import { configureStore } from '@reduxjs/toolkit';      // Redux store

import { cryptoApi } from '../services/cryptoApi';      // crypto api 

export default configureStore({
    reducer: {
      [cryptoApi.reducerPath]: cryptoApi.reducer,
    },
});