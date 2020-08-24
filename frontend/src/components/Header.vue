<template>
  <header>
    <div class="container container_header">
      <div class="header__left">
        <h1 class="title">{{title}}</h1>
      </div>
      <div v-if="login" class="header__right">
        <div class="header__name">{{ login }}</div>
        <button
            type="button"
            class="header__button button button_secondary"
            data-action="logout"
            @click="logoutHandler"
        >
          Выйти
        </button>
      </div>
      <div v-else class="header__right">
        <button
          type="button"
          class="header__button button button_secondary"
          data-action="logout"
          @click="loginHandler"
        >
          Войти
        </button>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import InputForm from '@/components/elements/InputForm.vue';
import { Getter, Action } from 'vuex-class';
import { minLength, required, sameAs } from 'vuelidate/lib/validators';
const namespace: string = 'users';
@Component({
  components: { InputForm },
  validations: {
    newAdmin: {
      login: { required },
      password: { required, minLength: minLength(5) },
      confirmPassword: {
        required,
        sameAs: sameAs('password'),
      },
    },
  },
})
export default class Header extends Vue {
  @Getter('login', { namespace })
  login!: string;
  @Action('logout', { namespace })
  logout: any;

  get title() {
    return this.$route.meta.title;
  }

  async logoutHandler() {
    await this.logout();
  }
  async loginHandler() {
    await this.$router.push('/login');
  }
}
</script>

<style lang="scss">
.header__button {
  margin-left: 20px;
}
.header__right {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.container {
  &_header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
  }
}
</style>
