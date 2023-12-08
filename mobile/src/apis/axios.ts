import { API_URL } from '@@/env';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

let request = axios.create({
  baseURL: API_URL,
});
request.interceptors.request.use(
  async config => {
    if (!config.headers.Authorization) {
      await SecureStore.getItemAsync('access_token')
        .then(token => {
          config.headers.Authorization = token;
        })
        .catch(() => {
          config.headers.Authorization = '';
        });
    }

    return config;
  },
  error => Promise.reject(error),
);

const handleError = async (error: any) => {
  const data = error?.response?.data;

  return Promise.reject(data);
};

request.interceptors.response.use(response => response, handleError);

export default request;
