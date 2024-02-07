import { createApp } from 'vue'
import App from './App.vue'

/** plugin AOS */
import AOS from 'aos'
import 'aos/dist/aos.css'

/** plugin Masonry */
import MasonryWall from '@yeger/vue-masonry-wall'

/** original JS */
import '@/assets/js/index.js'

/** Mount APP */
createApp(App).use(AOS.init()).use(MasonryWall).mount('#app')
