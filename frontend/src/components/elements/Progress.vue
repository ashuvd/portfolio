<template>
  <div ref="progress" class="progress" :style="{ width: width }">
    <div ref="line" class="progress__line"></div>
    <button ref="ball" type="button" class="progress__ball">{{ value }}</button>
  </div>
</template>

<script lang="ts">
  import {Vue, Component, Prop, Model} from 'vue-property-decorator';

  @Component
  export default class Progress extends Vue {
    ball!: HTMLElement;
    line!: HTMLElement;
    container!: HTMLElement;
    @Prop({ type: String }) readonly width!: string;
    @Prop({ type: Number, default: 100 }) readonly max!: number;
    @Model('change', { type: Number, default: 0 }) readonly value!: number;
    isLeftBound(coordX: number) {
      return coordX < 0;
    }
    // isTopBound(coordY: number) {
    //   return  coordY < 0;
    // }
    isRightBound(coordX: number, borderRight: number) {
      return coordX > borderRight;
    }
    // isBottomBound(coordY: number, borderBottom: number) {
    //   return coordY > borderBottom;
    // }
    init() {
      this.ball = this.$refs.ball as HTMLElement;
      this.line = this.$refs.line as HTMLElement;
      this.container = this.$refs.progress as HTMLElement;

      let widthContainer = this.getCoords(this.container).width;
      const step = widthContainer / this.max;
      if (isNaN(this.value)) {
        this.$emit('change', 0);
      }
      this.ball.style.left = (this.value * step) + 'px';
      this.line.style.width = (this.value * step) + 'px';
    }
    updated() {
      this.init();
    }
    getCoords(elem: HTMLElement) {
      const box = elem.getBoundingClientRect();
      return {
        top: box.top + pageYOffset,
        left: box.left + pageXOffset,
        width: box.width,
        height: box.height
      };
    }
    round(coord: number, widthContainer: number) {
      const step = widthContainer / this.max;
      return Math.round(coord / step) * step;
    }
    checkPosition(coordX: number, borderRight: number) {
      if (this.isLeftBound(coordX)) {
        this.ball.style.left = 0 + 'px';
        this.line.style.width = 0 + 'px';
        this.$emit('change', 0);
      }
      if (this.isRightBound(coordX, borderRight)) {
        this.ball.style.left = borderRight + 'px';
        this.line.style.width = borderRight + 'px';
        this.$emit('change', this.max);
      }
      // if (this.isTopBound(coordY)) {
      //   this.ball.style.top = 0 + 'px';
      // }
      // if (this.isBottomBound(coordY, borderBottom)) {
      //   this.ball.style.top = borderBottom + 'px';
      // }
    }
    moveAt(e: MouseEvent) {
      let borderRight = this.getCoords(this.container).width;
      // let borderBottom = this.getCoords(this.container).height - this.getCoords(this.ball).height - 2;
      let coordX = e.pageX - this.getCoords(this.container).left;
      // let coordY = e.pageY - this.getCoords(this.container).top - shiftY;

      this.ball.style.left = coordX + 'px';
      this.line.style.width = coordX + 'px';
      const step = borderRight / this.max;
      this.$emit('change', Math.floor(this.round(coordX, borderRight) / step));
      // this.ball.style.top = coordY + 'px';

      this.checkPosition(coordX, borderRight);
    }
    listener(e: MouseEvent) {
      // let shiftX = e.pageX - this.getCoords(this.ball).left;
      // let shiftY = e.pageY - this.getCoords(this.ball).top;
      this.moveAt(e);
      document.onmousemove = (e: MouseEvent) => {
        this.moveAt(e);
      }
      document.onmouseup = (e: MouseEvent) => {
        let borderRight = this.getCoords(this.container).width;
        // let borderBottom = this.getCoords(this.container).height - this.getCoords(this.ball).height - 2;
        let coordX = e.pageX - this.getCoords(this.container).left;
        // let coordY = e.pageY - this.getCoords(this.container).top - shiftY;

        this.ball.style.left = this.round(coordX, borderRight) + 'px';
        this.line.style.width = this.round(coordX, borderRight) + 'px';

        this.checkPosition(coordX, borderRight);
        document.onmousemove = null;
        document.onmouseup = null;
      };
      this.ball.ondragstart = () => false;
    }
    mounted() {
      this.init();
      this.ball.addEventListener('mousedown', this.listener);
    }
    destroyed() {
      this.ball.removeEventListener('mousedown', this.listener);
    }
  }
</script>

<style lang="scss">
  .progress {
    height: 10px;
    background-color: $white;
    border: 1px solid $gray;
    border-radius: 5px;
    position: relative;
    &__ball {
      height: 20px;
      width: 20px;
      background-color: $blue;
      border-radius: 50%;
      position: absolute;
      top: 50%;
      transform: translate(-50%, -50%);
      left: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      color: $white;
      font-size: 11px;
      &:active {
        background-color: $blue-dark;
      }
    }
    &__line {
      background-color: $blue-light;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      width: 0;
    }
  }
</style>
