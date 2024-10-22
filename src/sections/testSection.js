// import { initializeGsap } from './utils/initialize-gsap'
// const { gsap, Flip, CustomEase } = initializeGsap()

export default function testSection () {
  // check section exists
  const target = document.querySelectorAll('[testSection]')
  if (target === null || target.length === 0) {
    console.log('Home')
  }
}
