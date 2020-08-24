<template>
  <div class="page">
    <div class="container">
      <div class="add-skill">
        <form class="form" @submit.prevent="submitHandler">
          <InputForm
              v-model.trim="skill.title"
              id="title"
              labelText="Название"
              class="form__group"
              :class="{
          invalid: $v.skill.title.$dirty && !$v.skill.title.required,
        }"
          >
            <div class="form__errors">
              <small v-if="$v.skill.title.$dirty && !$v.skill.title.required" class="invalid">
                Введите название скила
              </small>
            </div>
          </InputForm>
          <div class="form__group">
            <p class="form__subtitle">Процент освоения</p>
            <Progress v-model="skill.percents" width="100%" />
          </div>
          <div class="form__group">
            <CustomSelect
                v-model="skill.category"
                labelText="Категория"
                :items="selectItems"
                class="search__select"
            />
          </div>
          <button type="submit" class="form__button button" :disabled="$v.$invalid && ($v.skill.title.$dirty)">Сохранить</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';
import {ISelect, ISkill} from "@/types";
import CustomSelect from "@/components/elements/CustomSelect.vue";
import Progress from "@/components/elements/Progress.vue";
import InputForm from "@/components/elements/InputForm.vue";
import { required } from "vuelidate/lib/validators";
import { Action, State } from "vuex-class";
@Component({
  components: { InputForm, CustomSelect, Progress },
  validations: {
    skill: {
      title: { required },
      percents: { required },
    }
  },
})
export default class EditSkill extends Vue {
  selectItems: ISelect<string>[] = [
    {
      id: 'Frontend',
      value: 'Frontend'
    },
    {
      id: 'Backend',
      value: 'Backend'
    },
    {
      id: 'Workflow',
      value: 'Workflow'
    },
  ];
  @Action('getSkill', { namespace: 'skills'})
  getSkill: any;
  mounted() {
    this.getSkill(this.$route.params.skill_id);
  }
  @State('skill', { namespace: 'skills'})
  skill!: ISkill
  @Action('updateSkill', { namespace: 'skills'})
  updateSkill: any;
  async submitHandler() {
    try {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      const ok = await this.updateSkill({ updateSkill: this.skill, id: this.$route.params.skill_id });
      if (ok) {
        await this.$router.push('/skills');
      }
    } catch (error) {}
  }
}
</script>

<style lang="scss">
.add-skill {
  background-color: $white;
  border-radius: 5px;
  padding: 40px;
}
</style>
