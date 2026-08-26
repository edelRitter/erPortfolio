<template>
  <section class="portfolio-showcase">
    <div class="portfolio-showcase__all">
      <div class="portfolio-showcase__all-scroll">
        <div class="portfolio-showcase__all-scroll-text">
          <span>{{ scrollText }}&nbsp;</span>
          <span>{{ scrollText }}&nbsp;</span>
          <span>{{ scrollText }}&nbsp;</span>
          <span>{{ scrollText }}&nbsp;</span>
        </div>
        <div class="portfolio-showcase__all-scroll-text">
          <span>{{ scrollText }}&nbsp;</span>
          <span>{{ scrollText }}&nbsp;</span>
          <span>{{ scrollText }}&nbsp;</span>
          <span>{{ scrollText }}&nbsp;</span>
        </div>
      </div>
      <div class="portfolio-showcase__all-title">
        <h2 class="portfolio-showcase__all-title-text">
          <p
            class="m-0"
            data-aos="fade-right"
            data-aos-duration="800"
            data-aos-offset="300"
            data-aos-delay="200"
            data-aos-once="true"
            data-aos-easing="ease-out-cubic"
          >
            {{ titleLine1 }}
          </p>
          <p
            class="m-0"
            data-aos="fade-right"
            data-aos-duration="800"
            data-aos-offset="300"
            data-aos-delay="400"
            data-aos-once="true"
            data-aos-easing="ease-out-cubic"
          >
            {{ titleLine2 }}
          </p>
          <p
            class="m-0"
            data-aos="fade-right"
            data-aos-duration="800"
            data-aos-offset="300"
            data-aos-delay="600"
            data-aos-once="true"
            data-aos-easing="ease-out-cubic"
          >
            {{ titleLine3 }}
          </p>
        </h2>
        <p
          class="portfolio-showcase__all-title-desc"
          data-aos="fade-up"
          data-aos-duration="800"
          data-aos-delay="800"
          data-aos-once="true"
          data-aos-easing="ease-out-cubic"
        >
        {{ descriptionText }}
        </p>
      </div>
      <div class="portfolio-showcase__all-wrap">
        <div class="portfolio-showcase__all-link" @click="toggleShowcase">
          <p class="portfolio-showcase__all-text m-0">
            {{ linkText }}&nbsp;
          </p>
          <p
            class="portfolio-showcase__all-img mb-1"
            data-aos="fade"
            data-aos-duration="600"
            data-aos-delay="200"
            data-aos-easing="ease-out-cubic"
          >
            <img :src="resolvedCursorIconSrc" />
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
  props: {
    scrollText: {
      type: String,
      default: 'EXPLORE',
    },
    titleLine1: {
      type: String,
      default: 'IN /',
    },
    titleLine2: {
      type: String,
      default: 'DEPTH /',
    },
    titleLine3: {
      type: String,
      default: 'PROJECTS /',
    },
    descriptionText: {
      type: String,
      default: 'Click on the button below to learn more about works I have made before /',
    },
    linkText: {
      type: String,
      default: 'in depth / SELECTED WORKS',
    },
    cursorIconSrc: {
      type: String,
      default: null,
    },
  },
  data: () => {
    return {
      isActive: false,
      baseUrl: import.meta.env.BASE_URL,
    };
  },
  computed: {
    resolvedCursorIconSrc() {
      return this.cursorIconSrc || `${this.baseUrl}img/icons/cursor_icon.svg`;
    },
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
