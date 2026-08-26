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

      <!-- Description -->
      <div class="col-12 col-md-4">
        <div class="artwork__desc">
          <p class="artwork__desc-text m-0">{{ descriptionPrimary }}</p>
          <p class="artwork__desc-text m-0">{{ descriptionSeparator }}</p>
          <p class="artwork__desc-text m-0">{{ descriptionSecondary }}</p>
        </div>
      </div>

      <!-- Masonry Gallery -->
      <div class="col-12 col-md-8">
        <div class="artwork__content">
          <masonry-wall :items="items" :column-width="400" :min-columns="2" :gap="12">
            <template #default="{ item }">
              <div
                class="artwork__item flex items-center justify-center"
                data-aos="fade-up"
                data-aos-duration="1200"
                data-aos-delay="400"
                data-aos-easing="ease-out-cubic"
              >
                <p class="artwork__item-img">
                  <img
                    class="w-100"
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
            </template>
          </masonry-wall>
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
import { ref, computed } from 'vue';
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

// Data
const items = artworkJson;

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
