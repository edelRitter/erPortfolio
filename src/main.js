import { createApp } from 'vue'
import App from './App.vue'
import { setupSmoothScroll } from '@/assets/js/smoothscroll/index.js'

/** plugin AOS */
import AOS from 'aos'
import 'aos/dist/aos.css'

/** plugin Masonry */
import MasonryWall from '@yeger/vue-masonry-wall'

function onDomReady() {
  setupSmoothScroll()
}

document.addEventListener('DOMContentLoaded', onDomReady)


createApp(App)
  .use(AOS.init())
  .use(MasonryWall)
  .mount("#app");
