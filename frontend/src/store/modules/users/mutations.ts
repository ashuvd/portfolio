import { MutationTree } from 'vuex';
import { IUsersState } from './types';
import { IUser } from '@/types';

export const mutations: MutationTree<IUsersState> = {
  saveUser(state, user: IUser) {
    state.user = user;
  },
  setUsers(state, users: IUser[]) {
    state.users = [...users];
  },
  setUsersLoading(state, active: boolean) {
    state.loading = active;
  },
};
