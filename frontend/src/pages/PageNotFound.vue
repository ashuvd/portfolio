<template>
  <div class="container">
    <h4>Страница не найдена</h4>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class PageNotFound extends Vue {
  clickButton() {
    console.log('click');
  }
}
</script>
<style lang="scss"></style>
