// import { initializeGsap } from './utils/initialize-gsap'
// const { gsap, Flip, CustomEase } = initializeGsap()

// main.js
document.fonts.ready.then(() => {
  checkAndLoadComponents()
})

// Automatically get component names from the components folder
const components = require.context('./components', false, /\.js$/) // Find all .js files in the components folder

// Function to check for elements and dynamically import corresponding modules
function checkAndLoadComponents () {
  components.keys().forEach(async (fileName) => {
    const componentName = fileName
      .replace('./', '') // Remove leading './'
      .replace('.js', '') // Remove the .js extension

    const selector = `[data-${componentName}]` // Create selector from the component name
    const element = document.querySelector(selector)

    if (element) {
      try {
        // Dynamically import the module
        const module = await import(`./components/${componentName}.js`)

        // Check if the module has a default export function, and run it
        if (typeof module.default === 'function') {
          module.default()
          console.log(`${componentName} component initialized successfully`)
        } else {
          console.warn(`Module ${componentName}.js did not export a default function.`)
        }
      } catch (error) {
        console.error(`Failed to load module for component: ${componentName}`, error)
      }
    } else {
      console.log(`No elements found for component: ${componentName}`)
    }
  })
}
