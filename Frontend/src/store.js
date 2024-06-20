import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/AuthSlice'
import { apiSlice } from './slices/ApiSlice';
import AdminAuthSlice from './slices/adminSlice.js/AdminAuthSlice';


const store = configureStore({
  reducer: {
    auth:authReducer,
    adminAuth:AdminAuthSlice,
    [apiSlice.reducerPath]:apiSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>  getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;