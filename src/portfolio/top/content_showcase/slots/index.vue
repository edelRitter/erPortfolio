<template>
  <div v-for="data in myShowcase">
    <div
      class="showcase__item"
      :class="{ 'showcase__bg--light': data.bg === 'light' }"
    >
      <div class="showcase__item-border">
        {{ data.id }}
      </div>
      <div class="row">
        <div class="col">
          <p class="showcase__item-img">
            <img :src="data.image" class="w-100" />
          </p>
        </div>
      </div>
      <div class="row">
        <div class="col md-col-6">
          <p v-if="data.imagefirst" class="showcase__item-img--rough">
            <img :src="data.imagefirst" class="w-100" />
          </p>
        </div>
        <div class="col md-col-6">
          <p v-if="data.imagesecond" class="showcase__item-img--rough">
            <img :src="data.imagesecond" class="w-100" />
          </p>
        </div>
      </div>
      <p class="showcase__item-title">
        {{ data.title }}
      </p>
      <p class="showcase__item-text">
        {{ data.description }}
      </p>
      <p v-if="data.link && data.link_title" class="showcase__item-text">
        <a :href="data.link">{{ data.link_title }}</a>
      </p>
    </div>
  </div>
</template>

<script>
import json from './showcase_data.json';

export default {
  name: 'showcaseItem',
  data() {
    return {
      myShowcase: json,
    };
  },
};
</script>

<style>
@import './style.scss';
</style>
