import request from '../axios';
import { ILoginPayload, IRegisterPayload } from './type';

export const login = async (payload: ILoginPayload) => {
  const { data } = await request({
    url: '/users/sign-in',
    method: 'POST',
    data: payload,
  });
  return data;
};

export const register = async (payload: IRegisterPayload) => {
  const { data } = await request({
    url: '/users/sign-up',
    method: 'POST',
    data: payload,
  });
  return data;
};

export const secret = async () => {
  const { data } = await request({
    url: '/users/my-profile',
    method: 'GET',
  });
  return data;
};
