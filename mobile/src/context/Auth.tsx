import { useUser } from '@/apis/auth';
import { useAuthStore } from '@/store';
import { FCC } from '@/types';
import React from 'react';

const AuthProvider: FCC<{}> = ({ children }) => {
  const { updateUser, updateIsLogin } = useAuthStore(state => state);
  useUser({
    onSuccess: data => {
      updateUser(data?.data);
      updateIsLogin(!!data);
    },
    onError: async () => {
      updateUser(undefined);
      updateIsLogin(false);
    },
  });
  return <>{children}</>;
};

export default AuthProvider;
