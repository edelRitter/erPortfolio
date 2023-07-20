<template>
  <div>
    <Menu />
    <Header />
  </div>
</template>

<script setup>
import Menu from './portfolio/menu/index.vue'
import Header from './portfolio/header/index.vue'
</script>

<style>
@import '@/assets/vendors/reset.css';
@import '@/assets/vendors/default.css';
@import "~bootstrap/dist/css/bootstrap.min.css";
@import url('https://fonts.googleapis.com/css2?family=Anton&family=Manrope&family=Playfair:wght@300&family=Roboto&display=swap');

/** modules */ 
@import '@/assets/scss/_colors.scss';
@import '@/assets/scss/_textsize.scss';
@import '@/assets/scss/_media-queries.scss';
</style>
