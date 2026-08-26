import { createApp } from 'vue'
import App from './App.vue'

/** plugin AOS */
import AOS from 'aos'
import 'aos/dist/aos.css'

/** plugin Masonry */
import MasonryWall from '@yeger/vue-masonry-wall'

/** plugin Lenis */
import LenisVue from 'lenis/vue'
import 'lenis/dist/lenis.css'

/** Mount APP */
createApp(App).use(AOS.init()).use(MasonryWall).use(LenisVue).mount('#app')
