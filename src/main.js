// import { initializeGsap } from './utils/initialize-gsap'
// const { gsap, Flip, CustomEase } = initializeGsap()

// main.js
// main.js
document.fonts.ready.then(() => {
  checkAndLoadComponents()
})

// Dynamically load all component files from the components folder
const components = import.meta.glob('./components/*.js')

// Function to check for elements and dynamically import corresponding modules
async function checkAndLoadComponents () {
  for (const path in components) {
    // Extract the component name from the file path
    const componentName = path.split('/').pop().replace('.js', '')
    const selector = `[data-${componentName}]` // Create a data attribute selector
    const element = document.querySelector(selector)

    if (element) {
      try {
        // Dynamically import the module
        const module = await components[path]()

        // Check if the module has a default export function, and run it
        if (typeof module.default === 'function') {
          module.default()
          console.log(`${componentName} component initialized successfully`)
        } else {
          console.warn(`Module ${componentName}.js did not export a default function.`)
        }
      } catch (error) {
        // Log a clear error message if the dynamic import fails
        console.error(`Failed to load module for component: ${componentName}`, error)
      }
    } else {
      console.log(`No elements found for component: ${componentName}`)
    }
  }
}
