<template>
  <section class="photography">
    <!-- Swiper Gallery -->
    <div
      class="photography__wrapper"
      data-aos="fade-left"
      data-aos-duration="1200"
      data-aos-offset="200"
      data-aos-delay="400"
      data-aos-easing="ease-out-cubic"
    >
      <swiper
        class="photography__list"
        :slides-per-view="1.2"
        :space-between="20"
        :slides-offset-after="40"
        @swiper="onSwiper"
        @slide-change="onSlideChange"
      >
        <swiper-slide v-for="item in items" :key="item.id">
          <p class="photography__item m-0">
            <span
              class="photography__item-img"
              :style="{ backgroundImage: `url(${getImageUrl(item.image)})` }"
              :data-photography="item.id"
              @click="showModal"
            ></span>
          </p>
          <p class="photography__item-text">
            <span class="photography__item-type">{{ item.type }}</span>
            <span class="photography__item-title">{{ item.title }}</span>
          </p>
        </swiper-slide>
      </swiper>
    </div>

    <!-- Image Modal -->
    <Transition name="modal-fade">
      <Modal v-if="modalStatus" :status="modalStatus" @modal-off="closeModal">
        <template #body>
          <div class="modal__item">
            <img :src="modalImage" alt="Photography preview" class="modal__item-img" />
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
