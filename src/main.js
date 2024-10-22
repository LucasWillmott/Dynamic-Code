// import { initializeGsap } from './utils/initialize-gsap'
// const { gsap, Flip, CustomEase } = initializeGsap()

// main.js
document.fonts.ready.then(() => {
  checkAndLoadComponents()
})

const components = import.meta.glob('./components/*.js')

async function checkAndLoadComponents () {
  for (const path in components) {
    const componentName = path.split('/').pop().replace('.js', '')
    const selector = `[data-${componentName}]`
    const element = document.querySelector(selector)

    if (element) {
      try {
        const module = await components[path]()
        if (typeof module.default === 'function') {
          module.default()
        }
      } catch (error) {
        // Handle error
      }
    }
  }
}
