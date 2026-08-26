<template>
  <UiMenu
    :title="title"
    :navLinks="navLinks"
    :enableScroll="true"
  >
    <template #footer>
      <socialNetworking :class="alignment" />
    </template>
  </UiMenu>
</template>

<script>
import UiMenu from '@/components/ui/menu/menu.vue';
import socialNetworking from '@/components/ui/sns/sns.vue';

export default {
  name: 'PortfolioMenu',
  components: {
    UiMenu,
    socialNetworking,
  },
  data: () => {
    return {
      title: 'edelRitter',
      alignment: 'ui-catalog__sns-center',
      navLinks: [
        {
          text: 'TOP',
          id: 'portfolioTop',
        },
        {
          text: 'ARTWORK',
          id: 'portfolioArtwork',
        },
        {
          text: 'PHOTOGRAPHY',
          id: 'portfolioPhotography',
        },
        {
          text: 'ABOUT',
          id: 'portfolioAbout',
        },
      ],
    };
  },
};
</script>

<style>
@import './style.scss';
</style>
