import { GetterTree } from 'vuex';
import { IUsersState } from './types';
import { IUser } from '@/types';

export const getters: GetterTree<IUsersState, {}> = {
  login(state): string {
    return state.user.login;
  },
  user(state): IUser {
    return state.user;
  },
  userId(state): number {
    return state.user.id;
  },
};
