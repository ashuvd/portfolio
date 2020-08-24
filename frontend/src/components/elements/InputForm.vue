<template>
  <div :style="{ width: width }">
    <input
      :value="inputText"
      :id="id"
      :type="type"
      class="form__input"
      @input="$emit('input', $event.target.value)"
      @focus="isFocus = true"
      @blur="isFocus = false"
    />
    <label
      :for="id"
      class="form__label"
      :class="{ form__label_active: active }"
    >
      {{ labelText }}
    </label>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Model } from 'vue-property-decorator';

@Component
export default class InputForm extends Vue {
  isFocus: boolean = true;
  @Prop({ type: String, default: 'text' }) readonly type: string | undefined;
  @Prop({ type: String, default: '100%' }) readonly width: string | undefined;
  @Prop(String) readonly labelText: string | undefined;
  @Prop(String) readonly id: string | undefined;
  @Model('input', { type: String }) readonly inputText!: string;
  get active(): boolean {
    return !!this.inputText || this.isFocus;
  }
}
</script>

<style lang="scss">
.form {
  &__input {
    width: 100%;
    padding: 9px 0;
    font-size: 14px;
    background-color: transparent;
    border-bottom: 1px solid $gray-text-line;
    color: $black-table;
    &:focus {
      color: $black;
      border-bottom-color: $gray-text;
    }
    &:focus ~ label {
      color: $blue;
    }
  }
  &__label {
    position: absolute;
    bottom: 50%;
    transform: translateY(50%);
    left: 0;
    transition: all 0.2s;
    font-size: 13px;
    &_active {
      bottom: 100%;
      transform: translateY(0);
      font-size: 11px;
      font-weight: 500;
    }
  }
}
</style>
