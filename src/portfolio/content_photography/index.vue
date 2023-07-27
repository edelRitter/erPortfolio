<template>
  <section class="portfolio-photography">
    <div class="portfolio-photography__wrapper">
      <swiper
        class="portfolio-photography__list"
        :slides-per-view="2"
        :space-between="12"
        @swiper="onSwiper"
        @slideChange="onSlideChange"
      >
        <swiper-slide
          v-for="(item, index) in items"
          :key="index">
          <p class="portfolio-photography__content m-0">
            <img
              class="portfolio-photography__content-img"
              :style="{ background: 'url(' + item.image + ')', backgroundSize: 'cover'}"
              :data-photography='item.id'
              @click="showModal">
          </p>
          <p class="portfolio-photography__content-text">
            <span class="portfolio-photography__content-type">{{ item.type }}</span>
            <span class="portfolio-photography__content-title">{{ item.title }}</span>
          </p>
        </swiper-slide>
      </swiper>
      <p class="portfolio-photography__notice m-0 d-block d-md-none">swipe left / right to see more photography</p>
    </div>
    <Transition
      name="modal-fade"
      :status="this.modalStatus"
      v-show="this.modalStatus !== ''">
      <Modal
        @modalOff="closeModal">
        <template v-slot:body>
          <div class="portfolio-modal__item">
            <p class="m-0">
              <img :src="modalImage" class="portfolio-modal__item-images">
            </p>
          </div> 
        </template>
      </Modal>
    </Transition> 
  </section>
</template>

<script>
// Import Swiper Vue.js components
import { ref } from 'vue'
import { Navigation, Pagination, Scrollbar } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue';

import Modal from '@/components/ui/modal/index.vue';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import teamLab1 from '@/assets/img/photography/teamlab_1.png';
import teamLab2 from '@/assets/img/photography/teamlab_2.png';
import teamLab3 from '@/assets/img/photography/teamlab_3.png';
import teamLab4 from '@/assets/img/photography/teamlab_4.jpg';
import teamLab5 from '@/assets/img/photography/teamlab_5.jpg';
import teamLab6 from '@/assets/img/photography/teamlab_6.jpg';

export default {
  name: 'Photography',
  components: {
    Modal,
    Swiper,
    SwiperSlide,
  },
  setup() {
    const modalStatus = ref('');
    const modalImage = ref('');
    const items = [
      {
        id: '1',
        image: teamLab1,
        type: 'photography',
        title: 'teamlab / exhibit',
      },
      {
        id: '2',
        image: teamLab2,
        type: 'photograph2',
        title: 'teamlab / exhibit',
      },
      {
        id: '3',
        image: teamLab3,
        type: 'photography',
        title: 'teamlab / exhibit',
      },
      {
        id: '4',
        image: teamLab4,
        type: 'photography',
        title: 'teamlab / exhibit',
      },
      {
        id: '5',
        image: teamLab5,
        type: 'photography',
        title: 'teamlab / exhibit',
      },
      {
        id: '6',
        image: teamLab6,
        type: 'photography',
        title: 'teamlab / exhibit',
      },
    ]

    const onSwiper = (swiper) => {
      console.log(swiper);
    };

    const onSlideChange = () => {
      console.log('slide change');
    };

    return {
      items,
      modalStatus,
      modalImage,
      onSwiper,
      onSlideChange,
      modules: [Navigation, Pagination, Scrollbar],
    }
  },
  methods: {
    showModal(event) {
      this.modalStatus = 'confirmation';
      const photoData = event.target.dataset.photography;
      const itemObject = this.items.filter(res => res.id.indexOf(photoData) !== -1);
      const itemPhoto = itemObject[0].image;
      
      return this.modalImage = itemPhoto;
    },
    closeModal() {
      this.modalStatus = '';
      this.modalImage = '';
    },
  },
}
</script>

<style>
@import '@/portfolio/content_photography/style.scss';
</style>
