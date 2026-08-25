import UiMenu from './menu.vue';

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction
export default {
  title: 'ui/menu/menu',
  component: UiMenu,
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Title displayed in the sidebar',
    },
    navLinks: {
      control: 'object',
      description: 'Array of navigation links with text and id properties',
    },
    enableScroll: {
      control: 'boolean',
      description: 'Enable smooth scroll to element on nav click',
    },
    onToggle: {
      action: 'toggle',
    },
    onNavClick: {
      action: 'nav-click',
    },
  },
};

// More on writing stories with args: https://storybook.js.org/docs/vue/writing-stories/args
export const Default = {
  args: {
    title: 'Menu',
    navLinks: [
      { text: 'HOME', id: 'home' },
      { text: 'ABOUT', id: 'about' },
      { text: 'CONTACT', id: 'contact' },
    ],
    enableScroll: false,
  },
};

export const Portfolio = {
  args: {
    title: 'edelRitter',
    navLinks: [
      { text: 'TOP', id: 'portfolioTop' },
      { text: 'ARTWORK', id: 'portfolioArtwork' },
      { text: 'PHOTOGRAPHY', id: 'portfolioPhotography' },
      { text: 'ABOUT', id: 'portfolioAbout' },
    ],
    enableScroll: false,
  },
};

export const CustomLinks = {
  args: {
    title: 'Navigation',
    navLinks: [
      { text: 'SERVICES', id: 'services' },
      { text: 'PORTFOLIO', id: 'portfolio' },
      { text: 'TEAM', id: 'team' },
      { text: 'BLOG', id: 'blog' },
      { text: 'CONTACT', id: 'contact' },
    ],
    enableScroll: false,
  },
};
