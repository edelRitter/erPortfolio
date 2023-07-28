<template>
  <section class="portfolio-artwork">
    <div
      class="portfolio-artwork__title"
      data-aos="fade-right"
      data-aos-duration="800"
      data-aos-delay="600"
      data-aos-easing="ease-in-out"
      data-aos-once="true"
      >
      <div class="portfolio-artwork__title-border">
        <h2 class="portfolio-artwork__title-text">Selected Works / Projects</h2>
      </div>
    </div>
    <div class="row no-gutters">
      <div class="col-12">
        <div class="portfolio-artwork__icon">
          <p class="portfolio-artwork__icon-text text-center m-0">illustration / photography works</p>
          <p class="portfolio-artwork__icon-img text-center m-0"><img src="@/assets/img/icons/arrow_icon.svg"></p>
        </div>
      </div>
      <div class="col-12 col-md-4">
        <div class="portfolio-artwork__description">
          <p class="portfolio-artwork__description-text m-0">scroll down to see more /</p>
          <p class="portfolio-artwork__description-text m-0">+</p>
          <p class="portfolio-artwork__description-text m-0">swipe left / right to see more photography</p>
        </div>
      </div>
      <div class="col-12 col-md-8">
        <div class="portfolio-artwork__content">
          <masonry-wall
          :items="items"
          :column-width="400"
          :min-columns="2"
          :gap="12">
          <template #default="{ item, index }">
            <div
              data-aos="fade-up"
              data-aos-duration="1200"
              data-aos-delay="200"
              data-aos-easing="ease-in-out"
              data-aos-once="true"
              class="portfolio-artwork__content-item flex items-center justify-center"
            >
              <p class="portfolio-artwork__content-img">
                <img
                  class="w-100"
                  :data-artwork='item.id'
                  :src="item.image"
                  @click="showModal">
              </p>
              <p class="portfolio-artwork__content-text">
                <span class="portfolio-artwork__content-type">{{ item.type }}</span>
                <span class="portfolio-artwork__content-title">{{ item.title }}</span>
              </p>
            </div>
          </template>
        </masonry-wall>
        </div>
      </div>
      <Transition
        name="modal-fade"
        :status="this.modalStatus"
        v-show="this.modalStatus !== ''">
        <Modal
          @modalOff="closeModal">
          <template v-slot:body>
            <div class="portfolio-modal__item">
              <p class="m-0">
                <img :src="modalImage" class="portfolio-modal__item-images">
              </p>
            </div> 
          </template>
        </Modal>
      </Transition>
    </div>
  </section>
</template>

<script>
import { ref } from 'vue'

import Modal from '@/components/ui/modal/index.vue';

import hibiscus from '@/assets/img/illustration/arknights_hibiscus.png';
import specter from '@/assets/img/illustration/arknights_specter.png';
import w from '@/assets/img/illustration/arknights_w.png';
import penance from '@/assets/img/illustration/arknights_penance.png';
import ajimu from '@/assets/img/illustration/arknights_ajimu.png';

export default {
  name: 'Artwork',
  components: {
    Modal,
  },
  setup() {
    const modalStatus = ref('');
    const modalImage = ref('');

    const items = [
      {
        id: '1',
        image: hibiscus,
        type: 'artwork',
        title: 'arknights / hibiscus',
      },
      {
        id: '2',
        image: specter,
        type: 'artwork',
        title: 'arknights / specter',
      },
      {
        id: '3',
        image: w,
        type: 'artwork',
        title: 'arknights / W',
      },
      {
        id: '4',
        image: penance,
        type: 'artwork',
        title: 'arknights / penance',
      },
      {
        id: '5',
        image: ajimu,
        type: 'artwork',
        title: 'arknights / angelina',
      },
    ]
    return { 
      items,
      modalStatus,
      modalImage,
    }
  },
  methods: {
    showModal(event) {
      this.modalStatus = 'confirmation';
      const artworkData = event.target.dataset.artwork;
      const itemObject = this.items.filter(res => res.id.indexOf(artworkData) !== -1);
      const itemArtwork = itemObject[0].image;

      console.log(itemArtwork);
      
      return this.modalImage = itemArtwork;
    },
    closeModal() {
      this.modalStatus = '';
      this.modalImage = '';
    },
  },
}
</script>

<style>
@import '@/portfolio/content_artwork/style.scss';
</style>
