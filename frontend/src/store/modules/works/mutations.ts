import { MutationTree } from 'vuex';
import { IWorksState } from './types';
import { IWork } from '@/types';

export const mutations: MutationTree<IWorksState> = {
  setWorks(state, works: IWork[]) {
    state.works = [...works];
  },
  setWork(state, work: IWork) {
    state.work = work;
  },
  addNewWork(state, work: IWork) {
    state.works.push(work);
  },
  deleteOldWork(state, id: number) {
    state.works = state.works.filter(a => a.id !== id);
  },
  setWorksLoading(state, active: boolean) {
    state.loading = active;
  },
};
