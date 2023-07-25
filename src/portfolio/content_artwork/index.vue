<template>
  <section class="portfolio__artwork" :bg="dark">
    <div class="row no-gutters">
      <div class="col-12">
        <div class="portfolio__artwork-icon">
          <p class="portfolio__artwork-icon-text text-center m-0">illustration / photography works</p>
          <p class="portfolio__artwork-icon-img text-center m-0"><img src="@/assets/img/icons/arrow_icon.svg"></p>
        </div>
      </div>
      <div
        class="portfolio__artwork-title"
        data-aos="fade-right"
        data-aos-duration="1200"
        data-aos-delay="800"
        data-aos-easing="ease-in-out"
        data-aos-once="true"
        >
        <div class="portfolio__artwork-title-border">
          <h2 class="portfolio__artwork-title-text">SELECTED WORKS /</h2>
          <p class="portfolio__artwork-title-sub">arknights /</p>
          <p class="portfolio__artwork-title-sub">other illustrations /</p>
          <p class="portfolio__artwork-title-sub">photography /</p>
        </div>
      </div>
      <div class="col-12 col-md-4">
        <div class="portfolio__artwork-description">
          <p class="portfolio__artwork-description-text m-0">scroll down to see more /</p>
          <p class="portfolio__artwork-description-text m-0">+</p>
          <p class="portfolio__artwork-description-text m-0">photoshop / illustrator / iphone 12 for photography</p>
        </div>
      </div>
      <div class="col-12 col-md-8">
        <div class="portfolio__artwork-content">
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
              class="portfolio__artwork-content-item flex items-center justify-center"
            >
              <p class="portfolio__artwork-content-img"><img v-bind:src="item.image" class="w-100"></p>
              <p class="portfolio__artwork-content-text">
                <span class="portfolio__artwork-content-type">{{ item.type }}</span>
                <span class="portfolio__artwork-content-title">{{ item.title }}</span>
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
import hibiscus from '@/assets/img/illustration/arknights_hibiscus.jpg';
import specter from '@/assets/img/illustration/arknights_specter.jpg';

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
