const SVG_NAMESPACE = 'http://www.w3.org/2000/svg'

function createIllustration(): SVGSVGElement {
  const illustration = document.createElementNS(SVG_NAMESPACE, 'svg')
  illustration.setAttribute('viewBox', '0 0 120 100')
  illustration.setAttribute('aria-hidden', 'true')
  illustration.setAttribute('focusable', 'false')
  illustration.classList.add('empty-state__illustration')

  const book = document.createElementNS(SVG_NAMESPACE, 'rect')
  book.setAttribute('x', '18')
  book.setAttribute('y', '16')
  book.setAttribute('width', '84')
  book.setAttribute('height', '68')
  book.setAttribute('rx', '10')
  book.setAttribute('stroke-width', '4')
  book.style.fill = 'var(--color-surface)'
  book.style.stroke = 'var(--color-ink)'

  const spine = document.createElementNS(SVG_NAMESPACE, 'line')
  spine.setAttribute('x1', '42')
  spine.setAttribute('y1', '16')
  spine.setAttribute('x2', '42')
  spine.setAttribute('y2', '84')
  spine.setAttribute('stroke-width', '4')
  spine.style.stroke = 'var(--color-ink)'

  const check = document.createElementNS(SVG_NAMESPACE, 'path')
  check.setAttribute('d', 'M58 50l12 12 24-26')
  check.setAttribute('fill', 'none')
  check.setAttribute('stroke-width', '6')
  check.setAttribute('stroke-linecap', 'round')
  check.setAttribute('stroke-linejoin', 'round')
  check.style.stroke = 'var(--color-success)'

  illustration.append(book, spine, check)
  return illustration
}

export function createEmptyState(): HTMLElement {
  const wrapper = document.createElement('div')
  wrapper.classList.add('empty-state')

  const title = document.createElement('p')
  title.classList.add('empty-state__title')
  title.textContent = 'Belum ada tugas'

  const description = document.createElement('p')
  description.classList.add('empty-state__description')
  description.textContent = 'Tambahkan tugas baru lewat form di atas.'

  wrapper.append(createIllustration(), title, description)
  return wrapper
}
