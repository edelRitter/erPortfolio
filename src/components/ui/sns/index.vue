<template>
  <div class="ui-catalog__sns" :class="classes">
    <p class="m-0">
      <a href="https://twitter.com/edelRitter9" target="_blank">
        <img src="/img/icons/twitter_icon.svg" />
      </a>
    </p>
    <p class="m-0">
      <a href="https://discordapp.com/users/_edelritter" target="_blank">
        <img src="/img/icons/discord_icon.svg" />
      </a>
    </p>
    <p class="m-0">
      <a href="https://bsky.app/profile/edelritter.bsky.social" target="_blank">
        <img src="/img/icons/bluesky_icon.svg" />
      </a>
    </p>
    <p class="m-0">
      <a href="https://github.com/edelRitter/" target="_blank">
        <img src="/img/icons/github_icon.svg" />
      </a>
    </p>
  </div>
</template>

<script>
import { reactive, computed } from 'vue';

export default {
  name: 'socialNetworking',
  props: {
    alignment: {
      type: String,
      validator: function (value) {
        return ['left', 'center', 'right'].indexOf(value) !== -1;
      },
    },
  },
  setup(props) {
    return {
      classes: computed(() => ({
        [`${props.alignment || 'left'}`]: true,
      })),
    };
  },
};
</script>

<style>
@import '@/components/ui/sns/style.scss';
</style>
