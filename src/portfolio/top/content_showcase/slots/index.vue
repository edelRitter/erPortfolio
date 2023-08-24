<template>
  <div v-for="data in myShowcase">
    <div 
    class="portfolio-showcase__item" 
    :class="{'portfolio-showcase__bg-light': data.bg === 'light'}">
      <div class="portfolio-showcase__item-border">
        {{ data.id }}
      </div>
      <p class="portfolio-showcase__item-img">
        <img :src="data.image" class="w-100">
      </p>
      <p class="portfolio-showcase__item-title">
        {{ data.title }}
      </p>
      <p class="portfolio-showcase__item-text">
        {{ data.description }}
      </p>
    </div>
  </div>  
</template>

<script>
import json from './showcase_data.json'

export default {
  name: 'showcaseItem',
  data() {
    return {
      myShowcase: json
    }
  },
}
</script>

<style>
@import './style.scss';
</style>
