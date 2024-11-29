import Modal from './index.vue'

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction
export default {
  title: 'ui/modal/modals',
  component: Modal,
  tags: ['autodocs'],
  argTypes: {
    onClick: {},
    alignment: {
      control: {
        type: 'select',
      },
    },
  },
}
