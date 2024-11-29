<template>
  <section class="portfolio-artwork">
    <div class="portfolio-artwork__scroll">
      <div class="portfolio-artwork__scroll-text">
        <span>SHOWCASE&nbsp;</span>
        <span>SHOWCASE&nbsp;</span>
        <span>SHOWCASE&nbsp;</span>
        <span>SHOWCASE&nbsp;</span>
      </div>
      <div class="portfolio-artwork__scroll-text">
        <span>SHOWCASE&nbsp;</span>
        <span>SHOWCASE&nbsp;</span>
        <span>SHOWCASE&nbsp;</span>
        <span>SHOWCASE&nbsp;</span>
      </div>
    </div>
    <div class="portfolio-artwork__title">
      <div class="portfolio-artwork__title-border">
        <h2 class="portfolio-artwork__title-text">
          showcase of all /
          <span class="portfolio-artwork__title-text-sub">WORKS</span>
        </h2>
      </div>
    </div>
    <div class="row no-gutters">
      <div class="col-12">
        <div class="portfolio-artwork__icon">
          <p class="portfolio-artwork__icon-text text-center m-0">
            illustration / photography works
          </p>
          <p class="portfolio-artwork__icon-img text-center m-0">
            <img src="/img/icons/arrow_icon.svg" />
          </p>
        </div>
      </div>
      <div class="col-12 col-md-4">
        <div class="portfolio-artwork__description">
          <p class="portfolio-artwork__description-text m-0">
            scroll down to see more /
          </p>
          <p class="portfolio-artwork__description-text m-0">+</p>
          <p class="portfolio-artwork__description-text m-0">
            swipe left / right to see more photography
          </p>
        </div>
      </div>
      <div class="col-12 col-md-8">
        <div class="portfolio-artwork__content">
          <masonry-wall
            :items="items"
            :column-width="400"
            :min-columns="2"
            :gap="12"
          >
            <template #default="{ item, index }">
              <div
                data-aos="fade-up"
                data-aos-duration="1200"
                data-aos-delay="400"
                data-aos-easing="ease-out-cubic"
                class="portfolio-artwork__content-item flex items-center justify-center"
              >
                <p class="portfolio-artwork__content-img">
                  <img
                    class="w-100"
                    :data-artwork="item.id"
                    :src="item.image"
                    @click="showModal"
                  />
                </p>
                <p class="portfolio-artwork__content-text">
                  <span class="portfolio-artwork__content-type">{{
                    item.type
                  }}</span>
                  <span class="portfolio-artwork__content-title">{{
                    item.title
                  }}</span>
                </p>
              </div>
            </template>
          </masonry-wall>
        </div>
      </div>
      <Transition
        name="modal-fade"
        :status="this.modalStatus"
        v-show="this.modalStatus !== ''"
      >
        <Modal @modalOff="closeModal">
          <template v-slot:body>
            <div class="portfolio-modal__item">
              <p class="m-0">
                <img :src="modalImage" class="portfolio-modal__item-images" />
              </p>
            </div>
          </template>
        </Modal>
      </Transition>
    </div>
  </section>
</template>

<script>
import { ref } from 'vue';

import Modal from '@/components/ui/modal/index.vue';
import artworkJson from './artwork_data.json';

export default {
  name: 'Artwork',
  components: {
    Modal,
  },
  setup() {
    const modalStatus = ref('');
    const modalImage = ref('');

    const items = artworkJson;

    return {
      items,
      modalStatus,
      modalImage,
    };
  },
  methods: {
    showModal(event) {
      this.modalStatus = 'confirmation';
      const artworkData = event.target.dataset.artwork;
      const itemObject = this.items.filter(
        (res) => res.id.indexOf(artworkData) !== -1
      );
      const itemArtwork = itemObject[0].image;

      return (this.modalImage = itemArtwork);
    },
    closeModal() {
      this.modalStatus = '';
      this.modalImage = '';
    },
  },
};
</script>

<style>
@import './style.scss';
</style>
