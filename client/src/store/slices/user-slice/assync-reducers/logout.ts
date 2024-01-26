import { AxiosError } from 'axios';
import { ApiRoute, AuthStatus, DEFAULT_USER, LoadingStatus } from '../../../../const';
import { createAppAsyncThunk } from './../../../utils';
import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { UserState } from '../../../../models/user';
import { tokenService } from '../../../../services/token-service';


export const logout = createAppAsyncThunk(
  'userSlice/logout',
  async (_, { extra, rejectWithValue }) => {
    try {
      const response = await extra.delete(ApiRoute.Logout);
      return response.data;
    } catch (error) {
      const e = error as AxiosError<{message: string}>;
      if (e.response) {
        return rejectWithValue(e.response.data.message)
      }
      return rejectWithValue(e.message);
    }
  }
);

export const createLogoutReducer = (builder: ActionReducerMapBuilder<UserState>) => {
  builder.addCase(logout.pending, (state) => {
    state.loadingStatus = LoadingStatus.Pending;
    state.error = '';
  });

  builder.addCase(logout.fulfilled, (state) => {
    state.user = DEFAULT_USER;
    tokenService.removeAccessToken();
    state.loadingStatus = LoadingStatus.fulfilled;
    state.authStatus = AuthStatus.NotAuth;
  });

  builder.addCase(logout.rejected, (state, action) => {
    state.loadingStatus = LoadingStatus.Rejected;
    if (action.payload) {
      state.error = action.payload;
    }
  });
};
