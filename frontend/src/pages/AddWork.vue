<template>
  <div class="page">
    <div class="container">
      <div class="add-work">
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
                Введите название работы
              </small>
            </div>
          </InputForm>
          <InputForm
              v-model.trim="description"
              id="description"
              labelText="Описание"
              class="form__group"
              :class="{
          invalid: $v.description.$dirty && !$v.description.required,
        }"
          >
            <div class="form__errors">
              <small
                  v-if="$v.description.$dirty && !$v.description.required"
                  class="invalid"
              >
                Введите описание работы
              </small>
            </div>
          </InputForm>
          <InputForm
              v-model.trim="link"
              id="link"
              labelText="Ссылка на работу"
              class="form__group"
              :class="{
          invalid: $v.link.$dirty && !$v.link.required,
        }"
          >
            <div class="form__errors">
              <small
                  v-if="$v.link.$dirty && !$v.link.required"
                  class="invalid"
              >
                Введите ссылку на работу
              </small>
            </div>
          </InputForm>
          <InputForm
              v-model.trim="githubLink"
              id="github-link"
              labelText="Ссылка на исходный код"
              class="form__group"
              :class="{
          invalid: $v.githubLink.$dirty && !$v.githubLink.required,
        }"
          >
            <div class="form__errors">
              <small
                  v-if="$v.githubLink.$dirty && !$v.githubLink.required"
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
          <button type="submit" class="form__button button" :disabled="$v.$invalid && ($v.title.$dirty || $v.description.$dirty || $v.link.$dirty || $v.githubLink.$dirty)">Добавить</button>
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
import {Action} from "vuex-class";
@Component({
  components: { InputForm, CustomSelect },
  validations: {
    title: { required },
    description: { required },
    link: { required },
    githubLink: { required }
  },
})
export default class AddWork extends Vue {
  title: string = '';
  description: string = '';
  link: string = '';
  githubLink: string = '';
  file!: File;
  protected previewPath: string | ArrayBuffer | null = null;
  previewImage(event: Event) {
    let reader = new FileReader();
    reader.onload = (e) => this.previewPath = (e.target as FileReader).result;
    const target= event.target as HTMLInputElement;
    const file = (target.files as FileList)[0];
    if (file) {
      reader.readAsDataURL(file);
    }
    this.file = file;
    console.log(this.file)
  }
  @Action('addWork', { namespace: 'works'})
  addWork: any;
  async submitHandler() {
    try {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      const ok = await this.addWork({ title: this.title, description: this.description, link: this.link, github_link: this.githubLink, file: this.file });
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
