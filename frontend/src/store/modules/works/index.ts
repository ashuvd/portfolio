import { IWorksState } from './types';
import { Module } from 'vuex';
import { getters } from './getters';
import { actions } from './actions';
import { mutations } from './mutations';

const state: IWorksState = {
  loading: false,
  work: {
    id: 0,
    title: '',
    description: '',
    link: '',
    githubLink: '',
    image: ''
  },
  works: []
};

const namespaced: boolean = true;

const works: Module<IWorksState, {}> = {
  namespaced,
  state,
  getters,
  mutations,
  actions
};
export { works, IWorksState };
