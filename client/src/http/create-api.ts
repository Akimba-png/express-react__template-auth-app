import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { tokenService } from '../services/token-service';
import { User } from '../models/user';
import { ApiRoute } from '../const';
import { toastService } from '../services/toast-service';

export const createApi = (onUnAuth: () => void) => {
  const api = axios.create({
    baseURL: ApiRoute.BaseUrl,
    timeout: 3000,
    withCredentials: true,
  });

  const onSend = (config: InternalAxiosRequestConfig) => {
    const accessToken = tokenService.getAccessToken();
    config.headers['authorization'] = `Bearer ${accessToken}`;
    return config;
  };
  api.interceptors.request.use(onSend);

  const onSuccess = (value: AxiosResponse) => {
    return value;
  };

  const onFail = async (error: AxiosError<{message: string}>) => {
    const initialRequest = error.config;
    if (
      initialRequest &&
      error.response &&
      error.response.status === 401
    ) {
      try {
        const accessToken = (
          await axios.get<User>(
            `${ApiRoute.BaseUrl}${ApiRoute.Refresh}`,
            {withCredentials: true}
          )
        ).data.accessToken;
        tokenService.setAccessToken(accessToken);
        return api.request(initialRequest);
      } catch (error) {
        onUnAuth();
        return;
      }
    }
    if (error.response) {
      toastService.showErrorToast(error.response.data.message);
      throw error;
    }
    toastService.showErrorToast('Something goes wrong');
    throw error;
  };
  api.interceptors.response.use(onSuccess, onFail);

  return api;
};
