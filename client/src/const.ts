import { User } from './models/user';

export const BASE_URL = import.meta.env.PROD
  ? 'https://express-template-auth-app.onrender.com'
  : 'http://localhost:5000';

export enum ApiRoute {
  Signup = '/auth/signup',
  Login = '/auth/login',
  Logout = '/auth/logout',
  Refresh = '/auth/refresh',
}

export enum AppRoute {
  Main = '/',
  Offer = '/offer',
  Favorite = '/favorite',
}

export enum AuthRoute {
  Signup = '/signup',
  Login = '/login',
}

export enum AuthStatus {
  Auth = 'auth',
  NotAuth = 'notAuth',
  Unknown = 'unknown',
};

export enum LoadingStatus {
  Idle = 'idle',
  Pending = 'pending',
  Rejected = 'rejected',
  fulfilled = 'fulfilled',
}

export const DEFAULT_USER: User = {
  id: '',
  name: '',
  email: '',
  accessToken: '',
};

export const ACCESS_TOKEN = 'accessToken';
