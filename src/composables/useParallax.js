import { ref, onMounted, onUnmounted } from 'vue'
import { useLenis } from 'lenis/vue'

/**
 * Parallax composable using Lenis smooth scroll
 * @param {number} speed - Parallax speed multiplier (0 = no movement, 1 = normal, negative = opposite direction)
 * @param {Object} options - Additional options
 * @param {string} options.direction - 'y' (vertical) or 'x' (horizontal)
 * @param {number} options.offset - Starting offset value
 * @returns {Object} - { parallaxRef, parallaxStyle }
 */
export function useParallax(speed = 0.5, options = {}) {
  const { direction = 'y', offset = 0 } = options
  
  const parallaxRef = ref(null)
  const parallaxValue = ref(offset)
  const parallaxStyle = ref({})
  
  const updateParallax = (lenis) => {
    if (!parallaxRef.value) return
    
    const rect = parallaxRef.value.getBoundingClientRect()
    const windowHeight = window.innerHeight
    
    // Calculate element's position relative to viewport center
    const elementCenter = rect.top + rect.height / 2
    const viewportCenter = windowHeight / 2
    const distanceFromCenter = elementCenter - viewportCenter
    
    // Apply parallax based on distance from viewport center
    parallaxValue.value = distanceFromCenter * (speed - 1) + offset
    
    if (direction === 'y') {
      parallaxStyle.value = {
        transform: `translate3d(0, ${parallaxValue.value}px, 0)`,
        willChange: 'transform'
      }
    } else {
      parallaxStyle.value = {
        transform: `translate3d(${parallaxValue.value}px, 0, 0)`,
        willChange: 'transform'
      }
    }
  }
  
  useLenis(updateParallax)
  
  return {
    parallaxRef,
    parallaxValue,
    parallaxStyle
  }
}

/**
 * Multiple parallax elements with different speeds
 * @param {Array} speeds - Array of speed multipliers for each element
 * @returns {Object} - { refs, styles, setRef }
 */
export function useMultiParallax(speeds = []) {
  const refs = ref([])
  const styles = ref(speeds.map(() => ({})))
  
  const setRef = (index) => (el) => {
    if (el) {
      refs.value[index] = el
    }
  }
  
  useLenis((lenis) => {
    const windowHeight = window.innerHeight
    
    refs.value.forEach((el, index) => {
      if (!el) return
      
      const speed = speeds[index] ?? 0.5
      const rect = el.getBoundingClientRect()
      
      // Calculate element's position relative to viewport center
      const elementCenter = rect.top + rect.height / 2
      const viewportCenter = windowHeight / 2
      const distanceFromCenter = elementCenter - viewportCenter
      
      // Apply parallax based on distance from viewport center
      const parallaxValue = distanceFromCenter * (speed - 1)
      
      styles.value[index] = {
        transform: `translate3d(0, ${parallaxValue}px, 0)`,
        willChange: 'transform'
      }
    })
  })
  
  return {
    refs,
    styles,
    setRef
  }
}
