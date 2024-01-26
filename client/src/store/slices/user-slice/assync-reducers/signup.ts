import { AxiosError } from 'axios';
import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { tokenService } from '../../../../services/token-service';
import { RegData, User, UserState } from '../../../../models/user';
import { createAppAsyncThunk } from './../../../utils';
import { ApiRoute, AuthStatus, LoadingStatus } from '../../../../const';


export const signup = createAppAsyncThunk<User, RegData>(
  'userSlice/signup',
  async (regData, {extra, rejectWithValue}) => {
    try {
      const response = await extra.post<User>(ApiRoute.Signup, regData);
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

export const createSignupReducer = (builder: ActionReducerMapBuilder<UserState>) => {
  builder.addCase(signup.pending, (state) => {
    state.loadingStatus = LoadingStatus.Pending;
    state.error = '';
  });

  builder.addCase(signup.fulfilled, (state, action) => {
    state.user = action.payload;
    tokenService.setAccessToken(action.payload.accessToken);
    state.loadingStatus = LoadingStatus.fulfilled;
    state.authStatus = AuthStatus.Auth;
  });

  builder.addCase(signup.rejected, (state, action) => {
    state.loadingStatus = LoadingStatus.Rejected;
    if (action.payload) {
      state.error = action.payload;
    }
  });
};
