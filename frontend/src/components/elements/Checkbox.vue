<template>
  <div class="checkbox">
    <label class="checkbox__label">
      <span class="text">
        <slot name="textLeft"></slot>
      </span>
      <input
        :checked="checked"
        type="checkbox"
        class="checkbox__input visually-hidden"
        @change="$emit('change', $event.target.checked)"
      />
      <span class="checkbox__fake">
        <svg class="checkbox__img">
          <use :xlink:href="'/sprite.svg#check'" />
        </svg>
      </span>
      <span class="text text_right">
        <slot name="textRight"></slot>
      </span>
    </label>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Model } from 'vue-property-decorator';

@Component
export default class Checkbox extends Vue {
  @Model('change', { type: Boolean }) readonly checked!: boolean;
}
</script>

<style lang="scss">
.checkbox {
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
    border-radius: 4px;
    background-color: transparent;
    position: relative;
  }
  &__img {
    position: absolute;
    bottom: 2px;
    left: 2px;
    width: 9px;
    height: 8px;
    stroke: $white;
    fill: none;
    stroke-width: 2px;
    stroke-dasharray: 17;
    stroke-dashoffset: 17;
  }
  &__input:checked ~ &__fake {
    .checkbox__img {
      stroke-dashoffset: 0;
      transition: stroke-dashoffset 0.5s;
    }
    background-color: $blue;
    border-color: $blue;
  }
}
</style>
