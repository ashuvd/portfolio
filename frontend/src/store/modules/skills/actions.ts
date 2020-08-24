import { ActionTree } from 'vuex';
import { ISkillsState } from './types';
import errorHandler from '@/utils/errorHandler';
import {ISkill, ISkillDto} from '@/types';
import { apolloClient } from "@/graphql";
import {createSkillMutation, changeSkillMutation, deleteSkillMutation, skillsQuery, skillQuery} from "@/graphql/queries";
import {storage} from "@/utils/storage";

export const actions: ActionTree<ISkillsState, {}> = {
  async getSkills({ commit }): Promise<void> {
    try {
      const response = await apolloClient.query({ query: skillsQuery });
      const { skills } = response.data;
      commit('setSkills', skills);
    } catch (error) {
      await errorHandler(error.message, "", null, true);
    }
  },
  async getSkill({ commit }, id: number): Promise<void> {
    try {
      const accessToken = storage('accessToken');
      const response = await apolloClient.query({ query: skillQuery, variables: { id }, context: { headers: { Authorization: 'Bearer '+accessToken } } });
      const { skill } = response.data;
      commit('setSkill', skill);
    } catch (error) {
      return errorHandler(error.message, "skills/getSkill", id, true);
    }
  },
  async addSkill(_, newSkill: ISkillDto): Promise<ISkill | undefined> {
    try {
      const accessToken = storage('accessToken');
      const response = await apolloClient.mutate({ mutation: createSkillMutation, variables: { ...newSkill, percents: +newSkill.percents }, context: { headers: { Authorization: 'Bearer '+accessToken } } });
      const { createSkill } = response.data;
      return createSkill;
    } catch (error) {
      return errorHandler(error.message, "skills/addSkill", newSkill, true);
    }
  },
  async updateSkill(_, { updateSkill, id }: { updateSkill: ISkillDto, id: number }): Promise<ISkill | undefined> {
    try {
      const accessToken = storage('accessToken');
      const response = await apolloClient.mutate({ mutation: changeSkillMutation, variables: { ...updateSkill, percents: +updateSkill.percents, id }, context: { headers: { Authorization: 'Bearer '+accessToken } } });
      const { changeSkillById } = response.data;
      return changeSkillById;
    } catch (error) {
      return errorHandler(error.message, "skills/updateSkill", { updateSkill, id }, true);
    }
  },
  async deleteSkill({ commit }, id: number): Promise<number | undefined> {
    try {
      const accessToken = storage('accessToken');
      const response = await apolloClient.mutate({ mutation: deleteSkillMutation, variables: { id }, context: { headers: { Authorization: 'Bearer '+accessToken } } });
      const { deleteSkillById } = response.data;
      commit('deleteOldSkill', deleteSkillById.id);
      return deleteSkillById.id;
    } catch (error) {
      return errorHandler(error.message, "skills/deleteSkill", id, true);
    }
  },
};
