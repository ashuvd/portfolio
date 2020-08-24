import Vue from "vue";
import Vuelidate from 'vuelidate';
import App from './App.vue';
import router from './router';
import Modal from "@/components/modals/Modal.vue";
import Simple from "@/components/modals/Simple.vue";
import Paginate from "@/components/Paginate.vue";
import MessagePlugin from '@/plugins/message.plugin';
import { apolloProvider } from '@/graphql';
import { store } from '@/store';

import dateFilter from "./filters/date.filter";
import Loader from "@/components/Loader.vue";

Vue.filter("fDate", dateFilter);

Vue.component("Loader", Loader);
Vue.component("Modal", Modal);
Vue.component("Simple", Simple);
Vue.component("Paginate", Paginate);
Vue.use(Vuelidate);
Vue.use(MessagePlugin);
new Vue({
  el: "#app",
  router,
  store,
  // apolloProvider,
  render: h => h(App)
});
