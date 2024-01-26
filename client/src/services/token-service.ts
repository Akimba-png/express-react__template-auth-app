import { ACCESS_TOKEN } from './../const';

class TokenService {
  getAccessToken() {
    return localStorage.getItem(ACCESS_TOKEN) ?? '';
  }

  setAccessToken(token: string) {
    localStorage.setItem(ACCESS_TOKEN, token);
  }

  removeAccessToken() {
    localStorage.setItem(ACCESS_TOKEN, '');
  }
}

export const tokenService = new TokenService();
