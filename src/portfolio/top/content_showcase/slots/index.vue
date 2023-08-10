<template>
  <div class="portfolio-showcase__item portfolio-showcase__bg-dark">
    <div class="portfolio-showcase__item-border">
      <p>01</p>
    </div>
    <p class="portfolio-showcase__item-img"><img src="@/assets/img/illustration/arknights_ajimu.png" class="w-100"></p>
    <p class="portfolio-showcase__item-title">
    Arknights Illustration /<br>Ajimu Angelina
    </p>
    <p class="portfolio-showcase__item-text">Illustration</p>
  </div>
</template>

<script>
import hibiscus from '@/assets/img/illustration/arknights_hibiscus.png';
import specter from '@/assets/img/illustration/arknights_specter.png';
import w from '@/assets/img/illustration/arknights_w.png';
import penance from '@/assets/img/illustration/arknights_penance.png';
import ajimu from '@/assets/img/illustration/arknights_ajimu.png';

export default {
  name: 'showcaseItem',
  setup() {
    const items = [
      {
        id: '01',
        image: hibiscus,
        type: 'artwork',
        title: 'arknights / hibiscus',
      },
      {
        id: '02',
        image: specter,
        type: 'artwork',
        title: 'arknights / specter',
      },
      {
        id: '03',
        image: w,
        type: 'artwork',
        title: 'arknights / W',
      },
      {
        id: '04',
        image: penance,
        type: 'artwork',
        title: 'arknights / penance',
      },
      {
        id: '05',
        image: ajimu,
        type: 'artwork',
        title: 'arknights / angelina',
      },
    ]
    return { 
      items,
    }
  },
}
</script>

<style>
@import './style.scss';
</style>
