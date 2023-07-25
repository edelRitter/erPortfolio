<template>
  <div class="ui-catalog__sns" :class="{ align: center }">
    <p class="m-0">
      <a href="#">
        <img src="@/assets/img/icons/twitter_icon.svg">
      </a>
    </p>
    <p class="m-0">
      <a href="#">
        <img src="@/assets/img/icons/discord_icon.svg">
      </a>
    </p>
    <p class="m-0">
      <a href="#">
        <img src="@/assets/img/icons/email_icon.svg">
      </a>
    </p>
  </div>
</template>

<script>
export default {
  name: 'socialNetworking',
  data: function() {
    return {
      uiCatalogAlignment: [
        'ui-catalog__sns-left',
        'ui-catalog__sns-center',
        'ui-catalog__sns-right'
      ]
    };
  },
}
</script>

<style>
@import '@/portfolio/ui/sns/style.scss';
</style>
