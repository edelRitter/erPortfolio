import { createApp } from 'vue'
import App from './App.vue'

/** plugin AOS */
import AOS from 'aos'
import 'aos/dist/aos.css'

/** plugin Masonry */
import MasonryWall from '@yeger/vue-masonry-wall'

/** original JS */
import { setupSmoothScroll } from '@/assets/js/smoothscroll/index.js'
function onDomReady() {
  setupSmoothScroll()
}
document.addEventListener('DOMContentLoaded', onDomReady)

const imagePaths = [];
Object.values(import.meta.glob("./src/assets/img/*.jpg", { eager: true })).forEach(
  ({ default: path }) => {
    const url = new URL(path, import.meta.url);
    const data = {
      path: url.pathname,
    };
    imagePaths.push(data);
  }
);
/** Mount APP */
createApp(App)
  .use(AOS.init())
  .use(MasonryWall)
  .mount("#app");