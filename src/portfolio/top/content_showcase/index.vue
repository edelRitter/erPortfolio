<template>
  <section class="portfolio-showcase">
    <div class="portfolio-showcase__all">
      <div class="portfolio-showcase__content-wrap">
        <div class="portfolio-showcase__content-main" @click="toggleShowcase">
          <p class="portfolio-showcase__content-txt m-0">ALL WORKS /&nbsp;</p>
          <p
            class="portfolio-showcase__content-img m-0"
            data-aos="fade"
            data-aos-duration="600"
            data-aos-offset="200"
            data-aos-delay="400"
            data-aos-easing="ease-out-cubic">
            <img class="w-100" src="@/assets/img/icons/cursor_icon.svg">
          </p>
        </div>
      </div>
    </div>
    <div 
      class="portfolio-showcase__splash"
      :class="{'is-active': isActive}">
      <div class="portfolio-showcase__splash-svg">
        <svg width="100%" height="100%">
          <rect width="100%" height="100%" ></rect>
        </svg>
      </div>
    </div>
    <div
      class="portfolio-showcase__splash-contents"
      :class="{'is-active': isActive}">
      <div 
        class="portfolio-showcase__splash-contents-close"
        @click="toggleShowcase">test
      </div>

    </div>
  </section>
</template>

<script>
export default {
  name: 'showcase',
  data: () => {
    return {
      isActive: false,
      mock: false,
    }
  },
  methods: {
    toggleShowcase () {
      document.body.classList.toggle('is-fixed');
      this.isActive = !this.isActive
    },
  },
}
</script>

<style>
@import './style.scss';
</style>
