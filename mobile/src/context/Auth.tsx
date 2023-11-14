import { useUser } from '@/apis/auth';
import { useAuthStore } from '@/store';
import { FCC } from '@/types';
import React from 'react';

const AuthProvider: FCC<{}> = ({ children }) => {
  const { updateFullName, updateIsLogin } = useAuthStore(state => state);
  useUser({
    onSuccess: data => {
      updateFullName(data?.data?.fullname ?? '');
      updateIsLogin(!!data);
    },
    onError: async () => {
      updateFullName('');
      updateIsLogin(false);
    },
  });
  return <>{children}</>;
};

export default AuthProvider;
