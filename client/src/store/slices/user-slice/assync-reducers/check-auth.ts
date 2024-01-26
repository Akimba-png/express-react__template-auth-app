import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { User, UserState } from '../../../../models/user';
import { createAppAsyncThunk } from '../../../utils';
import { ApiRoute, AuthStatus, LoadingStatus } from '../../../../const';


export const checkAuth = createAppAsyncThunk(
  'userSlice/checkAuth',
  async (_, { extra, rejectWithValue }) => {
    try {
      const response = (await extra.get<User>(ApiRoute.Login)).data;
      return response;
    } catch (error) {
      const e = error as AxiosError<{message: string}>;
      if (e.response) {
        return rejectWithValue(e.response.data.message)
      }
      return rejectWithValue(e.message);
    }
  }
);

export const createCheckAuthReducer = (
  builder: ActionReducerMapBuilder<UserState>
) => {
  builder.addCase(checkAuth.pending, (state) => {
    state.loadingStatus = LoadingStatus.Pending;
    state.error = '';
  });

  builder.addCase(checkAuth.fulfilled, (state, action) => {
    state.user = action.payload;
    localStorage.setItem('accessToken', action.payload.accessToken);
    state.loadingStatus = LoadingStatus.fulfilled;
    state.authStatus = AuthStatus.Auth;
  });

  builder.addCase(checkAuth.rejected, (state, action) => {
    state.loadingStatus = LoadingStatus.Rejected;
    if (action.payload) {
      state.error = action.payload;
    }
  });
};
