<template>
  <div class="modal">
    <div class="modal__content">
      <p class="modal__close" @click="closeModal"></p>
      <div class="modal__wrap">
        <!-- default view -->
        <div class="modal__opened" v-show="status === 'confirmation'">
          <slot name="body">
            <div class="modal__item">
              <p class="m-0">
                <img 
                  src="https://via.placeholder.com/800x600?text=Modal+Content" 
                  alt="Placeholder image"
                  class="modal__item-img" 
                />
              </p>
            </div>
          </slot>
        </div>
        <!-- /default view -->
      </div>
    </div>
    <div class="modal__bg" @click="closeModal"></div>
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@use './style.scss';
</style>
