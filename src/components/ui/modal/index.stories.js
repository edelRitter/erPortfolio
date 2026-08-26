import Modal from './modal.vue'
import { ref } from 'vue'

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction
export default {
  title: 'ui/modal/modals',
  component: Modal,
  tags: ['autodocs'],
  argTypes: {
    status: {
      control: {
        type: 'select',
      },
      options: ['confirmation'],
    },
  },
}

export const Primarly = {
  args: {
    status: 'confirmation',
  },
  render: (args) => ({
    components: { Modal },
    setup() {
      const isModalOpen = ref(false)
      const openModal = () => {
        isModalOpen.value = true
      }
      const closeModal = () => {
        isModalOpen.value = false
      }
      return { args, isModalOpen, openModal, closeModal }
    },
    template: `
      <div>
        <button 
          @click="openModal" 
          style="padding: 12px 24px; background: #0074ad; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 16px;"
        >
          Open Modal
        </button>
        <p style="margin-top: 12px; color: #666;">Click the button above to open the modal. Click the X or the background to close it.</p>
        <Modal 
          v-if="isModalOpen" 
          v-bind="args" 
          @modal-off="closeModal"
        />
      </div>
    `,
  }),
}