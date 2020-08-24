<template>
  <div class="overlay" @mousedown="simpleCloseHandler">
    <div class="simple" ref="simple">
      <div class="simple__header">
        <div class="simple__title">{{title}}</div>
      </div>
      <div class="simple__main">
        <button class="button simple__button" type="button" @click="$emit('confirm')">Подтвердить</button>
        <button class="button button_danger simple__button" type="button" @click="$emit('reject')">Отклонить</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Vue, Component, Prop } from 'vue-property-decorator';

  @Component
  export default class InputForm extends Vue {
    @Prop(String) readonly title: string | undefined
    simpleCloseHandler(e: Event) {
      if (!(e.target as Element).closest('.simple')) {
        this.$emit('reject');
      }
    }
  }
</script>

<style lang="scss">
  .overlay{
    position: fixed;
    z-index: 10;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0,0,0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .simple{
    background-color: $white;
    max-width: 1000px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
    border-radius: 4px;
    &__header{
      padding: 32px;
      border-bottom: 1px solid $gray-divider;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    &__title{
      font-weight: 500;
      font-size: 20px;
      color: $black-table;
    }
    &__main{
      padding: 32px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
</style>
