<template>
  <section class="portfolio-showcase">
    <!-- Main Content -->
    <div class="portfolio-showcase__all">
      <!-- Scrolling Text Banner -->
      <div class="portfolio-showcase__all-scroll">
        <div v-for="n in 2" :key="n" class="portfolio-showcase__all-scroll-text">
          <span v-for="i in 4" :key="i">{{ scrollText }}&nbsp;</span>
        </div>
      </div>

      <!-- Title Section -->
      <div class="portfolio-showcase__all-title">
        <h2 class="portfolio-showcase__all-title-text">
          <p
            v-for="(line, index) in titleLines"
            :key="index"
            class="m-0"
            data-aos="fade-right"
            data-aos-duration="800"
            data-aos-offset="300"
            :data-aos-delay="200 + index * 200"
            data-aos-once="true"
            data-aos-easing="ease-out-cubic"
          >
            {{ line }}
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

      <!-- Call to Action -->
      <div class="portfolio-showcase__all-wrap">
        <div class="portfolio-showcase__all-link" @click="toggleShowcase">
          <p class="portfolio-showcase__all-text m-0">{{ linkText }}&nbsp;</p>
          <p
            class="portfolio-showcase__all-img mb-1"
            data-aos="fade"
            data-aos-duration="600"
            data-aos-delay="200"
            data-aos-easing="ease-out-cubic"
          >
            <img :src="resolvedCursorIconSrc" alt="Cursor icon" />
          </p>
        </div>
      </div>
    </div>

    <!-- Splash Overlay -->
    <div class="portfolio-showcase__splash" :class="{ 'is-active': isActive }">
      <div class="portfolio-showcase__splash-svg">
        <svg width="100%" height="100%">
          <rect width="100%" height="100%" />
        </svg>
      </div>
    </div>

    <!-- Showcase Content Panel -->
    <div class="portfolio-showcase__splash-contents" :class="{ 'is-active': isActive }">
      <div
        class="portfolio-showcase__splash-contents-close"
        :class="{ 'd-block': isActive }"
        @click="toggleShowcase"
      >
        <p class="portfolio-showcase__splash-contents-close-btn" />
      </div>
      <div class="portfolio-showcase__splash-contents-list">
        <ShowcaseItem />
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue';
import ShowcaseItem from '@/portfolio/top/content_showcase/slots/index.vue';

// Props
const props = defineProps({
  scrollText: { type: String, default: 'EXPLORE' },
  titleLine1: { type: String, default: 'IN /' },
  titleLine2: { type: String, default: 'DEPTH /' },
  titleLine3: { type: String, default: 'PROJECTS /' },
  descriptionText: { type: String, default: 'Click on the button below to learn more about works I have made before /' },
  linkText: { type: String, default: 'in depth / SELECTED WORKS' },
  cursorIconSrc: { type: String, default: null },
});

// State
const isActive = ref(false);
const baseUrl = import.meta.env.BASE_URL;

// Computed
const titleLines = computed(() => [props.titleLine1, props.titleLine2, props.titleLine3]);

const resolvedCursorIconSrc = computed(() => 
  props.cursorIconSrc || `${baseUrl}img/icons/cursor_icon.svg`
);

// Methods
const toggleShowcase = () => {
  document.body.classList.toggle('is-fixed');
  isActive.value = !isActive.value;
};
</script>

<style>
@import './style.scss';
</style>
