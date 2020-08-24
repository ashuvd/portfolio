import { MutationTree } from 'vuex';
import { ISkillsState } from './types';
import {ISkill} from '@/types';

export const mutations: MutationTree<ISkillsState> = {
  setSkills(state, skills: ISkill[]) {
    state.skills = [...skills];
  },
  setSkill(state, skill: ISkill) {
    state.skill = skill;
  },
  addNewSkill(state, article: ISkill) {
    state.skills.push(article);
  },
  deleteOldSkill(state, id: number) {
    state.skills = state.skills.filter(a => a.id !== id);
  },
  setSkillsLoading(state, active: boolean) {
    state.loading = active;
  },
};
