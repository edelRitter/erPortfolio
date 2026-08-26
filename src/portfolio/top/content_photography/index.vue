<template>
  <section class="portfolio-photography">
    <!-- Swiper Gallery -->
    <div
      class="portfolio-photography__wrapper"
      data-aos="fade-left"
      data-aos-duration="1200"
      data-aos-offset="200"
      data-aos-delay="400"
      data-aos-easing="ease-out-cubic"
    >
      <swiper
        class="portfolio-photography__list"
        :slides-per-view="2"
        :space-between="12"
        @swiper="onSwiper"
        @slide-change="onSlideChange"
      >
        <swiper-slide v-for="item in items" :key="item.id">
          <p class="portfolio-photography__content m-0">
            <img
              class="portfolio-photography__content-img"
              :style="{ background: `url(${getImageUrl(item.image)})`, backgroundSize: 'cover' }"
              :alt="item.title"
              :data-photography="item.id"
              loading="lazy"
              decoding="async"
              @click="showModal"
            />
          </p>
          <p class="portfolio-photography__content-text">
            <span class="portfolio-photography__content-type">{{ item.type }}</span>
            <span class="portfolio-photography__content-title">{{ item.title }}</span>
          </p>
        </swiper-slide>
      </swiper>

      <p class="portfolio-photography__notice m-0 d-block d-md-none">
        swipe left / right to see more photography
      </p>
    </div>

    <!-- Image Modal -->
    <Transition name="modal-fade">
      <Modal v-if="modalStatus" :status="modalStatus" @modal-off="closeModal">
        <template #body>
          <div class="portfolio-modal__item">
            <img :src="modalImage" alt="Photography preview" class="portfolio-modal__item-images" />
          </div>
        </template>
      </Modal>
    </Transition>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import Modal from '@/components/ui/modal/modal.vue';
import photoJson from './photography_data.json';

// Swiper styles
import 'swiper/css';

// State
const modalStatus = ref('');
const modalImage = ref('');
const baseUrl = import.meta.env.BASE_URL;

// Data
const items = photoJson;

// Methods
const getImageUrl = (filename) => `${baseUrl}img/photography/${filename}`;

const onSwiper = (swiper) => {
  // Swiper instance ready
};

const onSlideChange = () => {
  // Slide changed
};

const showModal = (event) => {
  const photoId = event.target.dataset.photography;
  const item = items.find((i) => i.id === photoId);

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
