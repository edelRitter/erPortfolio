<template>
  <div>
    <Menu />
    <Top id="portfolioTop" />
    <Artwork id="portfolioArtwork" />
    <About id="portfolioAbout" />
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
@import url('https://fonts.googleapis.com/css2?family=Anton&family=Manrope&family=Playfair:wght@300;700&family=Roboto:wght@400;700&display=swap');

/** modules */ 
@import '@/assets/scss/_colors.scss';
@import '@/assets/scss/_media-queries.scss';
</style>
