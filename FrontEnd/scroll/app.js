console.log('app.js starting..')
const ratio = .1
/**
 * @type {IntersectionObserverInit} options
 */
const options = {
  root: null,
  rootMargin: '0px',
  threshold: ratio
}

/**
 * @param {IntersectionObserverEntry[]} entries
 * @param {IntersectionObserver} observer
 */
const handleIntersect = function(entries, observer) {
  console.log('handleIntersect', entries)
  entries.forEach(function(entry) {
    if (entry.intersectionRatio > ratio) {
      entry.target.classList.add('reveal-visible')
      observer.unobserve(entry.target)
    }
  })
}

let observer = new IntersectionObserver(
  handleIntersect,
  options
)

document.querySelectorAll('.reveal').forEach(function(e) {
  observer.observe(e)
})
