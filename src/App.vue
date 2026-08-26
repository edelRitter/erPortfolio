<template>
  <div>
    <VueLenis root :options="lenisOptions" />
    <div id="scrollarea">
      <Menu />
      <Top id="portfolioTop" />
      <Artwork id="portfolioArtwork" />
      <Photography id="portfolioPhotography" />
      <Showcase id="portfolioShowcase" />
      <About id="portfolioAbout" />
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { VueLenis } from 'lenis/vue'
import Menu from "@/portfolio/menu/index.vue";
import Top from '@/portfolio/top/content_top/index.vue';
import Artwork from '@/portfolio/top/content_artwork/index.vue';
import Photography from '@/portfolio/top/content_photography/index.vue';
import Showcase from '@/portfolio/top/content_showcase/index.vue';
import About from '@/portfolio/top/content_about/index.vue';

const lenisOptions = {
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
}

// Scroll to top instantly on page load/reload (before Lenis initializes)
if (typeof window !== 'undefined') {
  window.history.scrollRestoration = 'manual';
  window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
}

onMounted(() => {
  window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
})
</script>

<style>
@import '@/assets/vendors/reset.css';
@import '@/assets/vendors/default.css';
@import '~bootstrap/dist/css/bootstrap.min.css';
@import url('https://fonts.googleapis.com/css2?family=Manrope&family=Noto+Serif+JP&family=Playfair:wght@300;700&family=Raleway:wght@100;300&family=Roboto:wght@400;700&display=swap');

/** modules */
@import '@/assets/scss/_colors.scss';
@import '@/assets/scss/_media-queries.scss';
</style>
