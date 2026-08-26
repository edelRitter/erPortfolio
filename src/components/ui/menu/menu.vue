<template>
  <div class="menu">
    <div class="menu__wrapper">
      <label for="navigation" class="menu__button">
        <button
          id="navigation"
          class="menu__button-input"
          @click="toggleMenu"
          :class="{ 'is-active': isActive }"
        ></button>
        <span class="menu__button-hamburger"></span>
      </label>
      <menu class="menu__sidebar" :class="{ 'is-active': isActive }">
        <h2 class="menu__sidebar-title">{{ title }}</h2>
        <ul class="menu__sidebar-list">
          <li
            class="menu__sidebar-list-item"
            v-for="(link, index) in navLinks"
            :key="index"
            @click="handleNavClick(link)"
          >
            {{ link.text }}
          </li>
        </ul>
        <slot name="footer"></slot>
      </menu>
    </div>
    <div class="menu__background" :class="{ 'is-active': isActive }"></div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'ui-menu',

  props: {
    title: {
      type: String,
      default: 'Menu',
    },
    navLinks: {
      type: Array,
      default: () => [
        { text: 'HOME', id: 'home' },
        { text: 'ABOUT', id: 'about' },
        { text: 'CONTACT', id: 'contact' },
      ],
    },
    enableScroll: {
      type: Boolean,
      default: true,
    },
  },

  emits: ['toggle', 'nav-click'],

  setup(props, { emit }) {
    const isActive = ref(false);

    const toggleMenu = () => {
      isActive.value = !isActive.value;
      emit('toggle', isActive.value);
    };

    const handleNavClick = (link) => {
      if (props.enableScroll) {
        const element = document.getElementById(link.id);
        if (element) {
          const position = element.offsetTop;
          window.scrollTo({ top: position, behavior: 'smooth' });
        }
      }
      emit('nav-click', link);
      toggleMenu();
    };

    return {
      isActive,
      toggleMenu,
      handleNavClick,
    };
  },
};
</script>

<style lang="scss">
@use './style.scss';
</style>
