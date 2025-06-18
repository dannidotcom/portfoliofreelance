export function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-in")
      }
    })
  }, observerOptions)

  // Observe all elements with data-animate attribute
  const animatedElements = document.querySelectorAll("[data-animate]")
  animatedElements.forEach((el) => observer.observe(el))

  return () => observer.disconnect()
}
