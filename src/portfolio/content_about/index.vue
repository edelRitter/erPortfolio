<template>
  <section class="portfolio__about" :bg="light">
    <div class="row no-gutters">
      <div class="col-12 col-md-6">
        <p><img class="w-100" src="@/assets/img/photography/stock_profile.jpg"></p>
        <div class="portfolio__about-profile">
          <div class="portfolio__about-profile-wrap">
            <p class="portfolio__about-profile-name m-0">
              edelRitter / Yohei Isshiki
            </p>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-6">
        <div>
          test
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'About',
  data() {
    return {
      bg: 'light',
    }
  },
}
</script>

<style>
@import '@/portfolio/content_about/style.scss';
</style>
