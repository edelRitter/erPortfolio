<template>
  <div class="menu">
    <label for="menu" class="menu__button">
      <input
        type="checkbox"
        id="menu"
        class="menu__button-input"/>
      <span class="menu__button-hamburger"></span>
    </label>
  </div>
</template>

<script>
export default {
  name: 'Menu',
}
</script>

<style>
@import '@/portfolio/menu/style.scss';
</style>
