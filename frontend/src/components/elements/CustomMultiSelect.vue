<template>
  <div id="multiSelect" class="multiSelect" ref="multiSelect" :class="{multiSelect_active: dropdown}">
    <p class="multiSelect__values" @click="openSelect">
      {{ values }}
    </p>
    <ul
      :style="{ height: dropdownHeight + 'px', overflowY: dropdownOverflow }"
      class="multiSelect__dropdown"
      ref="dropdown"
      @transitionend="transitionEnd"
    >
      <li class="multiSelect__item" v-for="item in items">
        <Checkbox v-model="item.check" class="checkbox_multi">
          <span class="multiSelect__value" slot="textRight">{{ item.value }}</span>
        </Checkbox>
      </li>
    </ul>
    <span
      class="multiSelect__icon"
      :class="{ multiSelect__icon_up: dropdown }"
    ></span>
    <label
      for="multiSelect"
      class="multiSelect__label"
      :class="{
        multiSelect__label_active: dropdown || values,
        multiSelect__label_focus: dropdown
      }"
    >
      {{ labelText }}
    </label>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Model } from 'vue-property-decorator';
import { ISelect, IMultiSelect } from '@/types';
import Checkbox from '@/components/elements/Checkbox.vue';
@Component({
  components: { Checkbox }
})
export default class CustomMultiSelect extends Vue {
  @Prop(String) readonly labelText: string | undefined;
  @Prop({ default: () => [] }) items!: IMultiSelect[];
  @Model('change', { type: Object }) readonly multiSelect!: IMultiSelect;
  dropdownHeight: number = 0;
  dropdown: boolean = false;
  currentHeight: number = 0;
  maxHeight: number = 115;
  dropdownOverflow: string = 'hidden';
  mounted() {
    const dropdown: Element = this.$refs.dropdown as Element;
    this.currentHeight = dropdown.scrollHeight;
    document.addEventListener('click', this.multiSelectCloseHandler);
  }
  destroyed() {
    document.removeEventListener('click', this.multiSelectCloseHandler);
  }
  openSelect() {
    this.dropdown = !this.dropdown;
    this.dropdownHeight = this.dropdown
      ? this.currentHeight > this.maxHeight
        ? this.maxHeight
        : this.currentHeight
      : 0;
  }
  multiSelectCloseHandler(e: Event) {
    if (
      (e.target as Element).closest('.multiSelect') !== this.$refs.multiSelect
    ) {
      this.dropdown = false;
      this.dropdownHeight = 0;
    }
  }
  transitionEnd() {
    this.dropdownOverflow = this.dropdown
      ? this.currentHeight > this.maxHeight
        ? 'scroll'
        : 'hidden'
      : 'hidden';
  }
  change(item: ISelect<any>) {
    this.$emit('change', item);
  }
  get values() {
    return this.items.filter(i => i.check).map(i => i.value).join(',');
  }
}
</script>

<style lang="scss">
.checkbox_multi{
  label{
    display: flex;
    align-items: center;
  }
  .checkbox__fake{
    flex-shrink: 0;
    margin-right: 5px;
  }
}
.multiSelect {
  position: relative;
  border-bottom: 1px solid $gray-text-line;
  width: 250px;
  height: 41px;
  &_active{
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
  &__values {
    position: relative;
    z-index: 1;
    height: 100%;
    cursor: pointer;
    padding: 10px 30px 10px 0;
    font-size: 13px;
    color: $black-table;
    white-space: nowrap; /* Запрещаем перенос строк */
    overflow: hidden; /* Обрезаем все, что не помещается в область */
    text-overflow: ellipsis; /* Добавляем многоточие */
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
    z-index: 11;
    top: 110%;
    background-color: $white;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    border-radius: 4px;
    overflow-x: hidden;
    transition: height 0.2s;
    padding-right: 20px;
  }
  &__item {
    display: flex;
    align-items: center;
    font-size: 13px;
    color: $black-table;
    margin-right: 20px;
    padding: 10px 0;
    width: 45px;
  }
}
</style>
