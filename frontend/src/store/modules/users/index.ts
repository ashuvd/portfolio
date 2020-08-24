import { IUsersState } from './types';
import { Module } from 'vuex';
import { getters } from './getters';
import { actions } from './actions';
import { mutations } from './mutations';

const state: IUsersState = {
  loading: false,
  user: {
    id: 0,
    login: '',
    accessToken: '',
    role: 0,
  },
  users: []
};

const namespaced: boolean = true;

const users: Module<IUsersState, {}> = {
  namespaced,
  state,
  getters,
  mutations,
  actions
};
export { users, IUsersState };
