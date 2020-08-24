import { ISkillsState } from './types';
import { Module } from 'vuex';
import { getters } from './getters';
import { actions } from './actions';
import { mutations } from './mutations';

const state: ISkillsState = {
  loading: false,
  skill: {
    id: 0,
    title: '',
    percents: 0,
    category: ''
  },
  skills: []
};

const namespaced: boolean = true;

const skills: Module<ISkillsState, {}> = {
  namespaced,
  state,
  getters,
  mutations,
  actions
};
export { skills, ISkillsState };
