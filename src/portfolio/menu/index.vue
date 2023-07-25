<template>
  <div
    class="menu"
    :class="{ darkBg: dark }"
    @scroll="handleScroll">
    <div class="menu__wrapper">
    <label for="navigation" class="menu__button">
      <button
        id="navigation"
        class="menu__button-input"
        v-on:click="toggleMenu"
        :class="{'is-active': isActive}">
      </button>
      <span class="menu__button-hamburger"></span>
    </label>
    <menu class="menu__sidebar" :class="{'is-active': isActive}">
      <h2 class="menu__sidebar-title">
        edelRitter
      </h2>
      <ul class="menu__sidebar-list">
        <li
          class="menu__sidebar-list-item"
          v-for="(link, index) in navLinks" :key="index"
          @click=navScroll(link)
          v-on:click="toggleMenu">
          {{ link.text }}
        </li>
      </ul>
      <socialNetworking :class="this.alignment" />
    </menu>
    </div>
    <div class="menu__background" :class="{'is-active': isActive}"></div>
  </div>
</template>

<script>
import socialNetworking from '@/portfolio/ui/sns/index.vue'

import { ref, onMounted } from 'vue'

const menuRef = ref(null)

export default {
  name: 'Menu',
  components: {
    socialNetworking
  },
  data: () => {
    return {
      isActive: false,
      dark: false,
      scrollTop: 0,
      alignment: 'ui-catalog__sns-right',
      navLinks: [
        {
          text: 'TOP',
          id: 'portfolioTop',
          bg: 'dark',
        },
        {
          text: 'ARTWORK',
          id: 'portfolioArtwork',
          bg: 'dark',
        },
        {
          text: 'ABOUT',
          id: 'portfolioAbout',
          bg: 'light',
        }
      ]
    }
  },
  methods: {
    toggleMenu () {
      this.isActive = !this.isActive
    },
    navScroll(link) {
      const menu = document.querySelectorAll('menu');
      const position = document.getElementById(link.id).offsetTop;
      // smooth scroll
      window.scrollTo({ top: position, behavior: "smooth" });
    },
    handleScroll() {
      this.scrollTop = window.scrollY;
      console.log(this.scrollTop);
    },
  },
  created () {
    window.addEventListener('scroll', this.handleScroll);
  },
  unmounted () {
    window.removeEventListener('scroll', this.handleScroll);
  },
}
</script>

<style>
@import '@/portfolio/menu/style.scss';
</style>
