import { IUser } from '@/apis/auth';
import { create } from 'zustand';

type State = {
  user?: IUser;
  isLogin: boolean;
};

type Action = {
  updateUser: (user: State['user']) => void;
  updateIsLogin: (isLogin: State['isLogin']) => void;
};

const useAuthStore = create<State & Action>(set => ({
  user: undefined,
  isLogin: false,
  updateUser: user => set(() => ({ user: user })),
  updateIsLogin: isLogin => set(() => ({ isLogin: isLogin })),
}));
export default useAuthStore;
