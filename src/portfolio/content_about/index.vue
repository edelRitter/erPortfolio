<template>
  <section class="portfolio-about">
    <div class="row no-gutters">
      <div class="col-12 col-md-8">
        <p class="m-0"><img class="w-100" src="@/assets/img/photography/stock_profile.jpg"></p>
        <div class="portfolio-about__title">
          <h2
            class="portfolio-about__title-text"
            data-aos="fade-right"
            data-aos-duration="1000"
            data-aos-delay="200"
            data-aos-easing="ease-in-out"
            data-aos-once="true">
            <span>CREATIVE /</span>
            <br><span>MAKES /</span>
            <br><span>WONDERS /</span>
          </h2>
          <p class="portfolio-about__title-desc">Hello, this is a portfolio website of Yohei. I create websites from UI / pages / frameworks. I also draw illustrations and post them on social media. Avid lover of photography, film and music.</p>
        </div>
      </div>
      <div class="col-12 col-md-4">
        <div class="portfolio-about__profile">
          <div class="portfolio-about__profile-wrap">
            <p class="portfolio-about__profile-name m-0">
              ABOUT
            </p>
          </div>
          <div class="portfolio-about__profile-me m-0">
            <p class="portfolio-about__profile-me-title m-0">USES /</p>
            <p class="portfolio-about__profile-me-list w-100 mb-4">adobe photoshop, vue 3 / vite, javascript, jQuery, HTML/CSS, SASS, Webpack, GIT / Github, JEST (other testing frameworks), esLint</p>
            <p class="portfolio-about__profile-me-title m-0">LIKES /</p>
            <ul class="d-flex m-0 p-0">
              <li class="portfolio-about__profile-me-list"><strong>arknights :</strong> I Love arknights so much it deserves it's own category.</li>
              <li class="portfolio-about__profile-me-list"><b>music :</b> Eli Noir, M2U, hybrid, Siames, AJURIKA, Caravan Palace, nujabes, Masashi Hamauzu, Adam Gubman, Nomak, Starset, etc.</li>
            </ul>
            <ul class="d-flex m-0 p-0">
              <li class="portfolio-about__profile-me-list"><b>games :</b> Omori, Chrono Trigger, Saga Frontier 2, SF 3rd Strike, Cytus 2, Final Fantasy 6/7/9, Smash bros melee, Lord of Vermilion 2, etc.</li>
              <li class="portfolio-about__profile-me-list"><b>film :</b> Blade Runner, Truman Show, Punch Drunk Love, The Grand Budapest Hotel, The Godfather 1/2, The Matrix, Dunkirk, Parasite, Lawrence of Arabia, Memento, Birdman, etc.</li>
            </ul>
          </div>
          <div class="portfolio-about__profile-sns">
            <socialNetworking :class="this.alignment" />
          </div>
          <p class="portfolio-about__profile-me-logo">
            <img class="portfolio-about__profile-me-logoimg" src="@/assets/img/illustration/logo_edelRitter.png">
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import socialNetworking from '@/components/ui/sns/index.vue'

export default {
  name: 'About',
  components: {
    socialNetworking
  },
  data() {
    return {
      alignment: 'ui-catalog__sns-center',
    }
  },
}
</script>

<style>
@import '@/portfolio/content_about/style.scss';
</style>
