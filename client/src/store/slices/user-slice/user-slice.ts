import { createSlice } from '@reduxjs/toolkit';
import { createCheckAuthReducer } from './assync-reducers/check-auth';
import { tokenService } from '../../../services/token-service';
import { createSignupReducer } from './assync-reducers/signup';
import { createLoginReducer } from './assync-reducers/login';
import { createLogoutReducer } from './assync-reducers/logout';
import { UserState } from '../../../models/user';
import { AuthStatus, DEFAULT_USER, LoadingStatus } from '../../../const';


const userState: UserState = {
  user: DEFAULT_USER,
  authStatus: AuthStatus.Unknown,
  loadingStatus: LoadingStatus.Idle,
  error: '',
};

export const userSlice = createSlice({
  name: 'userSlice',
  initialState: userState,
  reducers: {
    userLogout: (state) => {
      state.user = DEFAULT_USER;
      state.authStatus = AuthStatus.NotAuth;
      tokenService.removeAccessToken();
    }
  },
  extraReducers: (builder) => {
    createCheckAuthReducer(builder);
    createSignupReducer(builder);
    createLoginReducer(builder);
    createLogoutReducer(builder);
  },
});

export const { userLogout } = userSlice.actions;
