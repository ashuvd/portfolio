<template>
  <div class="radio">
    <label class="radio__label">
      <span class="text">
        <slot name="textLeft"></slot>
      </span>
      <input
        :value="defaultValue"
        :checked="defaultValue === value"
        type="radio"
        class="radio__input visually-hidden"
        @change="$emit('change', $event.target.value)"
        :name="name"
      />
      <span class="radio__fake"></span>
      <span class="text text_right">
        <slot name="textRight"></slot>
      </span>
    </label>
  </div>
</template>

<script lang="ts">
  import { Vue, Component, Model, Prop } from 'vue-property-decorator';

  @Component
  export default class Radio extends Vue {
    @Prop({ type: String }) readonly defaultValue!: string;
    @Prop({ type: String }) readonly name!: string;
    @Model('change', { type: String }) readonly value!: string;
  }
</script>

<style lang="scss">
  .radio {
    display: inline-block;
    vertical-align: middle;
    user-select: none;
    &__text {
      margin-right: 10px;
      &_right {
        margin-right: 0;
        margin-left: 10px;
      }
    }
    &__label {
      cursor: pointer;
      display: flex;
      align-items: center;
    }
    &__fake {
      display: block;
      width: 16px;
      height: 16px;
      border: 2px solid $gray-checkbox;
      border-radius: 50%;
      background-color: transparent;
      position: relative;
      &:before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 0;
        height: 0;
        border-radius: 50%;
        background-color: $blue;
        transition: all 0.3s;
      }
    }
    &__input:checked ~ &__fake {
      border-color: $blue;
    }
    &__input:checked ~ &__fake:before {
      width: 8px;
      height: 8px;
    }
  }
</style>
