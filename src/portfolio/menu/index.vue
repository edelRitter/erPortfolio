<template>
  <div class="menu">
    <div class="menu__wrapper">
    <label for="navigation" class="menu__button">
      <input type="checkbox" id="navigation" class="menu__button-input" v-on:click="toggleMenu"/>
      <span class="menu__button-hamburger"></span>
    </label>
    <menu class="menu__sidebar" :class="{'is-active': isActive}">
      <h2 class="menu__sidebar-title">
        edelRitter
      </h2>
      <ul class="menu__sidebar-list">
        <li><a href="#">menu1</a></li>
        <li><a href="#">menu2</a></li>
        <li><a href="#">menu3</a></li>
        <li><a href="#">menu4</a></li>
      </ul>
    </menu>
    </div>
    <div class="menu__background" :class="{'is-active': isActive}"></div>
  </div>
</template>

<script>
export default {
  name: 'Menu',
  data: () => {
    return {isActive: false}
  },
  methods: {
    toggleMenu () {
      this.isActive = !this.isActive
    }
  }
}
</script>

<style>
@import '@/portfolio/menu/style.scss';
</style>
