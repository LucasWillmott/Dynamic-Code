import Home from './pages/home'
import testSection from './sections/testSection'
// import { initializeGsap } from './utils/initialize-gsap'
// const { gsap, Flip, CustomEase } = initializeGsap()

// Pages
const home = document.querySelector('body').classList.contains('body--home')
if (home) {
  Home()
}

// Sections
testSection()

// Global Code
console.log('global')
