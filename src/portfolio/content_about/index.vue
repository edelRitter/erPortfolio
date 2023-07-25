<template>
  <section class="portfolio__about">
    <div class="row no-gutters">
      <div class="col-12 col-md-8">
        <p class="m-0"><img class="w-100" src="@/assets/img/photography/stock_profile.jpg"></p>
        <div class="portfolio__about-title">
          <h2
            class="portfolio__about-title-text"
            data-aos="fade-right"
            data-aos-duration="1000"
            data-aos-delay="200"
            data-aos-easing="ease-in-out"
            data-aos-once="true">
            <span>CREATIVE /</span>
            <br><span>MAKES /</span>
            <br><span>WONDERS /</span>
          </h2>
        </div>
      </div>
      <div class="col-12 col-md-4">
        <div class="portfolio__about-profile">
          <div class="portfolio__about-profile-wrap">
            <p class="portfolio__about-profile-name m-0">
              edelRitter / Yohei Isshiki
            </p>
          </div>
          <div class="portfolio__about-profile-me m-0">
            <p class="portfolio__about-profile-me-desc">Hello, this is a portfolio website of Yohei Isshiki. I create website for Rakuten, from UI / pages / frameworks. I also draw characters of video games and post them on SNS. Avid lover of photography, film and music.</p>
            <p class="portfolio__about-profile-me-title m-0">LIKES /</p>
            <ul class="d-flex m-0 p-0">
              <li class="portfolio__about-profile-me-list"><strong>arknights :</strong> I Love arknights so much it deserves it's own category.</li>
              <li class="portfolio__about-profile-me-list"><b>music :</b> Eli Noir, M2U, hybrid, Siames, AJURIKA, Caravan Palace, nujabes, Masashi Hamauzu, Adam Gubman, Nomak, Starset, etc.</li>
            </ul>
            <ul class="d-flex m-0 p-0">
              <li class="portfolio__about-profile-me-list"><b>games :</b> Omori, Chrono Trigger, Saga Frontier 2, SF 3rd Strike, Cytus 2, Final Fantasy 6/7/9, Smash bros melee, Lord of Vermilion 2, etc.</li>
              <li class="portfolio__about-profile-me-list"><b>film :</b> Blade Runner, Truman Show, Punch Drunk Love, The Grand Budapest Hotel, The Godfather 1/2, The Matrix, Dunkirk, Parasite, Lawrence of Arabia, Memento, Birdman, etc.</li>
            </ul>
          </div>
          <div class="portfolio__about-profile-sns">
            <socialNetworking :class="this.alignment" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import socialNetworking from '@/portfolio/ui/sns/index.vue'

export default {
  name: 'About',
  components: {
    socialNetworking
  },
  props: {
    uiCatalogAlignment: {
      type: String,
      align: 'ui-catalog__sns-center',
    }
  },
  data() {
    return {
      alignment: 'ui-catalog__sns-center',
      bg: 'light',
    }
  },
}
</script>

<style>
@import '@/portfolio/content_about/style.scss';
</style>
