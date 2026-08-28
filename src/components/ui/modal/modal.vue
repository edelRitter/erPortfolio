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
@use './style.scss';
</style>
