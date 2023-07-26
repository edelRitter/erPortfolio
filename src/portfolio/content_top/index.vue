<template>
  <section class="portfolio-top">
    <div class="portfolio-top__hero m-0">
      <div class="portfolio-top__wrapper">
        <span
          class="portfolio-top__subtitle"
          data-aos="zoom-in"
          data-aos-duration="1200"
          data-aos-delay="200"
          data-aos-easing="ease-in-out"
          data-aos-once="true">
          DESIGNER /
        </span>
        <br>
        <span
          class="portfolio-top__subtitle"
          data-aos="zoom-in"
          data-aos-duration="1200"
          data-aos-delay="500"
          data-aos-easing="ease-in-out"
          data-aos-once="true">
          DEVELOPER /
        </span>
        <br>
        <span
          class="portfolio-top__subtitle"
          data-aos="zoom-in"
          data-aos-duration="1200"
          data-aos-delay="800"
          data-aos-easing="ease-in-out"
          data-aos-once="true">
          ILLUSTRATOR /
        </span>
        <p class="portfolio-top__text m-0">-</p>
        <p class="portfolio-top__text m-0">porfolio website created by</p>
        <p class="portfolio-top__text m-0">-</p>
        <h1 class="portfolio-top__title">edelRitter</h1>
        <socialNetworking :class="this.alignment" />
      </div>
    </div>
    <video playsinline autoplay muted loop class="portfolio-top__video">
      <source src="@/assets/video/teamlab_video1.mp4" type="video/mp4">
    </video>
  </section>
</template>

<script>
import socialNetworking from '@/components/ui/sns/index.vue'

export default {
  name: 'Top',
  components: {
    socialNetworking
  },
  props: {
    uiCatalogAlignment: {
      type: String,
      align: 'ui-catalog__sns-right',
    }
  },
  data() {
    return {
      alignment: 'ui-catalog__sns-right',
      bg: 'dark',
    }
  },
}
</script>

<style>
@import '@/portfolio/content_top/style.scss';
</style>
