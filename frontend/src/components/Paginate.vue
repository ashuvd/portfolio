<template>
  <ul class="pagination">
    <li
      v-if="prevText"
      class="pagination__item"
      :class="[firstPageSelected() ? disabledClass : '']"
    >
      <a @click="prevPage" class="pagination__left">{{ prevText }}</a>
    </li>
    <li
      v-for="page in pages"
      class="pagination__item"
      :class="[
        page.selected ? activeClass : '',
        page.disabled ? disabledClass : '',
        page.breakView ? breakViewClass : ''
      ]"
    >
      <a v-if="page.breakView">...</a>
      <a v-else-if="page.disabled">{{ page.content }}</a>
      <a v-else @click="handlePageSelected(page.index + 1)">{{
        page.content
      }}</a>
    </li>
    <li
      v-if="nextText"
      class="pagination__item"
      :class="[lastPageSelected() ? disabledClass : '']"
    >
      <a @click="nextPage" class="pagination__right">{{ nextText }}</a>
    </li>
  </ul>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { IPage, IPageList } from '@/types';
@Component
export default class Paginate extends Vue {
  private innerValue: number = 1;
  private activeClass: string = 'active';
  private disabledClass: string = 'disabled';
  private breakViewClass: string = 'break';
  @Prop(String) prevText!: string;
  @Prop(String) nextText!: string;
  @Prop({ type: Number, required: true }) pageCount!: number;
  @Prop({ type: Number, default: 5 }) pageRange!: number;
  @Prop({ type: Number, default: 1 }) marginPages!: number;
  @Prop(Number) readonly value!: number;
  @Prop({ type: Function, default: () => {} }) readonly clickHandler!: (
    selected: number
  ) => {};

  handlePageSelected(selected: number) {
    if (this.selected === selected) return;

    this.innerValue = selected;
    this.$emit('input', selected);
    this.clickHandler(selected);
  }

  prevPage() {
    if (this.selected <= 1) return;

    this.handlePageSelected(this.selected - 1);
  }

  nextPage() {
    if (this.selected >= this.pageCount) return;

    this.handlePageSelected(this.selected + 1);
  }

  firstPageSelected() {
    return this.selected === 1;
  }

  lastPageSelected() {
    return this.selected === this.pageCount || this.pageCount === 0;
  }

  get selected() {
    return this.value || this.innerValue;
  }

  set selected(newValue) {
    this.innerValue = newValue;
  }

  get pages() {
    let items: IPageList<IPage> = {};
    if (this.pageCount <= this.pageRange) {
      for (let index = 0; index < this.pageCount; index++) {
        items[index] = {
          index: index,
          content: index + 1,
          selected: index === this.selected - 1
        };
      }
    } else {
      const halfPageRange = Math.floor(this.pageRange / 2);

      let setPageItem = (index: number) => {
        items[index] = {
          index: index,
          content: index + 1,
          selected: index === this.selected - 1
        };
      };

      let setBreakView = (index: number) => {
        items[index] = {
          disabled: true,
          breakView: true
        };
      };

      for (let i = 0; i < this.marginPages; i++) {
        setPageItem(i);
      }

      let selectedRangeLow = 0;
      if (this.selected - halfPageRange > 0) {
        selectedRangeLow = this.selected - 1 - halfPageRange;
      }

      let selectedRangeHigh = selectedRangeLow + this.pageRange - 1;
      if (selectedRangeHigh >= this.pageCount) {
        selectedRangeHigh = this.pageCount - 1;
        selectedRangeLow = selectedRangeHigh - this.pageRange + 1;
      }

      for (
        let i = selectedRangeLow;
        i <= selectedRangeHigh && i <= this.pageCount - 1;
        i++
      ) {
        setPageItem(i);
      }

      if (selectedRangeLow > this.marginPages) {
        setBreakView(selectedRangeLow - 1);
      }

      if (selectedRangeHigh + 1 < this.pageCount - this.marginPages) {
        setBreakView(selectedRangeHigh + 1);
      }

      for (
        let i = this.pageCount - 1;
        i >= this.pageCount - this.marginPages;
        i--
      ) {
        setPageItem(i);
      }
    }
    return items;
  }
}
</script>

<style lang="scss"></style>
