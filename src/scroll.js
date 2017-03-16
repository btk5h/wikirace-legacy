function scroll (el, x, y) {
  if (el === document.body) {
    window.scrollTo(x, y)
  } else {
    el.scrollLeft = x
    el.scrollTop = y
  }
}

function ease (k) {
  return 0.5 * (1 - Math.cos(Math.PI * k))
}

function step (context) {
  let elapsed = (window.performance.now() - context.startTime) / context.duration
  let scrollFactor = context.easeFunction(elapsed > 1 ? 1 : elapsed)

  let x = context.startX + (context.x - context.startX) * scrollFactor
  let y = context.startY + (context.y - context.startY) * scrollFactor

  scroll(context.element, x, y)

  if (x !== context.x || y !== context.y) {
    window.requestAnimationFrame(() => step(context))
  }
}

function getScrollContainer (element) {
  do {
    element = element.parentNode
  } while (element !== document.body && (
    !(
      element.clientHeight < element.scrollHeight ||
      element.clientWidth < element.scrollWidth
    ) ||
    window.getComputedStyle(element).overflow === 'visible'
  ))
  return element
}

function smoothScroll (element, x, y, {duration = 468, easeFunction = ease} = {}) {
  step({
    element,
    duration,
    easeFunction,
    startTime: window.performance.now(),
    startX: element === document.body ? window.pageXOffset : element.scrollLeft,
    startY: element === document.body ? window.pageYOffset : element.scrollTop,
    x,
    y
  })
}

export function reveal (element) {
  let parent = getScrollContainer(element)
  let parentRect = parent.getBoundingClientRect()
  let elementRect = element.getBoundingClientRect()

  smoothScroll(
    parent,
    parent.scrollLeft + elementRect.left - parentRect.left,
    parent.scrollTop + elementRect.top - parentRect.top
  )
}
