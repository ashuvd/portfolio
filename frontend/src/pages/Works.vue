<template>
  <div class="page">
    <div class="container">
      <div class="works">
        <ul v-if="works.length" class="works__list">
          <li :key="work.id" v-for="work in works" class="works__item card">
            <div class="card__pic">
              <img class="card__img" :src="work.image" alt="pic">
            </div>
            <div class="card__title">{{work.title}}</div>
            <div class="card__desc">{{work.description}}</div>
            <a :href="work.link" target="_blank" class="card__link">{{work.link}}</a>
            <button v-if="userId" type="button" class="icon-button icon-button_delete" @click="deleteWork(work.id)" >
              <svg class="icon-button__img">
                <use :xlink:href="`/sprite.svg#trash-alt`" />
              </svg>
            </button>
            <button v-if="userId" type="button" class="icon-button icon-button_edit" @click="editWork(work.id)">
              <svg class="icon-button__img">
                <use :xlink:href="`/sprite.svg#edit`" />
              </svg>
            </button>
          </li>
        </ul>
        <div v-else>Пока работ нет</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';
import {Action, Getter, State} from "vuex-class";
@Component
export default class Works extends Vue {
  @Getter('userId', { namespace: 'users' })
  userId!: number;
  @State('works', { namespace: 'works' })
  works: any;
  @Action('getWorks', { namespace: 'works' })
  getWorks: any;
  @Action('deleteWork', { namespace: 'works' })
  deleteWork: any;
  editWork(id: number) {
    this.$router.push(`/works/${id}`);
  }
  mounted() {
    this.getWorks();
  }
}
</script>

<style lang="scss">
  .works {
    &__list {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
    }
  }
</style>
