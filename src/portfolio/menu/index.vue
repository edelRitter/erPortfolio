<template>
  <div class="menu">
    <div class="menu__wrapper">
    <label for="navigation" class="menu__button">
      <button
        id="navigation"
        class="menu__button-input"
        @click="toggleMenu"
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
          v-for="(link, index) in navLinks"
          :key="index"
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
import socialNetworking from '@/components/ui/sns/index.vue'

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
      alignment: 'ui-catalog__sns-center',
      navLinks: [
        {
          text: 'TOP',
          id: 'portfolioTop',
        },
        {
          text: 'ARTWORK',
          id: 'portfolioArtwork',
        },
        {
          text: 'PHOTOGRAPHY',
          id: 'portfolioPhotography',
        },
        {
          text: 'ABOUT',
          id: 'portfolioAbout',
        }
      ]
    }
  },
  methods: {
    toggleMenu () {
      this.isActive = !this.isActive
    },
    navScroll(link) {
      const position = document.getElementById(link.id).offsetTop;
      // smooth scroll
      window.scrollTo({ top: position, behavior: "smooth" });
    },
  },
}
</script>

<style>
@import './style.scss';
</style>
