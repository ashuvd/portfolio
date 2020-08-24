import Vue from 'vue';
import VueRouter from 'vue-router';
import { store } from './store';

Vue.use(VueRouter);

import PageNotFound from '@/pages/PageNotFound.vue';
import Info from '@/pages/Info.vue';
import Skills from '@/pages/Skills.vue';
import Works from '@/pages/Works.vue';
import Login from '@/pages/Login.vue';
import AddSkill from "@/pages/AddSkill.vue";
import AddWork from "@/pages/AddWork.vue";
import EditSkill from "@/pages/EditSkill.vue";
import EditWork from "@/pages/EditWork.vue";
import {storage} from "@/utils/storage";

const routes = [
  {
    path: '/',
    name: 'info',
    meta: {
      layout: 'main',
      title: 'Обо мне'
    },
    component: Info,
  },
  {
    path: '/skills',
    name: 'skills',
    meta: {
      layout: 'main',
      title: 'Мои скилы'
    },
    component: Skills,
  },
  {
    path: '/skills/:skill_id',
    name: 'skill',
    meta: {
      layout: 'main',
      auth: true,
      title: 'Редактирование скила'
    },
    component: EditSkill,
  },
  {
    path: '/works',
    name: 'works',
    meta: {
      layout: 'main',
      title: 'Мои работы'
    },
    component: Works,
  },
  {
    path: '/works/:work_id',
    name: 'work',
    meta: {
      layout: 'main',
      auth: true,
      title: 'Редактирование работы'
    },
    component: EditWork,
  },
  {
    path: '/add-skill',
    name: 'add-skill',
    meta: {
      layout: 'main',
      auth: true,
      title: 'Добавление нового скила'
    },
    component: AddSkill,
  },
  {
    path: '/add-work',
    name: 'add-work',
    meta: {
      layout: 'main',
      auth: true,
      title: 'Добавление новой работы'
    },
    component: AddWork,
  },
  {
    path: '/login',
    meta: {
      layout: 'auth',
    },
    component: Login,
  },
  {
    path: '*',
    component: PageNotFound,
  },
];

const router = new VueRouter({ routes, mode: 'history' });

router.beforeEach(async (to, from, next) => {
  try {
    const requireAuth = to.matched.some((record) => record.meta.auth);
    let currentUser = store.getters['users/user'];
    const accessToken = storage('accessToken');
    if ((requireAuth && !currentUser.id) || (!requireAuth && accessToken)) {
      currentUser = await store.dispatch('users/getUser');
    }
    let userId = currentUser ? currentUser.id : null;
    if (requireAuth && !userId) {
      next('/login');
    } else {
      next();
    }
  } catch (error) {
    next('/login');
    console.error(error);
  }
});

export default router;
