<template>
  <component :class="{ blockScroll: isBlocked }" :is="layout" />
</template>
<script lang="ts">
  // import "./lib/materialize/js/materialize.min.js";
  import { Vue, Component } from "vue-property-decorator";
  import MainLayout from "@/layouts/MainLayout.vue";
  import AuthLayout from "@/layouts/AuthLayout.vue";
  @Component({
    components: {
      MainLayout, AuthLayout
    }
  })
  export default class App extends Vue {
    private isBlocked: Boolean = false;
    created() {
      const context = require.context("./assets/images/icons", true, /\.svg$/);
      context.keys().forEach(context);
    }
    get layout() {
      return (this.$route.meta.layout || 'auth') + '-layout';
    }
  }
</script>
<style lang="scss">
  @import "normalize.css";
  //@import "./lib/materialize/css/materialize.min.css";
  @import "./assets/styles/main.scss";
</style>
