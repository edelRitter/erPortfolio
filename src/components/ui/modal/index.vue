<template>
  <transition name="modal-fade">
    <div class="portfolio-favorite-modal">
      <div class="portfolio-favorite-modal__wrap">
        <div class="portfolio-favorite-modal__content">
          <p class="portfolio-favorite-modal__close" @click="closeModal"></p>
          <!-- default view -->
          <div
            class="portfolio-favorite-modal__opened"
            v-show="status === 'confirmation'">
              <slot name="body"> Default body content </slot>
          </div>
          <!-- /default view -->
        </div>
      </div>
      <div
        class="portfolio-favorite-modal__bg"
        @click="closeModal">
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    status: String,
  },
  methods: {
    closeModal() {
      this.$emit('modalOff');
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import './style.scss';
</style>
