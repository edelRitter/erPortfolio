<template>
  <section class="portfolio-showcase">
    <div class="portfolio-showcase__all">
      <div class="row no-gutters">
        <div class="col-12 col-md-6 portfolio-showcase__all-left">
          <div class="portfolio-showcase__all-left-container">
            <p class="m-0">EDELRITTER</p>
          </div>
        </div>
        <div
          class="col-12 col-md-6 portfolio-showcase__all-right"
          @click="toggleShowcase">
          <p class="m-0">SEE ALL /</p>
          <p class="m-0">ARTWORKS /</p>
        </div>
      </div>
    </div>
    <div 
      class="portfolio-showcase__splash"
      :class="{'is-active': isActive}">
      <div class="portfolio-showcase__splash-svg">
        <svg width="100%" height="100%">
          <rect width="100%" height="100%" ></rect>
        </svg>
      </div>
    </div>
    <div
      class="portfolio-showcase__splash-contents"
      :class="{'is-active': isActive}">
      <div 
        class="portfolio-showcase__splash-contents-close"
        @click="toggleShowcase">test
      </div>
      <div
        data-aos="fade-up"
        data-aos-duration="800"
        data-aos-delay="800"
        data-aos-easing="ease-out-cubic">
        <p class="m-0"><img class="w-100" src="https://sell.car.rakuten.co.jp/assets/img/top/img_choose-reason02.jpg"></p>
      </div>
      <div
        data-aos="fade-up"
        data-aos-duration="800"
        data-aos-delay="800"
        data-aos-easing="ease-out-cubic">
        <p class="m-0"><img class="w-100" src="https://sell.car.rakuten.co.jp/assets/img/top/img_choose-reason02.jpg"></p>
      </div>
      <div
        data-aos="fade-up"
        data-aos-duration="800"
        data-aos-delay="800"
        data-aos-easing="ease-out-cubic">
        <p class="m-0"><img class="w-100" src="https://sell.car.rakuten.co.jp/assets/img/top/img_choose-reason02.jpg"></p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'showcase',
  data: () => {
    return {
      isActive: false,
      mock: false,
    }
  },
  methods: {
    toggleShowcase () {
      document.body.classList.toggle('is-fixed');
      this.isActive = !this.isActive
    },
  },
}
</script>

<style>
@import './style.scss';
</style>
