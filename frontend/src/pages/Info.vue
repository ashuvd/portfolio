<template>
  <div class="page">
    <div class="container">
      <div class="info">
        <div class="info__pic">
          <img class="info__img" src="../assets/images/logo.jpg" alt="">
        </div>
        <div class="info__desc">
          Всем привет, меня зовут Александр, тут я много чего о себе напишу, но позже. А пока можете посмотреть мои работы.
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import {Vue, Component} from 'vue-property-decorator';
  @Component
  export default class Info extends Vue {
  }
</script>

<style lang="scss">
  .info {
    display: flex;
    flex-direction: column;
    align-items: center;
    &__pic {
      width: 800px;
    }
    &__img {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
    &__desc {
      font-size: 20px;
      text-align: center;
    }
  }
</style>
