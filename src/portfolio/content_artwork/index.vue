<template>
  <section class="portfolio-artwork">
    <div class="row no-gutters">
      <div class="col-12">
        <div class="portfolio-artwork__icon">
          <p class="portfolio-artwork__icon-text text-center m-0">illustration / photography works</p>
          <p class="portfolio-artwork__icon-img text-center m-0"><img src="@/assets/img/icons/arrow_icon.svg"></p>
        </div>
      </div>
      <div
        class="portfolio-artwork__title"
        data-aos="fade-right"
        data-aos-duration="1200"
        data-aos-delay="800"
        data-aos-easing="ease-in-out"
        data-aos-once="true"
        >
        <div class="portfolio-artwork__title-border">
          <h2 class="portfolio-artwork__title-text">SELECTED WORKS /</h2>
          <p class="portfolio-artwork__title-sub">arknights /</p>
          <p class="portfolio-artwork__title-sub">other illustrations /</p>
          <p class="portfolio-artwork__title-sub">photography /</p>
        </div>
      </div>
      <div class="col-12 col-md-4">
        <div class="portfolio-artwork__description">
          <p class="portfolio-artwork__description-text m-0">scroll down to see more /</p>
          <p class="portfolio-artwork__description-text m-0">+</p>
          <p class="portfolio-artwork__description-text m-0">swipe left / right to see more photography</p>
        </div>
      </div>
      <div class="col-12 col-md-8">
        <div class="portfolio-artwork__content">
          <masonry-wall
          :items="items"
          :column-width="400"
          :min-columns="2"
          :gap="12">
          <template #default="{ item, index }">
            <div
              data-aos="fade-up"
              data-aos-duration="1200"
              data-aos-delay="200"
              data-aos-easing="ease-in-out"
              data-aos-once="true"
              class="portfolio-artwork__content-item flex items-center justify-center"
            >
              <p class="portfolio-artwork__content-img"><img v-bind:src="item.image" class="w-100"></p>
              <p class="portfolio-artwork__content-text">
                <span class="portfolio-artwork__content-type">{{ item.type }}</span>
                <span class="portfolio-artwork__content-title">{{ item.title }}</span>
              </p>
            </div>
          </template>
        </masonry-wall>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import hibiscus from '@/assets/img/illustration/arknights_hibiscus.png';
import specter from '@/assets/img/illustration/arknights_specter.png';
import w from '@/assets/img/illustration/arknights_w.png';
import penance from '@/assets/img/illustration/arknights_penance.png';
import ajimu from '@/assets/img/illustration/arknights_ajimu.png';

export default {
  name: 'Artwork',
  setup() {
    const items = [
      {
        image: hibiscus,
        type: 'artwork',
        title: 'arknights / hibiscus',
      },
      {
        image: specter,
        type: 'artwork',
        title: 'arknights / specter',
      },
      {
        image: w,
        type: 'artwork',
        title: 'arknights / W',
      },
      {
        image: penance,
        type: 'artwork',
        title: 'arknights / penance',
      },
      {
        image: ajimu,
        type: 'artwork',
        title: 'arknights / angelina',
      },
    ]
    return { items }
  },
  data() {
    return {
      bg: 'dark',
    }
  },
}
</script>

<style>
@import '@/portfolio/content_artwork/style.scss';
</style>
