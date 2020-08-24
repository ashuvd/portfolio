<template>
  <div class="overlay" @mousedown="modalCloseHandler">
    <div class="modal" ref="modal">
      <div class="modal__header">
        <div class="modal__title">{{title}}</div>
        <button class="modal__close" type="button" @click="$emit('close')"></button>
      </div>
      <div class="modal__main">
        <slot name="main"></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Vue, Component, Prop } from 'vue-property-decorator';

  @Component
  export default class InputForm extends Vue {
    @Prop(String) readonly title: string | undefined
    modalCloseHandler(e: Event) {
      if (!(e.target as Element).closest('.modal')) {
        this.$emit('close');
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
  .modal{
    background-color: $white;
    width: 434px;
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
      margin-right: 32px;
    }
    &__main{
      padding: 32px;
    }
    &__close{
      width: 17px;
      height: 17px;
      position: relative;
      background-color: transparent;
      &:hover{
        &:before, &:after{
          background-color: $black;
        }
      }
      &:before{
        content: '';
        display: block;
        height: 2px;
        width: 100%;
        background-color: $gray-icon;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) rotate(-45deg);
      }
      &:after{
        content: '';
        display: block;
        height: 2px;
        width: 100%;
        background-color: $gray-icon;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) rotate(45deg);
      }
    }
  }
</style>
