import { ActionTree } from 'vuex';
import { IWorksState } from './types';
import errorHandler from '@/utils/errorHandler';
import { IWork, IWorkDto } from '@/types';
import { apolloClient } from "@/graphql";
import { createWorkMutation, deleteWorkMutation, changeWorkMutation, worksQuery, workQuery } from "@/graphql/queries";
import { storage } from "@/utils/storage";

export const actions: ActionTree<IWorksState, {}> = {
  async getWorks({ commit }): Promise<void> {
    try {
      const response = await apolloClient.query({ query: worksQuery });
      const { works } = response.data;
      commit('setWorks', works);
    } catch (error) {
      await errorHandler(error.message, "", null, true);
    }
  },
  async getWork({ commit }, id: number): Promise<void> {
    try {
      const accessToken = storage('accessToken');
      const response = await apolloClient.query({ query: workQuery, variables: { id }, context: { headers: { Authorization: 'Bearer '+accessToken } } });
      const { work } = response.data;
      commit('setWork', work);
    } catch (error) {
      return errorHandler(error.message, "works/getWork", id, true);
    }
  },
  async addWork(_, newWork: IWorkDto): Promise<IWork | undefined> {
    try {
      const accessToken = storage('accessToken');
      const response = await apolloClient.mutate({ mutation: createWorkMutation, variables: { ...newWork }, context: {
          hasUpload: true,
          headers: { Authorization: 'Bearer '+accessToken }
        } });
      const { createWork } = response.data;
      return createWork;
    } catch (error) {
      return errorHandler(error.message, "works/addWork", newWork, true);
    }
  },
  async updateWork(_, { updateWork, id }: { updateWork: IWorkDto, id: number }): Promise<IWork | undefined> {
    try {
      const accessToken = storage('accessToken');
      const response = await apolloClient.mutate({ mutation: changeWorkMutation, variables: { ...updateWork, id }, context: {
          hasUpload: true,
          headers: { Authorization: 'Bearer '+accessToken }
        } });
      const { changeWorkById } = response.data;
      return changeWorkById.id;
    } catch (error) {
      return errorHandler(error.message, "works/updateWork", { updateWork, id }, true);
    }
  },
  async deleteWork({ commit }, id: number): Promise<number | undefined> {
    try {
      const accessToken = storage('accessToken');
      const response = await apolloClient.mutate({ mutation: deleteWorkMutation, variables: { id }, context: { headers: { Authorization: 'Bearer '+accessToken } } });
      const { deleteWorkById } = response.data;
      commit('deleteOldWork', deleteWorkById.id);
      return deleteWorkById.id;
    } catch (error) {
      return errorHandler(error.message, "works/deleteWork", id, true);
    }
  },
};
