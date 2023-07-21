<template>
  <div class="portfolio__top">
    <div class="portfolio__top-hero m-0">
      <div class="portfolio__top-wrapper">
        <h1 class="portfolio__top-title m-0">edelRitter</h1>
        <span class="portfolio__top-subtitle">designer / developer / illustrator</span>
        <div class="portfolio__top-sns">
          <p></p>
        </div>
      </div>
    </div>
    <video autoplay muted loop class="portfolio__top-video">
      <source src="@/assets/video/teamlab_video1.mp4" type="video/mp4">
    </video>
  </div>
</template>

<script>
export default {
  name: 'Top',
}
</script>

<style>
@import '@/portfolio/top/style.scss';
</style>
