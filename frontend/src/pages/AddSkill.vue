<template>
  <div class="page">
    <div class="container">
      <div class="add-skill">
        <form class="form" @submit.prevent="submitHandler">
          <InputForm
              v-model.trim="title"
              id="title"
              labelText="Название"
              class="form__group"
              :class="{
          invalid: $v.title.$dirty && !$v.title.required,
        }"
          >
            <div class="form__errors">
              <small v-if="$v.title.$dirty && !$v.title.required" class="invalid">
                Введите название скила
              </small>
            </div>
          </InputForm>
          <div class="form__group">
            <p class="form__subtitle">Процент освоения</p>
            <Progress v-model="percents" width="100%" />
          </div>
          <div class="form__group">
            <CustomSelect
                v-model="category"
                labelText="Категория"
                :items="selectItems"
                class="search__select"
            />
          </div>
          <button type="submit" class="form__button button" :disabled="$v.$invalid && ($v.title.$dirty || $v.percents.$dirty)">Добавить</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';
import { ISelect } from "@/types";
import CustomSelect from "@/components/elements/CustomSelect.vue";
import InputForm from "@/components/elements/InputForm.vue";
import { required } from "vuelidate/lib/validators";
import { Action } from "vuex-class";
@Component({
  components: { InputForm, CustomSelect },
  validations: {
    title: { required },
    percents: { required },
  },
})
export default class AddSkill extends Vue {
  title: string = '';
  percents: string = '';
  category: string = 'Frontend';
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
  @Action('addSkill', { namespace: 'skills'})
  addSkill: any;
  async submitHandler() {
    try {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      const ok = await this.addSkill({ title: this.title, percents: +this.percents, category: this.category });
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
