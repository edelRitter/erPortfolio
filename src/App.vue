<template>
  <div>
    <Menu />
    <Top />
    <Artwork />
    <About />
  </div>
</template>

<script setup>
import Menu from '@/portfolio/menu/index.vue'
import Top from '@/portfolio/content_top/index.vue'
import Artwork from '@/portfolio/content_artwork/index.vue'
import About from '@/portfolio/content_about/index.vue'
</script>

<style>
@import '@/assets/vendors/reset.css';
@import '@/assets/vendors/default.css';
@import "~bootstrap/dist/css/bootstrap.min.css";
@import url('https://fonts.googleapis.com/css2?family=Anton&family=Manrope&family=Playfair:wght@300;700&family=Roboto&display=swap');

/** modules */ 
@import '@/assets/scss/_colors.scss';
@import '@/assets/scss/_media-queries.scss';
</style>
