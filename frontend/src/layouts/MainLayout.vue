<template>
  <div class="wrapper">
    <Sidebar class="sidebar" />
    <Header class="header" />
    <main class="main">
      <router-view />
    </main>
  </div>
</template>

<script lang="ts">
  import { Vue, Component } from "vue-property-decorator";
  import Header from '@/components/Header.vue';
  import Sidebar from '@/components/Sidebar.vue';
  @Component({
    components: {Header, Sidebar}
  })
  export default class MainLayout extends Vue {

  }
</script>

<style lang="scss" scoped>
  .wrapper{
    display: grid;
    grid-template-columns: 200px 1fr;
    grid-template-rows: auto 1fr;
    grid-template-areas:
      "sidebar header"
      "sidebar main"
  }
  .sidebar{
    grid-area: sidebar;
    z-index: 1;
    background-color: $white;
    box-shadow: 6px 0 18px rgba(0, 0, 0, 0.06);
    padding: 20px;
  }
  .header{
    grid-area: header;
    background-color: $white;
    padding: 20px 0;
  }
  .main{
    grid-area: main;
    background-color: $gray-bg;
    padding-top: 30px;
  }
</style>
