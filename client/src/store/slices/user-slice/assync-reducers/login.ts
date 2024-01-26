import { AxiosError } from 'axios';
import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { tokenService } from '../../../../services/token-service';
import { createAppAsyncThunk } from './../../../utils';
import { Credentials, User, UserState } from '../../../../models/user';
import { ApiRoute, AuthStatus, LoadingStatus } from '../../../../const';


export const login = createAppAsyncThunk<User, Credentials>(
  'userSlice/login',
  async (credential: Credentials, { extra, rejectWithValue }) => {
    try {
      const response = await extra.post<User>(ApiRoute.Login, credential);
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

export const createLoginReducer = (builder: ActionReducerMapBuilder<UserState>) => {
  builder.addCase(login.pending, (state) => {
    state.loadingStatus = LoadingStatus.Pending;
    state.error = '';
  });

  builder.addCase(login.fulfilled, (state, action) => {
    state.user = action.payload;
    tokenService.setAccessToken(action.payload.accessToken);
    state.loadingStatus = LoadingStatus.Idle;
    state.authStatus = AuthStatus.Auth;
  });

  builder.addCase(login.rejected, (state, action) => {
    state.loadingStatus = LoadingStatus.Rejected;
    if (action.payload) {
      state.error = action.payload;
    }
  });
};
