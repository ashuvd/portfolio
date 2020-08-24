<template>
  <figure class="skill">
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" class="skill__svg">
      <circle class="skill__circle skill__circle_under" cx="50" cy="50" r="40"></circle>
      <circle class="skill__circle skill__circle_above" cx="50" cy="50" r="40" ref="circle"></circle>
    </svg>
    <div class="skill__title">{{title}}</div>
  </figure>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class Skill extends Vue {
  @Prop({ type: String, default: '' }) readonly title!: string;
  @Prop({ type: Number, default: 0 }) readonly percents!: number;
  calcPercents() {
    const circle = this.$refs['circle'] as HTMLElement;
    const dashoffset = parseInt(
        getComputedStyle(circle).getPropertyValue('stroke-dashoffset')
    );
    const percentDashoffset = (dashoffset / 100) * (100 - this.percents);
    const percentOpacity = this.percents / 100;
    circle.style.strokeDashoffset = Math.round(percentDashoffset).toString();
    circle.style.opacity = percentOpacity.toFixed(1);
  }
  mounted(){
    this.calcPercents();
  }
}
</script>

<style lang="scss">

</style>
