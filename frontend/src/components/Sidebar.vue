<template>
  <aside>
<!--    <div class="sidebar__logo logo">-->
<!--      <svg class="logo__img">-->
<!--        <use :xlink:href="'/sprite.svg#logo'" />-->
<!--      </svg>-->
<!--    </div>-->
    <div class="sidebar__nav">
      <div class="sidebar__title">Портфолио Шувалова Александра</div>
      <ul class="menu">
        <router-link
          v-if="auth"
          v-for="{ icon, text, to, name, auth } in links"
          :key="to"
          class="menu__item"
          tag="li"
          :to="to"
          :class="{menu__item_active: currentPage.includes(name)}"
        >
          <div class="menu__icon">
            <svg class="menu__img">
              <use :xlink:href="`/sprite.svg#${icon}`" />
            </svg>
          </div>
          <a href="" class="menu__link">{{ text }}</a>
        </router-link>
      </ul>
    </div>
  </aside>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Getter } from "vuex-class";

@Component
export default class Sidebar extends Vue {
  @Getter('userId', { namespace: 'users' })
  userId!: number;

  get links() {
    return [
      {
        to: '/',
        text: 'Обо мне',
        icon: 'user',
        auth: true,
        name: 'info'
      },
      {
        to: '/skills',
        text: 'Список скилов',
        icon: 'ski-jump',
        auth: true,
        name: 'skills'
      },
      {
        to: '/works',
        text: 'Список работ',
        icon: 'briefcase',
        auth: true,
        name: 'works'
      },
      {
        to: '/add-skill',
        text: 'Добавить скил',
        icon: 'ski-jump',
        auth: this.userId,
        name: 'add-skill'
      },
      {
        to: '/add-work',
        text: 'Добавить работу',
        icon: 'briefcase',
        auth: this.userId,
        name: 'add-work'
      },
    ];
  }

  get currentPage() {
    return this.$route.name;
  }
}
</script>

<style lang="scss">
.sidebar {
  display: flex;
  flex-direction: column;
  padding: 0;
  color: $white;
  font-size: 0.875rem;
  &__logo {
    margin-bottom: 30px;
  }
  &__title {
    color: $black;
    margin-bottom: 20px;
    text-align: center;
    font-style: italic;
    font-size: 16px;
    font-weight: 700;
    padding-bottom: 20px;
    border-bottom: 2px dashed $black-table;
  }
}
.menu {
  width: 100%;
  flex-direction: column;
  min-height: 100%;
  &__icon {
    width: 17px;
    height: 17px;
    margin-right: 16px;
  }
  &__img {
    width: 100%;
    height: 100%;
    display: block;
    fill: $gray-icon;
  }
  &__item {
    cursor: pointer;
    display: flex;
    align-items: center;
    margin-bottom: 26px;
    &:last-child {
      margin-bottom: 0;
    }
    &_active,
    &:hover {
      .menu__link {
        color: $blue;
      }
      .menu__img {
        fill: $blue;
      }
    }
  }
  &__link {
    display: block;
    color: $blue-dark-text;
    font-size: 13px;
    font-weight: 500;
  }
}
</style>
