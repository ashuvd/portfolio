import { MutationTree } from 'vuex';
import { IWorksState } from './types';
import { IWork, IServerWork } from '@/types';

export const mutations: MutationTree<IWorksState> = {
  setWorks(state, works: IServerWork[]) {
    state.works = works.map(work => {
      return {
        id: work.id,
        image: work.image,
        title: work.title,
        description: work.description,
        link: work.link,
        githubLink: work.github_link
      }
    });
  },
  setWork(state, work: IServerWork) {
    state.work = {
      id: work.id,
      image: work.image,
      title: work.title,
      description: work.description,
      link: work.link,
      githubLink: work.github_link
    };
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
