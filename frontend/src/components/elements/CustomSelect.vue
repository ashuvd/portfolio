<template>
  <div
    id="select"
    class="select"
    ref="select"
    :class="{ select_active: dropdown }"
    :style="{ width: width + 'px', zIndex: z }"
  >
    <p class="select__value" @click="openSelect">{{ currentValue }}</p>
    <ul
      :style="{ height: dropdownHeight + 'px', overflowY: dropdownOverflow }"
      class="select__dropdown"
      :class="{ over: over, select__dropdown_border: dropdown }"
      ref="dropdown"
      @transitionend="transitionEnd"
    >
      <li @click="closeSelect(item.id)" class="select__item" v-for="item in items">
        {{ item.value }}
      </li>
    </ul>
    <span class="select__icon" :class="{ select__icon_up: dropdown }"></span>
    <label
      for="select"
      class="select__label"
      :class="{
        select__label_active: dropdown || currentValue,
        select__label_focus: dropdown
      }"
    >
      {{ labelText }}
    </label>
  </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, Model, Watch} from 'vue-property-decorator';
import { ISelect } from '@/types';

@Component
export default class CustomSelect extends Vue {
  @Prop(Number) readonly z: number | undefined;
  @Prop(String) readonly labelText: string | undefined;
  @Prop({ type: Number, default: 250 }) readonly width: number | undefined;
  @Prop({ default: () => [] }) items!: ISelect<any>[];
  @Model('change', { type: String }) readonly id!: string;
  over: boolean = false;
  currentValue: string = '';
  dropdownHeight: number = 0;
  dropdown: boolean = false;
  currentHeight: number = 0;
  maxHeight: number = 0;
  dropdownOverflow: string = 'hidden';
  created() {
    const item = this.items.find(item => item.id === this.id);
    console.log('created', this.id)
    this.currentValue = item ? item.value : '';
  }
  @Watch('id')
  changeId(val: string) {
    this.currentValue = val;
  }
  mounted() {
    const dropdown = this.$refs.dropdown as HTMLElement;
    this.currentHeight = dropdown.scrollHeight;
    this.maxHeight = (this.currentHeight / dropdown.children.length) * 5;
    document.addEventListener('click', this.selectCloseHandler);
  }
  destroyed() {
    document.removeEventListener('click', this.selectCloseHandler);
  }
  checkPosition(dropdownHeight: number): boolean {
    const select = this.$refs.select as HTMLElement;
    const wrapper = document.querySelector('.wrapper') as HTMLElement;
    const bottomWallSelect = select.getBoundingClientRect().bottom;
    const bottomWallWrapper = wrapper.getBoundingClientRect().bottom;
    return (dropdownHeight + bottomWallSelect) > bottomWallWrapper;
  }
  openSelect() {
    this.dropdown = !this.dropdown;
    this.dropdownHeight = this.dropdown
      ? this.currentHeight > this.maxHeight
        ? this.maxHeight
        : this.currentHeight
      : 0;
    this.over = this.checkPosition(this.dropdownHeight);
  }
  closeSelect(id: string) {
    const item = this.items.find(item => item.id === id);
    this.currentValue = item ? item.value : '';
    this.change(id);
    this.dropdown = false;
    this.dropdownHeight = 0;
  }
  transitionEnd() {
    this.dropdownOverflow = this.dropdown
      ? this.currentHeight > this.maxHeight
        ? 'scroll'
        : 'hidden'
      : 'hidden';
  }
  selectCloseHandler(e: Event) {
    if ((e.target as Element).closest('.select') !== this.$refs.select) {
      this.dropdown = false;
      this.dropdownHeight = 0;
    }
  }
  change(id: string) {
    this.$emit('change', id);
  }
}
</script>

<style lang="scss">
.select {
  position: relative;
  border-bottom: 1px solid $gray-text-line;
  height: 41px;
  &_active {
    border-bottom-color: $gray-text;
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
    &_focus {
      color: $blue;
    }
  }
  &__value {
    position: relative;
    z-index: 1;
    height: 100%;
    cursor: pointer;
    padding: 10px 30px 10px 0;
    font-size: 13px;
    color: $black-table;
  }
  &__icon {
    width: 10px;
    height: 20px;
    display: block;
    background: svg-load('angle-down.svg', fill=$gray-arrow);
    position: absolute;
    top: 50%;
    right: 5px;
    transform: translateY(-50%);
    transition: transform 0.2s;
    &_up {
      transform: rotate(180deg) translateY(50%);
      background: svg-load('angle-down.svg', fill=$blue);
    }
  }
  &__dropdown {
    position: absolute;
    top: 110%;
    background-color: $white;
    width: 100%;
    border-radius: 4px;
    transition: height 0.2s;
    &_border {
      border: 1px solid $blue-light;
    }
  }
  &__item {
    cursor: pointer;
    padding: 10px;
    font-size: 13px;
    color: $black-table;
    &:first-child {
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
    }
    &:last-child {
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
    }
    &:hover {
      background-color: $blue-light;
      color: $white;
    }
  }
}
.over {
  top: initial;
  bottom: 150%;
}
</style>
