import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
// import Flip from 'gsap/Flip'
// import CustomEase from 'gsap/CustomEase'

export function initializeGsap () {
  if (window.gsap) {
    return { gsap: window.gsap, Flip: window.Flip, CustomEase: window.CustomEase, ScrollTrigger: window.ScrollTrigger }
  }
  // gsap.registerPlugin(Flip)
  // gsap.registerPlugin(CustomEase)
  gsap.registerPlugin(ScrollTrigger)

  if (!window.gsap) {
    window.gsap = gsap
    // window.Flip = Flip
    // window.CustomEase = CustomEase
    window.ScrollTrigger = ScrollTrigger
  }
  return { gsap: window.gsap, Flip: window.Flip, CustomEase: window.CustomEase, ScrollTrigger: window.ScrollTrigger }
}
