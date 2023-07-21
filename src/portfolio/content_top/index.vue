<template>
  <div class="portfolio__top">
    <div class="portfolio__top-hero m-0">
      <div class="portfolio__top-wrapper">
        <span class="portfolio__top-subtitle">
          DESIGNER /
          <br>DEVELOPER /
          <br>ILLUSTRATOR /
        </span>
        <p class="portfolio__top-text m-0">-</p>
        <p class="portfolio__top-text m-0">porfolio website created by /</p>
        <p class="portfolio__top-text m-0">-</p>
        <h1 class="portfolio__top-title">edelRitter</h1>
        <socialNetworking />
      </div>
    </div>
    <video autoplay muted loop class="portfolio__top-video">
      <source src="@/assets/video/teamlab_video1.mp4" type="video/mp4">
    </video>
  </div>
</template>

<script>
import socialNetworking from '@/portfolio/ui/sns/index.vue'

export default {
  name: 'Top',
  components: {
    socialNetworking
  },
}
</script>

<style>
@import '@/portfolio/content_top/style.scss';
</style>
