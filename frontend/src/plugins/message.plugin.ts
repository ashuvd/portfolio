import { VueConstructor } from 'vue';
import errorHandler from "@/utils/errorHandler";
export default {
  install(Vue: VueConstructor ) {
    Vue.prototype.$message = function(html: string) {
      errorHandler(html)
    };
  }
};
