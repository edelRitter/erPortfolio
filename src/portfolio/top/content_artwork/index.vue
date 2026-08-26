<template>
  <section class="artwork">
    <!-- Scrolling Text Banner -->
    <div class="artwork__scroll">
      <div v-for="n in 2" :key="n" class="artwork__scroll-text">
        <span v-for="i in 4" :key="i">{{ scrollText }}&nbsp;</span>
      </div>
    </div>

    <!-- Title Section -->
    <div class="artwork__title">
      <div class="artwork__title-border">
        <h2 class="artwork__title-text">
          {{ titleText }}
          <span class="artwork__title-text--sub">{{ subtitleText }}</span>
        </h2>
      </div>
    </div>

    <!-- Content Grid -->
    <div class="row no-gutters">
      <!-- Category Icon -->
      <div class="col-12">
        <div class="artwork__icon">
          <p class="artwork__icon-text text-center m-0">{{ categoryText }}</p>
          <p class="artwork__icon-img text-center m-0">
            <img :src="resolvedArrowIconSrc" alt="Arrow icon" />
          </p>
        </div>
      </div>

      <!-- Horizontal Scroll Gallery -->
      <div class="col-12">
        <div ref="wrapperRef" class="artwork__wrapper">
          <div class="artwork__sticky">
            <div ref="trackRef" class="artwork__track" :style="trackStyle">
              <div
                v-for="item in items"
                :key="item.id"
                class="artwork__item"
              >
                <p class="artwork__item-img">
                  <img
                    :src="getImageUrl(item.image)"
                    :alt="item.title"
                    :data-artwork="item.id"
                    loading="lazy"
                    decoding="async"
                    @click="showModal"
                  />
                </p>
                <p class="artwork__item-text">
                  <span class="artwork__item-type">{{ item.type }}</span>
                  <span class="artwork__item-title">{{ item.title }}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Image Modal -->
    <Transition name="modal-fade">
      <Modal v-if="modalStatus" :status="modalStatus" @modal-off="closeModal">
        <template #body>
          <div class="modal__item">
            <img :src="modalImage" alt="Artwork preview" class="modal__item-img" />
          </div>
        </template>
      </Modal>
    </Transition>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import { useLenis } from 'lenis/vue';
import Modal from '@/components/ui/modal/modal.vue';
import artworkJson from './artwork_data.json';

// Props
const props = defineProps({
  scrollText: { type: String, default: 'SHOWCASE' },
  titleText: { type: String, default: 'showcase of all /' },
  subtitleText: { type: String, default: 'WORKS' },
  categoryText: { type: String, default: 'illustration / photography works' },
  arrowIconSrc: { type: String, default: null },
  descriptionPrimary: { type: String, default: 'scroll down to see more /' },
  descriptionSeparator: { type: String, default: '+' },
  descriptionSecondary: { type: String, default: 'swipe left / right to see more photography' },
});

// State
const modalStatus = ref('');
const modalImage = ref('');
const baseUrl = import.meta.env.BASE_URL;
const wrapperRef = ref(null);
const trackRef = ref(null);
const translateX = ref(0);
const isScrollLocked = ref(false);
const scrollProgress = ref(0); // 0 to 1

// Data
const items = artworkJson;

// Scroll sensitivity: higher = faster horizontal scroll per wheel delta
const scrollSensitivity = 1.5;

// Get lenis instance
const lenis = useLenis();

// Calculate max translate based on track width
const getMaxTranslate = () => {
  if (!trackRef.value) return 0;
  const trackWidth = trackRef.value.scrollWidth;
  const windowWidth = window.innerWidth;
  return Math.max(0, trackWidth - windowWidth + 40);
};

// Handle wheel event when scroll is locked
const handleWheel = (e) => {
  if (!isScrollLocked.value) return;
  
  e.preventDefault();
  
  const maxTranslate = getMaxTranslate();
  if (maxTranslate === 0) return;
  
  // Convert wheel delta to progress
  const delta = e.deltaY * scrollSensitivity;
  const progressDelta = delta / maxTranslate;
  
  scrollProgress.value = Math.max(0, Math.min(1, scrollProgress.value + progressDelta));
  translateX.value = -scrollProgress.value * maxTranslate;
  
  // Unlock scroll when reaching the end
  if (scrollProgress.value >= 1) {
    unlockScroll();
  } else if (scrollProgress.value <= 0) {
    unlockScroll();
  }
};

const lockScroll = () => {
  if (isScrollLocked.value) return;
  isScrollLocked.value = true;
  if (lenis.value) {
    lenis.value.stop();
  }
};

const unlockScroll = () => {
  if (!isScrollLocked.value) return;
  isScrollLocked.value = false;
  if (lenis.value) {
    lenis.value.start();
  }
};

// Check if artwork section should lock scroll
useLenis(() => {
  if (!wrapperRef.value || isScrollLocked.value) return;
  
  const wrapperRect = wrapperRef.value.getBoundingClientRect();
  const windowHeight = window.innerHeight;
  
  // Calculate center positions
  const wrapperCenter = wrapperRect.top + wrapperRect.height / 2;
  const viewportCenter = windowHeight / 2;
  
  // Lock scroll when artwork center reaches viewport center
  // (with small tolerance of 50px)
  const shouldLock = Math.abs(wrapperCenter - viewportCenter) < 50 &&
                     scrollProgress.value < 1;
  
  if (shouldLock) {
    lockScroll();
  }
});

onMounted(() => {
  window.addEventListener('wheel', handleWheel, { passive: false });
});

onUnmounted(() => {
  window.removeEventListener('wheel', handleWheel);
  if (isScrollLocked.value) {
    unlockScroll();
  }
});

const trackStyle = computed(() => ({
  transform: `translate3d(${translateX.value}px, 0, 0)`,
  willChange: 'transform'
}));

// Computed
const resolvedArrowIconSrc = computed(() => 
  props.arrowIconSrc || `${baseUrl}img/icons/arrow_icon.svg`
);

// Methods
const getImageUrl = (filename) => `${baseUrl}img/illustration/${filename}`;

const showModal = (event) => {
  const artworkId = event.target.dataset.artwork;
  const item = items.find((i) => i.id === artworkId);
  
  if (item) {
    modalStatus.value = 'confirmation';
    modalImage.value = getImageUrl(item.image);
  }
};

const closeModal = () => {
  modalStatus.value = '';
  modalImage.value = '';
};
</script>

<style>
@import './style.scss';
</style>
