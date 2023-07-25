<template>
  <div class="ui-catalog__sns" :class="{ align: center }">
    <p class="m-0">
      <a href="https://twitter.com/edelRitter9" target="_blank">
        <img src="@/assets/img/icons/twitter_icon.svg">
      </a>
    </p>
    <p class="m-0">
      <a href="https://discordapp.com/users/_edelritter" target="_blank">
        <img src="@/assets/img/icons/discord_icon.svg">
      </a>
    </p>
    <p class="m-0">
      <a href="https://www.pixiv.net/users/33521928" target="_blank">
        <img src="@/assets/img/icons/pixiv_icon.svg">
      </a>
    </p>
    <p class="m-0">
      <a href="https://github.com/edelRitter/" target="_blank">
        <img src="@/assets/img/icons/github_icon.svg">
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
