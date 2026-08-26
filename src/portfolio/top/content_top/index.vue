<template>
  <section class="prt-top">
    <div class="prt-top__hero m-0">
      <div class="prt-top__wrapper">
        <span
          class="prt-top__subtitle"
          data-aos="zoom-in"
          data-aos-duration="1200"
          data-aos-delay="300"
          data-aos-once="true"
          data-aos-easing="ease-out-cubic"
        >
          DESIGNER /
        </span>
        <br />
        <span
          class="prt-top__subtitle"
          data-aos="zoom-in"
          data-aos-duration="1200"
          data-aos-delay="600"
          data-aos-once="true"
          data-aos-easing="ease-out-cubic"
        >
          DEVELOPER /
        </span>
        <br />
        <span
          class="prt-top__subtitle"
          data-aos="zoom-in"
          data-aos-duration="1200"
          data-aos-delay="900"
          data-aos-once="true"
          data-aos-easing="ease-out-cubic"
        >
          ILLUSTRATOR /
        </span>
        <p class="prt-top__text m-0">-</p>
        <p class="prt-top__text m-0">porfolio website created by</p>
        <p class="prt-top__text m-0">-</p>
        <h1 class="prt-top__title">edelRitter</h1>
        <socialNetworking :class="this.alignment" />
      </div>
    </div>
    <video playsinline autoplay muted loop class="prt-top__video">
      <source src="@/assets/video/teamlab_video1.mp4" type="video/mp4" />
    </video>
  </section>
</template>

<script>
import socialNetworking from '@/components/ui/sns/sns.vue';

export default {
  name: 'Top',
  components: {
    socialNetworking,
  },
  data() {
    return {
      alignment: 'ui-catalog__sns-right',
    };
  },
};
</script>

<style>
@import './style.scss';
</style>
