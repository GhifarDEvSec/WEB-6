import type { AboutItem, PipelineStep } from '../types'
import { aboutItems, pipelineSteps } from '../data/aboutContent'

function appendInlineCode(text: string): DocumentFragment {
  const fragment = document.createDocumentFragment()
  const parts = text.split('`')

  parts.forEach((part, index) => {
    if (!part) {
      return
    }

    if (index % 2 === 1) {
      const code = document.createElement('code')
      code.classList.add('about-code')
      code.textContent = part
      fragment.append(code)
      return
    }

    fragment.append(document.createTextNode(part))
  })

  return fragment
}

function createTopic(item: AboutItem, index: number): HTMLDetailsElement {
  const details = document.createElement('details')
  details.classList.add('about-topic')
  details.open = index === 0

  const summary = document.createElement('summary')
  summary.classList.add('about-topic__summary')
  summary.textContent = item.title

  const content = document.createElement('div')
  content.classList.add('about-topic__content')

  const body = document.createElement('p')
  body.classList.add('about-topic__body')
  body.append(appendInlineCode(item.body))

  const list = document.createElement('ul')
  list.classList.add('about-topic__points')

  item.points.forEach((point) => {
    const entry = document.createElement('li')
    entry.append(appendInlineCode(point))
    list.append(entry)
  })

  content.append(body, list)
  details.append(summary, content)
  return details
}

function createPipeline(steps: PipelineStep[]): HTMLDivElement {
  const wrapper = document.createElement('div')
  wrapper.classList.add('about-pipeline')

  const title = document.createElement('h3')
  title.classList.add('about-pipeline__title')
  title.textContent = 'Alur dari Kode ke Website'

  const list = document.createElement('ol')
  list.classList.add('pipeline')

  steps.forEach((step, index) => {
    const item = document.createElement('li')
    item.classList.add('pipeline-step')

    const number = document.createElement('span')
    number.classList.add('pipeline-step__index')
    number.textContent = String(index + 1)

    const label = document.createElement('span')
    label.classList.add('pipeline-step__label')
    label.textContent = step.label

    const description = document.createElement('span')
    description.classList.add('pipeline-step__description')
    description.textContent = step.description

    item.append(number, label, description)
    list.append(item)
  })

  wrapper.append(title, list)
  return wrapper
}

export function renderAboutSection(container: HTMLElement): void {
  container.replaceChildren()

  const wrapper = document.createElement('div')
  wrapper.classList.add('about')

  const title = document.createElement('h2')
  title.classList.add('about__title')
  title.textContent = 'Tentang Proyek'

  const intro = document.createElement('p')
  intro.classList.add('about__intro')
  intro.textContent =
    'Penjelasan singkat teknologi dan alur kerja yang dipakai pada aplikasi ini.'

  const topics = document.createElement('div')
  topics.classList.add('about-topics')

  aboutItems.forEach((item, index) => {
    topics.append(createTopic(item, index))
  })

  wrapper.append(title, intro, topics, createPipeline(pipelineSteps))
  container.append(wrapper)
}
