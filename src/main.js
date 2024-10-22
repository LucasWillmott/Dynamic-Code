// import { initializeGsap } from './utils/initialize-gsap'
// const { gsap, Flip, CustomEase } = initializeGsap()

// main.js
document.fonts.ready.then(() => {
  checkAndLoadComponents()
})

// Vite's import.meta.glob to create functions for each module but not load them immediately
const components = import.meta.glob('./components/*.js')

// Function to check for elements and dynamically import the necessary components
async function checkAndLoadComponents () {
  // Loop through the dynamic import functions (but don't load them yet)
  for (const path in components) {
    // Extract component name (e.g., accordions, slider)
    const componentName = path.split('/').pop().replace('.js', '')

    // Create a selector based on the data attribute convention
    const selector = `[data-${componentName}]`
    const element = document.querySelector(selector)

    // Only load the module if the element exists in the DOM
    if (element) {
      try {
        // Now we dynamically import the component module (this is lazy-loaded)
        const module = await components[path]()

        // Run the module's default export function if it exists
        if (typeof module.default === 'function') {
          module.default()
          console.log(`${componentName} component initialized successfully`)
        } else {
          console.warn(`Module ${componentName}.js does not export a default function.`)
        }
      } catch (error) {
        console.error(`Error loading component ${componentName}`, error)
      }
    }
  }
}
