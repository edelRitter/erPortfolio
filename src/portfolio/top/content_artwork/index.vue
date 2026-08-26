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
                @click.stop="showModal(item)"
              >
                <p class="artwork__item-img">
                  <img
                    :src="getImageUrl(item.image)"
                    :alt="item.title"
                    loading="lazy"
                    decoding="async"
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
    <Teleport to="body">
      <Modal v-if="modalStatus" :status="modalStatus" @modal-off="closeModal">
        <template #body>
          <div class="er-modal__item">
            <img :src="modalImage" alt="Artwork preview" class="er-modal__item-img" />
          </div>
        </template>
      </Modal>
    </Teleport>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
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
const scrollDirection = ref('down'); // 'down' or 'up'
const lastScrollY = ref(0);
const hasExitedSection = ref(true); // Track if we've left the section

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
  
  // Unlock scroll when reaching the appropriate end based on direction
  if (scrollProgress.value >= 1 && delta > 0) {
    // Scrolling down and reached end
    unlockScroll();
  } else if (scrollProgress.value <= 0 && delta < 0) {
    // Scrolling up and reached beginning
    unlockScroll();
  }
};

// Touch event handling for mobile
let touchStartY = 0;
let touchStartX = 0;

const handleTouchStart = (e) => {
  // Always record touch start position
  touchStartY = e.touches[0].clientY;
  touchStartX = e.touches[0].clientX;
};

const handleTouchMove = (e) => {
  if (!isScrollLocked.value) return;
  
  const touchCurrentY = e.touches[0].clientY;
  const touchCurrentX = e.touches[0].clientX;
  const deltaY = touchStartY - touchCurrentY;
  const deltaX = touchStartX - touchCurrentX;
  
  // Only prevent default for scrolling gestures, not taps
  const isScrollGesture = Math.abs(deltaY) > 10 || Math.abs(deltaX) > 10;
  if (!isScrollGesture) return;
  
  // Prevent default to stop native scroll when locked
  e.preventDefault();
  
  const maxTranslate = getMaxTranslate();
  if (maxTranslate === 0) return;
  
  // Convert touch delta to progress (multiply by sensitivity factor for touch)
  const touchSensitivity = scrollSensitivity * 2;
  const progressDelta = (deltaY * touchSensitivity) / maxTranslate;
  
  scrollProgress.value = Math.max(0, Math.min(1, scrollProgress.value + progressDelta));
  translateX.value = -scrollProgress.value * maxTranslate;
  
  // Update touch start for continuous movement
  touchStartY = touchCurrentY;
  touchStartX = touchCurrentX;
  
  // Unlock scroll when reaching the appropriate end based on swipe direction
  if (scrollProgress.value >= 1 && deltaY > 0) {
    // Swiping up (scrolling down) and reached end
    unlockScroll();
  } else if (scrollProgress.value <= 0 && deltaY < 0) {
    // Swiping down (scrolling up) and reached beginning
    unlockScroll();
  }
};

const lockScroll = () => {
  if (isScrollLocked.value) return;
  isScrollLocked.value = true;
  if (lenis.value) {
    lenis.value.stop();
  }
  // Prevent native scroll on mobile but allow clicks
  document.body.style.overflow = 'hidden';
};

const unlockScroll = () => {
  if (!isScrollLocked.value) return;
  isScrollLocked.value = false;
  if (lenis.value) {
    lenis.value.start();
  }
  // Restore native scroll
  document.body.style.overflow = '';
};

// Check if artwork section should lock scroll
useLenis((lenisInstance) => {
  if (!wrapperRef.value) return;
  
  // Track scroll direction
  const currentScrollY = lenisInstance.scroll;
  if (currentScrollY > lastScrollY.value) {
    scrollDirection.value = 'down';
  } else if (currentScrollY < lastScrollY.value) {
    scrollDirection.value = 'up';
  }
  lastScrollY.value = currentScrollY;
  
  const wrapperRect = wrapperRef.value.getBoundingClientRect();
  const windowHeight = window.innerHeight;
  const maxTranslate = getMaxTranslate();
  
  // Check if section is visible in viewport
  const isVisible = wrapperRect.bottom > 0 && wrapperRect.top < windowHeight;
  
  // Track when we exit the section
  if (!isVisible) {
    if (!hasExitedSection.value) {
      hasExitedSection.value = true;
    }
    return;
  }
  
  // On re-entry to section, set starting position based on direction
  if (hasExitedSection.value && isVisible) {
    hasExitedSection.value = false;
    
    if (scrollDirection.value === 'up') {
      // Coming from below - start at the end (last artwork)
      scrollProgress.value = 1;
      translateX.value = -maxTranslate;
    } else {
      // Coming from above - start at beginning (first artwork)
      scrollProgress.value = 0;
      translateX.value = 0;
    }
  }
  
  if (isScrollLocked.value) return;
  
  // Calculate center positions
  const wrapperCenter = wrapperRect.top + wrapperRect.height / 2;
  const viewportCenter = windowHeight / 2;
  
  // Lock scroll when artwork center reaches viewport center
  const isNearCenter = Math.abs(wrapperCenter - viewportCenter) < 50;
  
  if (isNearCenter) {
    // Lock if we haven't completed the scroll in the current direction
    if (scrollDirection.value === 'down' && scrollProgress.value < 1) {
      lockScroll();
    } else if (scrollDirection.value === 'up' && scrollProgress.value > 0) {
      lockScroll();
    }
  }
});

onMounted(() => {
  window.addEventListener('wheel', handleWheel, { passive: false });
  window.addEventListener('touchstart', handleTouchStart, { passive: true });
  window.addEventListener('touchmove', handleTouchMove, { passive: false });
});

onUnmounted(() => {
  window.removeEventListener('wheel', handleWheel);
  window.removeEventListener('touchstart', handleTouchStart);
  window.removeEventListener('touchmove', handleTouchMove);
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

const showModal = (item) => {
  modalStatus.value = 'confirmation';
  modalImage.value = getImageUrl(item.image);
};

const closeModal = () => {
  modalStatus.value = '';
  modalImage.value = '';
};
</script>

<style>
@import './style.scss';
</style>
