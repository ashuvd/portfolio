<template>
  <div :style="{ width: width + 'px' }">
    <input
      :value="inputText"
      :placeholder="placeholder"
      type="text"
      class="search__input"
      @input="$emit('input', $event.target.value)"
    />
    <div class="search__icon">
      <svg class="search__img">
        <use :xlink:href="'/sprite.svg#search'" />
      </svg>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Model } from 'vue-property-decorator';

@Component
export default class InputForm extends Vue {
  @Prop({ type: Number, default: 250 }) readonly width: number | undefined;
  @Prop(String) readonly placeholder: string | undefined;
  @Model('input', { type: String }) readonly inputText!: string;
}
</script>

<style lang="scss">
.search {
  &__input {
    width: 100%;
    padding: 14px 14px 14px 48px;
    font-size: 12px;
    background-color: $white;
    color: $gray;
    border-radius: 4px;
  }
  &__icon {
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    left: 24px;
    width: 15px;
    height: 15px;
  }
  &__img {
    width: 100%;
    height: 100%;
    display: block;
    fill: $gray;
  }
}
</style>
