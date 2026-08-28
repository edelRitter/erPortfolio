<template>
  <section class="about">
    <div class="row no-gutters">
      <div class="col-12">
        <div class="about__hero m-0">
          <p class="about__hero-img">
            <img class="w-100" :src="`${baseUrl}${heroImage}`">
          </p>
        </div>
      </div>
      <div class="col-12 col-md-6">
        <div class="about__title">
          <h2 class="about__title-text">
            <p
              v-for="(line, index) in titleLines"
              :key="index"
              class="m-0"
              data-aos="fade-right"
              data-aos-duration="800"
              data-aos-offset="300"
              :data-aos-delay="200 + (index * 200)"
              data-aos-once="true"
              data-aos-easing="ease-out-cubic"
            >
              {{ line }}
            </p>
          </h2>
          <p
            class="about__title-desc"
            data-aos="fade-up"
            data-aos-duration="800"
            data-aos-delay="800"
            data-aos-once="true"
            data-aos-easing="ease-out-cubic"
          >
            {{ description }}
          </p>
        </div>
      </div>
      <div class="col-12 col-md-6">
        <div class="about__profile">
          <div class="about__profile-wrap">
            <p class="about__profile-name m-0">
              {{ sectionTitle }}
              <span class="about__profile-name--sub">{{ subName }}</span>
            </p>
          </div>
          <div class="about__picture">
            <p class="about__picture-img m-0">
              <img :src="`${baseUrl}${profileImage}`" class="w-100" />
            </p>
            <p class="about__picture-text">
              {{ profileName }}<br /><span
                class="about__picture-text--jp"
                >{{ profileNameJp }}</span
              >
            </p>
          </div>
          <p class="about__profile-title m-0">{{ expertiseTitle }}</p>
          <p class="about__profile-list w-100 mb-4">
            {{ expertiseList }}
          </p>
          <p class="about__profile-title m-0">{{ likesTitle }}</p>
          <ul v-for="(row, rowIndex) in likesRows" :key="rowIndex" class="d-flex m-0 p-0">
            <li v-for="(item, itemIndex) in row" :key="itemIndex" class="about__profile-list">
              <component :is="item.bold ? 'strong' : 'b'">{{ item.label }} :</component> {{ item.content }}
            </li>
          </ul>
          <div
            class="about__sns"
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-offset="80"
            data-aos-delay="400"
            data-aos-easing="ease-out-cubic"
          >
            <socialNetworking :class="alignment" />
          </div>
          <p
            class="about__logo"
            data-aos="fade"
            data-aos-duration="1000"
            data-aos-offset="80"
            data-aos-delay="400"
            data-aos-easing="ease-out-cubic"
          >
            <img
              class="about__logo-img"
              :src="`${baseUrl}${logoImage}`"
            />
          </p>
        </div>
      </div>
    </div>
    <div class="about__footer">
      <p class="about__footer-text m-0">© {{ currentYear }} Yohei I. All rights reserved.</p>
    </div>
  </section>
</template>

<script>
import socialNetworking from '@/components/ui/sns/sns.vue';

export default {
  name: 'About',
  components: {
    socialNetworking,
  },
  data() {
    return {
      currentYear: new Date().getFullYear(),
    };
  },
  props: {
    heroImage: {
      type: String,
      default: 'img/photography/stock_profile.jpg',
    },
    titleLines: {
      type: Array,
      default: () => ['CREATIVE /', 'MAKES /', 'WONDERS /'],
    },
    description: {
      type: String,
      default: 'Hello, this is a portfolio website of Yohei. I create websites from UI / pages / frameworks. I also draw illustrations and post them on social media. Avid lover of photography, film and music.',
    },
    sectionTitle: {
      type: String,
      default: 'ABOUT ME /',
    },
    subName: {
      type: String,
      default: 'edelRitter',
    },
    profileImage: {
      type: String,
      default: 'img/photography/stock_profile2.jpg',
    },
    profileName: {
      type: String,
      default: 'Yohei I. /',
    },
    profileNameJp: {
      type: String,
      default: 'I. / 庸平',
    },
    expertiseTitle: {
      type: String,
      default: 'EXPERTISE /',
    },
    expertiseList: {
      type: String,
      default: 'adobe photoshop, vue 3 / vite, javascript, jQuery, HTML/CSS, SASS, Webpack, GIT / Github',
    },
    likesTitle: {
      type: String,
      default: 'LIKES /',
    },
    likesRows: {
      type: Array,
      default: () => [
        [
          { label: 'Arknights', content: 'Game Developed by Hypergryph. Current Passion.', bold: true },
          { label: 'MUSIC', content: 'M2U, hybrid, Siames, AJURIKA, Caravan Palace, nujabes, Masashi Hamauzu, Adam Gubman, Nomak, Starset, Polyphia, Danger, etc.', bold: false },
        ],
        [
          { label: 'FILM', content: 'Punch Drunk Love, Obsession, The Lighthouse, Blade Runner, Truman Show, The Grand Budapest Hotel, The Godfather 1&2, The Matrix, Dunkirk, Parasite, Lawrence of Arabia, Memento, Interstellar, Birdman, tons of others', bold: false },
        ],
      ],
    },
    logoImage: {
      type: String,
      default: 'img/illustration/logo_edelRitter.png',
    },
  },
  data() {
    return {
      alignment: 'ui-catalog__sns-center',
      baseUrl: import.meta.env.BASE_URL,
    };
  },
};
</script>

<style>
@import './style.scss';
</style>
