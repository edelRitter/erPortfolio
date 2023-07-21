<template>
  <div class="portfolio__artwork">
    <masonry-wall
      :items="items"
      :ssr-columns="1"
      :column-width="300"
      :gap="0">
      <template #default="{ item, index }">
        <div
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-easing="ease-in-out"
          data-aos-once="true"
          class="flex items-center justify-center"
        >
          <p><img v-bind:src="item.image" class="w-100"></p>
          <p>{{ item.title }}</p>
        </div>
      </template>
    </masonry-wall>
  </div>
</template>

<script>
export default {
  name: 'Artwork',
  setup() {
    const items = [
      {
        image: '/illustration/arknights_hibiscus.jpg',
        title: 'first',
      },
      {
        image: '/illustration/arknights_specter.jpg',
        title: 'second',
      },
      {
        image: '/illustration/arknights_specter.jpg',
        title: 'second',
      },
      {
        image: '/illustration/arknights_specter.jpg',
        title: 'second',
      },
    ]
    return { items }
  },
}
</script>

<style>
@import '@/portfolio/content_artwork/style.scss';
</style>
