<template>
  <div class="page">
    <div class="container">
      <div class="add-work">
        <form class="form" @submit.prevent="submitHandler">
          <InputForm
              v-model.trim="work.title"
              id="title"
              labelText="Название"
              class="form__group"
              :class="{
          invalid: $v.work.title.$dirty && !$v.work.title.required,
        }"
          >
            <div class="form__errors">
              <small v-if="$v.work.title.$dirty && !$v.work.title.required" class="invalid">
                Введите название работы
              </small>
            </div>
          </InputForm>
          <InputForm
              v-model.trim="work.description"
              id="description"
              labelText="Описание"
              class="form__group"
              :class="{
          invalid: $v.work.description.$dirty && !$v.work.description.required,
        }"
          >
            <div class="form__errors">
              <small
                  v-if="$v.work.description.$dirty && !$v.work.description.required"
                  class="invalid"
              >
                Введите описание работы
              </small>
            </div>
          </InputForm>
          <InputForm
              v-model.trim="work.link"
              id="link"
              labelText="Ссылка на работу"
              class="form__group"
              :class="{
          invalid: $v.work.link.$dirty && !$v.work.link.required,
        }"
          >
            <div class="form__errors">
              <small
                  v-if="$v.work.link.$dirty && !$v.work.link.required"
                  class="invalid"
              >
                Введите ссылку на работу
              </small>
            </div>
          </InputForm>
          <InputForm
              v-model.trim="work.githubLink"
              id="github-link"
              labelText="Ссылка на исходный код"
              class="form__group"
              :class="{
          invalid: $v.work.githubLink.$dirty && !$v.work.githubLink.required,
        }"
          >
            <div class="form__errors">
              <small
                  v-if="$v.work.githubLink.$dirty && !$v.work.githubLink.required"
                  class="invalid"
              >
                Введите ссылку на исходный код
              </small>
            </div>
          </InputForm>
          <div class="form__group center">
            <input id="file" type="file" class="form__input visually-hidden" @change="previewImage">
            <label for="file" class="form__label-file">
              <img class="form__img" :src="previewPath">
            </label>
          </div>
          <button type="submit" class="form__button button" :disabled="$v.$invalid && ($v.work.title.$dirty || $v.work.description.$dirty || $v.work.link.$dirty || $v.work.githubLink.$dirty)">Сохранить</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';
import CustomSelect from "@/components/elements/CustomSelect.vue";
import InputForm from "@/components/elements/InputForm.vue";
import { required } from "vuelidate/lib/validators";
import {Action, State} from "vuex-class";
import {IWork} from "@/types";
@Component({
  components: { InputForm, CustomSelect },
  validations: {
    work: {
      title: { required },
      description: { required },
      link: { required },
      githubLink: { required }
    }
  },
})
export default class EditWork extends Vue {
  file!: File;
  protected previewPath: string | ArrayBuffer | null = null;
  @State('work', { namespace: 'works' })
  work!: IWork
  previewImage(event: Event) {
    let reader = new FileReader();
    reader.onload = (e) => this.previewPath = (e.target as FileReader).result;
    const target= event.target as HTMLInputElement;
    const file = (target.files as FileList)[0];
    if (file) {
      reader.readAsDataURL(file);
    }
    this.file = file;
  }
  @Action('getWork', { namespace: 'works'})
  getWork: any;
  async mounted() {
    await this.getWork(this.$route.params.work_id);
    this.previewPath = this.work.image;
  }
  @Action('updateWork', { namespace: 'works'})
  updateWork: any;
  async submitHandler() {
    try {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      const ok = await this.updateWork( { updateWork: { title: this.work.title, description: this.work.description, link: this.work.link, github_link: this.work.githubLink, file: this.file }, id: this.work.id });
      if (ok) {
        await this.$router.push('/works');
      }
    } catch (error) {}
  }
}
</script>

<style lang="scss">
.add-work {
  background-color: $white;
  border-radius: 5px;
  padding: 40px;
}
.form{
  &__img{
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  &__label-file{
    display: inline-block;
    width: 100%;
    height: 500px;
    overflow: hidden;
    background-color: $gray;
    cursor: pointer;
    position: relative;
    &:hover{
      background-color: rgba($gray, 0.5);
      &:before{
        content: '';
        position: absolute;
        left: 50%;
        top: 50%;
        width: 10px;
        height: 2px;
        background-color: $gray;
        transform: translate(-50%, -50%);
      }
      &:after{
        content: '';
        position: absolute;
        left: 50%;
        top: 50%;
        width: 2px;
        height: 10px;
        background-color: $gray;
        transform: translate(-50%, -50%);
      }
    }
  }
}
</style>
