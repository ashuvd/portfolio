<template>
  <div class="auth">
<!--    <div class="auth__logo logo">-->
<!--      <svg class="logo__img">-->
<!--        <use :xlink:href="'/sprite.svg#logo'" />-->
<!--      </svg>-->
<!--    </div>-->
    <form class="form form_login" @submit.prevent="submitHandler">
      <InputForm
        v-model.trim="login"
        id="login"
        labelText="Логин"
        class="form__group"
        :class="{
          invalid: $v.login.$dirty && !$v.login.required,
        }"
      >
        <div class="form__errors">
          <small v-if="$v.login.$dirty && !$v.login.required" class="invalid">
            Введите логин
          </small>
        </div>
      </InputForm>
      <InputForm
        v-model.trim="password"
        id="password"
        type="password"
        labelText="Пароль"
        class="form__group"
        :class="{
          invalid: $v.password.$dirty && !$v.password.required,
        }"
      >
        <div class="form__errors">
          <small
            v-if="$v.password.$dirty && !$v.password.required"
            class="invalid"
          >
            Введите пароль
          </small>
        </div>
      </InputForm>
      <button type="submit" class="form__button button" :disabled="$v.$invalid && ($v.login.$dirty || $v.password.$dirty)">Войти</button>
    </form>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import InputForm from '@/components/elements/InputForm.vue';
import { Action } from 'vuex-class';
import { required } from 'vuelidate/lib/validators';
import { ILogin } from '@/types';
const namespace: string = 'users';

@Component({
  components: { InputForm },
  validations: {
    login: { required },
    password: { required },
  },
})
export default class Login extends Vue implements ILogin {
  login: string = '';
  password: string = '';
  @Action('signin', { namespace })
  signin: any;

  async submitHandler() {
    try {
      if (this.$v.$invalid) {
        console.log('ddd');
        this.$v.$touch();
        return;
      }
      const ok = await this.signin({ login: this.login, password: this.password });
      if (ok) {
        await this.$router.push('/');
        this.$message('login');
      }
    } catch (error) {}
  }

  $message: any;
}
</script>

<style lang="scss">
.auth {
  width: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
</style>
