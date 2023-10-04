import { configureStore } from '@reduxjs/toolkit';
import userApi from './features/user/userApi';
import userReducer from './features/user/userSlice';
import cartReducer from './features/cart/cartSlice';

const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    user: userReducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware),
});

export default store;
