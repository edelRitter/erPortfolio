<template>
  <section class="portfolio-about">
    <div class="row no-gutters">
      <div class="col-12">
        <div class="portfolio-about__hero m-0">
          <p class="portfolio-about__hero-img">
            <img class="w-100" src="/public/img/photography/stock_profile.jpg">
          </p>
        </div>
      </div>
      <div class="col-12 col-md-6">
        <div class="portfolio-about__title">
          <h2 class="portfolio-about__title-text">
            <p
              class="m-0"
              data-aos="fade-right"
              data-aos-duration="800"
              data-aos-offset="300"
              data-aos-delay="200"
              data-aos-once="true"
              data-aos-easing="ease-out-cubic"
            >
              CREATIVE /
            </p>
            <p
              class="m-0"
              data-aos="fade-right"
              data-aos-duration="800"
              data-aos-offset="300"
              data-aos-delay="400"
              data-aos-once="true"
              data-aos-easing="ease-out-cubic"
            >
              MAKES /
            </p>
            <p
              class="m-0"
              data-aos="fade-right"
              data-aos-duration="800"
              data-aos-offset="300"
              data-aos-delay="600"
              data-aos-once="true"
              data-aos-easing="ease-out-cubic"
            >
              WONDERS /
            </p>
          </h2>
          <p
            class="portfolio-about__title-desc"
            data-aos="fade-up"
            data-aos-duration="800"
            data-aos-delay="800"
            data-aos-once="true"
            data-aos-easing="ease-out-cubic"
          >
            Hello, this is a portfolio website of Yohei. I create websites from
            UI / pages / frameworks. I also draw illustrations and post them on
            social media. Avid lover of photography, film and music.
          </p>
        </div>
      </div>
      <div class="col-12 col-md-6">
        <div class="portfolio-about__profile">
          <div class="portfolio-about__profile-wrap">
            <p class="portfolio-about__profile-name m-0">
              ABOUT ME /
              <span class="portfolio-about__profile-name-sub">edelRitter</span>
            </p>
          </div>
          <div
            class="portfolio-about__profile-picture"
            data-aos="fade"
            data-aos-duration="800"
            data-aos-delay="800"
            data-aos-once="true"
            data-aos-easing="ease-out-cubic"
          >
            <p class="portfolio-about__profile-picture-img m-0">
              <img src="/img/photography/stock_profile2.jpg" class="w-100" />
            </p>
            <p class="portfolio-about__profile-picture-text">
              Yohei I. /<br /><span
                class="portfolio-about__profile-picture-text-japanese"
                >I. / 庸平</span
              >
            </p>
          </div>
          <p class="portfolio-about__profile-title m-0">EXPERTISE /</p>
          <p class="portfolio-about__profile-list w-100 mb-4">
            adobe photoshop, vue 3 / vite, javascript, jQuery, HTML/CSS, SASS,
            Webpack, GIT / Github, JEST (other testing frameworks), esLint
          </p>
          <p class="portfolio-about__profile-title m-0">LIKES /</p>
          <ul class="d-flex m-0 p-0">
            <li class="portfolio-about__profile-list">
              <strong>arknights :</strong> The music and characters are
              phenomenal. Developed by Hypergryph
            </li>
            <li class="portfolio-about__profile-list">
              <b>music :</b> Eli Noir, M2U, hybrid, Siames, AJURIKA, Caravan
              Palace, nujabes, Masashi Hamauzu, Adam Gubman, Nomak, Starset,
              etc.
            </li>
          </ul>
          <ul class="d-flex m-0 p-0">
            <li class="portfolio-about__profile-list">
              <b>games :</b> Omori, Chrono Trigger, Saga Frontier 2, SF 3rd
              Strike, Cytus 2, Final Fantasy 6/7/9, Smash bros melee, Lord of
              Vermilion 2, etc.
            </li>
            <li class="portfolio-about__profile-list">
              <b>film :</b> Blade Runner, Truman Show, Punch Drunk Love, The
              Grand Budapest Hotel, The Godfather 1/2, The Matrix, Dunkirk,
              Parasite, Lawrence of Arabia, Memento, Birdman, etc.
            </li>
          </ul>
          <div
            class="portfolio-about__profile-sns"
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-offset="80"
            data-aos-delay="400"
            data-aos-easing="ease-out-cubic"
          >
            <socialNetworking :class="this.alignment" />
          </div>
          <p
            class="portfolio-about__profile-logo"
            data-aos="fade"
            data-aos-duration="1000"
            data-aos-offset="80"
            data-aos-delay="400"
            data-aos-easing="ease-out-cubic"
          >
            <img
              class="portfolio-about__profile-logoimg"
              src="/img/illustration/logo_edelRitter.png"
            />
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import socialNetworking from '@/components/ui/sns/index.vue';

export default {
  name: 'About',
  components: {
    socialNetworking,
  },
  data() {
    return {
      alignment: 'ui-catalog__sns-center',
    };
  },
};
</script>

<style>
@import './style.scss';
</style>
