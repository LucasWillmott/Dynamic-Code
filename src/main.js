// import { initializeGsap } from './utils/initialize-gsap'
// const { gsap, Flip, CustomEase } = initializeGsap()

// main.js
document.fonts.ready.then(() => {
  checkAndLoadComponents()
})

// Array of component attribute names
const componentNames = ['accordions', 'slider']

// Function to check for elements and dynamically import corresponding modules
function checkAndLoadComponents () {
  componentNames.forEach(async (name) => {
    const selector = `[${name}]` // Create selector based on the attribute name
    if (document.querySelector(selector)) {
      const module = await import(`./components/${name}.js`) // Dynamically load the module
      if (typeof module.default === 'function') {
        module.default() // Run the default exported function
      }
    }
  })
}
