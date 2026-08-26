<template>
  <div class="er-modal">
    <div class="er-modal__bg" @click="closeModal"></div>
    <div class="er-modal__content">
      <span class="er-modal__close" @click="closeModal"></span>
      <div class="er-modal__wrap">
        <div class="er-modal__opened" v-show="status === 'confirmation'">
          <slot name="body">
            <div class="er-modal__item">
              <img 
                src="https://via.placeholder.com/800x600?text=Modal+Content" 
                alt="Placeholder image"
                class="er-modal__item-img" 
              />
            </div>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    status: String,
  },
  emits: ['modal-off'],
  methods: {
    closeModal() {
      this.$emit('modal-off');
    },
  },
};
</script>

<style lang="scss">
@use '@/assets/scss/_media-queries.scss' as media;

.er-modal {
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  right: 0 !important;
  bottom: 0 !important;
  width: 100vw !important;
  height: 100vh !important;
  z-index: 99999 !important;
  display: flex !important;
  align-items: center;
  justify-content: center;
  overflow: visible !important;

  &__content {
    position: relative;
    width: 86vw;
    max-width: 1200px;
    max-height: 86vh;
    padding: 20px;
    border-radius: 4px;
    z-index: 100001;
    background: #1a1a1a;
    overflow: auto;

    @media #{media.$xsmall-and-down} {
      width: 94vw;
      max-height: 90vh;
    }
  }

  &__wrap {
    position: relative;
    max-height: 100%;
    height: auto;
  }

  &__opened {
    width: 100%;
  }

  &__item {
    position: relative;

    &-img {
      width: 100%;
      height: auto;
      display: block;
    }
  }

  &__close {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 30px;
    height: 30px;
    cursor: pointer;
    z-index: 100002;

    &::before,
    &::after {
      content: '';
      position: absolute;
      width: 20px;
      height: 2px;
      top: 14px;
      left: 5px;
      transform: rotate(45deg);
      background-color: #ffffff;
    }

    &::after {
      transform: rotate(-45deg);
    }
  }

  &__bg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.8);
    z-index: 100000;
  }
}
</style>
