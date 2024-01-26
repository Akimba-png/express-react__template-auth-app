import { configureStore } from '@reduxjs/toolkit';
import { createApi } from './../http/create-api';
import { userLogout, userSlice } from './slices/user-slice/user-slice';

const api = createApi(() => {
  store.dispatch(userLogout());
});

export const store = configureStore({
  reducer: {
    [userSlice.name]: userSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    thunk: {
      extraArgument: api,
    },
  })
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
