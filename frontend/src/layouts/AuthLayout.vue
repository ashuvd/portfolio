<template>
  <div class="wrapper">
    <router-view />
  </div>
</template>

<script lang="ts">
  import { Vue, Component } from "vue-property-decorator";
  @Component
  export default class AuthLayout extends Vue {

  }
</script>

<style lang="scss" scoped>
  .wrapper{
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
