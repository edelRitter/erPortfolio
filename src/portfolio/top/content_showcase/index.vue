<template>
  <section class="portfolio-showcase">
    <div class="portfolio-showcase__all">
      <div class="portfolio-showcase__all-scroll">
        <div class="portfolio-showcase__all-scroll-text">
          <span>EXPLORE&nbsp;</span>
          <span>EXPLORE&nbsp;</span>
          <span>EXPLORE&nbsp;</span>
          <span>EXPLORE&nbsp;</span>
        </div>
        <div class="portfolio-showcase__all-scroll-text">
          <span>EXPLORE&nbsp;</span>
          <span>EXPLORE&nbsp;</span>
          <span>EXPLORE&nbsp;</span>
          <span>EXPLORE&nbsp;</span>
        </div>
      </div>
      <div class="portfolio-showcase__all-wrap">
        <div class="portfolio-showcase__all-main" @click="toggleShowcase">
          <p class="portfolio-showcase__all-text m-0">
            in depth / SELECTED WORKS&nbsp;
          </p>
          <p
            class="portfolio-showcase__all-img mb-1"
            data-aos="fade"
            data-aos-duration="600"
            data-aos-delay="200"
            data-aos-easing="ease-out-cubic"
          >
            <img class="w-100" src="/img/icons/cursor_icon.svg" />
          </p>
        </div>
      </div>
    </div>
    <div class="portfolio-showcase__splash" :class="{ 'is-active': isActive }">
      <div class="portfolio-showcase__splash-svg">
        <svg width="100%" height="100%">
          <rect width="100%" height="100%"></rect>
        </svg>
      </div>
    </div>
    <div
      class="portfolio-showcase__splash-contents"
      :class="{ 'is-active': isActive }"
    >
      <div
        class="portfolio-showcase__splash-contents-close"
        :class="{ 'd-block': isActive }"
        @click="toggleShowcase"
      >
        <p class="portfolio-showcase__splash-contents-close-btn"></p>
      </div>
      <div class="portfolio-showcase__splash-contents-list">
        <showcaseItem />
      </div>
    </div>
  </section>
</template>

<script>
import showcaseItem from '@/portfolio/top/content_showcase/slots/index.vue';

export default {
  name: 'showcase',
  components: {
    showcaseItem,
  },
  data: () => {
    return {
      isActive: false,
    };
  },
  methods: {
    toggleShowcase() {
      document.body.classList.toggle('is-fixed');
      this.isActive = !this.isActive;
    },
  },
};
</script>

<style>
@import './style.scss';
</style>
