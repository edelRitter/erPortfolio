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
            <img class="portfolio-photography__content-img" v-bind:style="{ background: 'url(' + item.image + ')', backgroundSize: 'cover'}">
          </p>
          <p class="portfolio-photography__content-text">
            <span class="portfolio-photography__content-type">{{ item.type }}</span>
            <span class="portfolio-photography__content-title">{{ item.title }}</span>
          </p>
        </swiper-slide>
      </swiper>
    </div>
  </section>
</template>

<script>
// Import Swiper Vue.js components
import { Navigation, Pagination, Scrollbar } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import teamLab1 from '@/assets/img/photography/teamlab_1.png';
import teamLab2 from '@/assets/img/photography/teamlab_2.png';
import teamLab3 from '@/assets/img/photography/teamlab_3.png';
import teamLab4 from '@/assets/img/photography/teamlab_3.png';
import teamLab5 from '@/assets/img/photography/teamlab_3.png';


export default {
  name: 'Photography',
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    const onSwiper = (swiper) => {
      console.log(swiper);
    };
    const onSlideChange = () => {
      console.log('slide change');
    };
    const items = [
      {
        image: teamLab1,
        type: 'photography',
        title: 'teamlab / exhibit',
      },
      {
        image: teamLab2,
        type: 'photography',
        title: 'teamlab / exhibit',
      },
      {
        image: teamLab3,
        type: 'photography',
        title: 'teamlab / exhibit',
      },
      {
        image: teamLab4,
        type: 'photography',
        title: 'teamlab / exhibit',
      },
      {
        image: teamLab5,
        type: 'photography',
        title: 'teamlab / exhibit',
      },
    ]
    return { 
      items,
      onSwiper,
      onSlideChange,
      modules: [Navigation, Pagination, Scrollbar],
    }
  },
}
</script>

<style>
@import '@/portfolio/content_photography/style.scss';
</style>
