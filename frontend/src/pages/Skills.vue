<template>
  <div class="page">
    <div class="container">
      <ul class="skills">
        <li :key="skillsGroup.category" v-for="skillsGroup in skillsGroups" class="skills__item">
          <div class="skills-row">
            <div class="skills-row__title">
              {{ skillsGroup.category }}
            </div>
            <ul class="skills-row__list">
              <li :key="skill.id" v-for="skill in skillsGroup.skills" class="skills-row__item">
                <Skill :key="new Date().getTime()" :title="skill.title" :percents="skill.percents" />
                <button v-if="userId" type="button" class="icon-button icon-button_delete" @click="deleteSkill(skill.id)" >
                  <svg class="icon-button__img">
                    <use :xlink:href="`/sprite.svg#trash-alt`" />
                  </svg>
                </button>
                <button v-if="userId" type="button" class="icon-button icon-button_edit" @click="editSkill(skill.id)">
                  <svg class="icon-button__img">
                    <use :xlink:href="`/sprite.svg#edit`" />
                  </svg>
                </button>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
import {Action, Getter, State} from 'vuex-class';
import Skill from '../components/elements/Skill.vue';
import {ISkill} from "@/types";
@Component({
  components: {
    Skill
  }
})
export default class Skills extends Vue {
  @Getter('userId', { namespace: 'users' })
  userId!: number;
  @State('skills', { namespace: 'skills' })
  skills: any;
  @Action('getSkills', { namespace: 'skills' })
  getSkills: any;
  @Action('deleteSkill', { namespace: 'skills' })
  deleteSkill: any;
  editSkill(id: number) {
    this.$router.push(`/skills/${id}`);
  }
  mounted() {
    this.getSkills();
  }
  @Watch('skills')
  changeSkills(val: string[]) {
    console.log('val', [...val])
  }
  get skillsGroups() {
    const skills = [...this.skills.reduce((acc: any, skill: ISkill) => {
      let categoryExists = false;
      acc.forEach((a: any) => {
        if (a.category === skill.category) {
          categoryExists = true;
          a.skills.push(skill);
        }
      });
      if (!categoryExists) {
        const category = skill.category;
        acc.push({
          category,
          skills: [skill]
        })
      }
      return acc;
    }, [])]
    console.log('update skills', skills);
    return skills;
  }
}
</script>

<style lang="scss">
</style>
