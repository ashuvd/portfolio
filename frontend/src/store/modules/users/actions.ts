import { ActionTree } from 'vuex';
import { IUsersState } from './types';
import { IUser } from '@/types';
import { storage } from '@/utils/storage';
import errorHandler from "@/utils/errorHandler";
import { apolloClient } from "@/graphql";
import {infoQuery, loginQuery, refreshQuery} from "@/graphql/queries";

export const actions: ActionTree<IUsersState, {}> = {
  async signin({ commit }, user: IUser) {
    try {
      const response = await apolloClient.query({ query: loginQuery, variables: { ...user } });
      storage('accessToken', response.data.login.accessToken);
      storage('refreshToken', response.data.login.refreshToken);
      commit('saveUser', response.data.login.user);
      return true;
    } catch (error) {
      await errorHandler(error.message, "", null, true)
    }
  },
  async refresh() {
    try {
      const accessToken = storage('accessToken');
      const refreshToken = storage('refreshToken');
      const response = await apolloClient.query({ query: refreshQuery, variables: { accessToken, refreshToken } });
      storage('accessToken', response.data.refresh.accessToken);
      storage('refreshToken', response.data.refresh.refreshToken);
      return true;
    } catch (error) {
      await errorHandler(error.message, "", null, true)
    }
  },
  async logout({ commit }) {
    try {
      storage('accessToken', null);
      commit('saveUser', {});
    } catch (error) {
      await errorHandler(error.message, "", null, true);
    }
  },
  async getUser({commit}) {
    try {
      const accessToken = storage('accessToken');
      const response = await apolloClient.query({ query: infoQuery, variables: { }, context: { headers: { Authorization: 'Bearer '+accessToken } } });
      commit('saveUser', response.data.info.user);
      return response.data.info.user;
    } catch (error) {
      return errorHandler(error.message, 'users/getUser', null, true);
    }
  },
};
