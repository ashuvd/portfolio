import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import { users, IUsersState } from './modules/users';
import { skills, ISkillsState } from "@/store/modules/skills";
import { works, IWorksState } from "@/store/modules/works";

interface IState {
  users: IUsersState;
  skills: ISkillsState;
  works: IWorksState;
}

export const store = new Vuex.Store<IState>({
  modules: {
    users,
    skills,
    works
  },
});
