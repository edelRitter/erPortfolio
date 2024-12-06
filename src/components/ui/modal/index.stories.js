import Modal from './modal.vue'

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

export const Primarly = {
  args: {
    primary: true,
    label: 'Modal',
  },
}