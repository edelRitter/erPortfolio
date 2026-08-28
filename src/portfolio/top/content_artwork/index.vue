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
                    :src="getImageUrl(item.thumb)"
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
  descriptionPrimary: { type: String, default: 'scroll down to see more /' },
  descriptionSeparator: { type: String, default: '+' },
  descriptionSecondary: { type: String, default: 'swipe left / right to see more photography' },
});

// ===========================================
// Lenis-style smooth scroll configuration
// ===========================================
const smoothConfig = {
  lerp: 0.1,                    // Linear interpolation (0-1, lower = smoother)
  wheelMultiplier: 1.5,         // Wheel sensitivity
  touchMultiplier: 2,           // Touch sensitivity
  syncTouchLerp: 0.075,         // Lerp for touch inertia
  touchInertiaExponent: 1.7,    // Inertia decay strength (higher = longer coast)
  touchInertiaMultiplier: 35,   // Initial velocity multiplier for momentum
};

// State
const modalStatus = ref('');
const modalImage = ref('');
const baseUrl = import.meta.env.BASE_URL;
const wrapperRef = ref(null);
const trackRef = ref(null);
const isScrollLocked = ref(false);
const scrollDirection = ref('down');
const lastScrollY = ref(0);
const hasExitedSection = ref(true);
const justUnlocked = ref(false);

// Smooth scroll state
const targetScroll = ref(0);      // Target position (where we want to scroll to)
const currentScroll = ref(0);     // Current animated position
const velocity = ref(0);          // Current velocity for momentum
let animationFrameId = null;

// Touch tracking for momentum
let touchStartY = 0;
let touchStartTime = 0;
let lastTouchY = 0;
let lastTouchTime = 0;
let touchVelocity = 0;
let isTouching = false;

// Data
const items = artworkJson;

// Get lenis instance
const lenis = useLenis();

// Calculate max translate based on track width
const getMaxTranslate = () => {
  if (!trackRef.value) return 0;
  const trackWidth = trackRef.value.scrollWidth;
  const windowWidth = window.innerWidth;
  return Math.max(0, trackWidth - windowWidth + 40);
};

// Scroll progress (0 to 1)
const scrollProgress = computed(() => {
  const max = getMaxTranslate();
  return max > 0 ? Math.abs(currentScroll.value) / max : 0;
});

// Clamp scroll within bounds
const clampScroll = (value) => {
  const max = getMaxTranslate();
  return Math.max(-max, Math.min(0, value));
};

// Animation loop for smooth scrolling (Lenis-style lerp)
const animate = () => {
  if (!isScrollLocked.value && !isTouching && Math.abs(velocity.value) < 0.01) {
    animationFrameId = null;
    return;
  }
  
  // Apply momentum when not touching
  if (!isTouching && Math.abs(velocity.value) > 0.01) {
    targetScroll.value = clampScroll(targetScroll.value + velocity.value);
    // Decay velocity (exponential decay like Lenis touchInertiaExponent)
    velocity.value *= Math.pow(0.95, smoothConfig.touchInertiaExponent);
  }
  
  // Lerp current toward target
  const diff = targetScroll.value - currentScroll.value;
  const lerpValue = isTouching ? smoothConfig.syncTouchLerp : smoothConfig.lerp;
  
  if (Math.abs(diff) > 0.1) {
    currentScroll.value += diff * lerpValue;
  } else {
    currentScroll.value = targetScroll.value;
  }
  
  // Check unlock conditions
  const progress = scrollProgress.value;
  if (progress >= 0.98 && velocity.value < -0.1) {
    unlockScroll();
    return;
  } else if (progress <= 0.02 && velocity.value > 0.1) {
    unlockScroll();
    return;
  }
  
  animationFrameId = requestAnimationFrame(animate);
};

const startAnimation = () => {
  if (!animationFrameId) {
    animationFrameId = requestAnimationFrame(animate);
  }
};

const stopAnimation = () => {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  }
};

// Handle wheel event
const handleWheel = (e) => {
  if (!isScrollLocked.value) return;
  
  e.preventDefault();
  
  const delta = e.deltaY * smoothConfig.wheelMultiplier;
  targetScroll.value = clampScroll(targetScroll.value - delta);
  velocity.value = 0; // Stop momentum on wheel
  
  startAnimation();
  
  // Check for unlock at edges
  const progress = scrollProgress.value;
  if (progress >= 0.98 && e.deltaY > 0) {
    unlockScroll();
  } else if (progress <= 0.02 && e.deltaY < 0) {
    unlockScroll();
  }
};

// Touch handlers with momentum
const handleTouchStart = (e) => {
  if (!isScrollLocked.value) return;
  
  isTouching = true;
  velocity.value = 0;
  
  const touch = e.touches[0];
  touchStartY = touch.clientY;
  touchStartTime = performance.now();
  lastTouchY = touch.clientY;
  lastTouchTime = touchStartTime;
  touchVelocity = 0;
  
  startAnimation();
};

const handleTouchMove = (e) => {
  if (!isScrollLocked.value || !isTouching) return;
  
  e.preventDefault();
  
  const touch = e.touches[0];
  const currentTime = performance.now();
  const deltaY = lastTouchY - touch.clientY;
  const deltaTime = currentTime - lastTouchTime;
  
  // Calculate velocity (pixels per ms)
  if (deltaTime > 0) {
    touchVelocity = deltaY / deltaTime;
  }
  
  // Apply touch movement directly to target
  const delta = deltaY * smoothConfig.touchMultiplier;
  targetScroll.value = clampScroll(targetScroll.value - delta);
  
  lastTouchY = touch.clientY;
  lastTouchTime = currentTime;
};

const handleTouchEnd = () => {
  if (!isScrollLocked.value) return;
  
  isTouching = false;
  
  // Apply momentum based on touch velocity
  velocity.value = -touchVelocity * smoothConfig.touchInertiaMultiplier;
  
  startAnimation();
};

const lockScroll = () => {
  if (isScrollLocked.value) return;
  isScrollLocked.value = true;
  
  if (lenis.value) {
    lenis.value.stop();
  }
  
  startAnimation();
  document.body.style.overflow = 'hidden';
};

const unlockScroll = () => {
  if (!isScrollLocked.value) return;
  isScrollLocked.value = false;
  justUnlocked.value = true;
  velocity.value = 0;
  
  stopAnimation();
  
  if (lenis.value) {
    lenis.value.start();
  }
  document.body.style.overflow = '';
  
  setTimeout(() => {
    justUnlocked.value = false;
  }, 100);
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
      targetScroll.value = -maxTranslate;
      currentScroll.value = -maxTranslate;
    } else {
      // Coming from above - start at beginning (first artwork)
      targetScroll.value = 0;
      currentScroll.value = 0;
    }
  }
  
  if (isScrollLocked.value || justUnlocked.value) return;
  
  // Calculate center positions
  const wrapperCenter = wrapperRect.top + wrapperRect.height / 2;
  const viewportCenter = windowHeight / 2;
  
  // Lock scroll when artwork center reaches viewport center
  const isNearCenter = Math.abs(wrapperCenter - viewportCenter) < 50;
  
  if (isNearCenter) {
    // Lock if we haven't completed the scroll in the current direction (matching unlock thresholds)
    const progress = scrollProgress.value;
    if (scrollDirection.value === 'down' && progress < 0.98) {
      lockScroll();
    } else if (scrollDirection.value === 'up' && progress > 0.02) {
      lockScroll();
    }
  }
});

onMounted(() => {
  window.addEventListener('wheel', handleWheel, { passive: false });
  window.addEventListener('touchstart', handleTouchStart, { passive: true });
  window.addEventListener('touchmove', handleTouchMove, { passive: false });
  window.addEventListener('touchend', handleTouchEnd, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener('wheel', handleWheel);
  window.removeEventListener('touchstart', handleTouchStart);
  window.removeEventListener('touchmove', handleTouchMove);
  window.removeEventListener('touchend', handleTouchEnd);
  
  stopAnimation();
  
  if (isScrollLocked.value) {
    unlockScroll();
  }
});

const trackStyle = computed(() => ({
  transform: `translate3d(${currentScroll.value}px, 0, 0)`,
  willChange: 'transform'
}));

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
