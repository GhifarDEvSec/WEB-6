import type { TaskSummary } from '../types'

interface SummaryItem {
  label: string
  value: number
  modifier: string
}

export function renderSummaryPanel(container: HTMLElement, summary: TaskSummary): void {
  container.replaceChildren()

  const panel = document.createElement('div')
  panel.classList.add('summary-panel')
  panel.setAttribute('aria-label', 'Ringkasan tugas')

  const items: SummaryItem[] = [
    { label: 'Total', value: summary.total, modifier: 'summary-card--total' },
    { label: 'Belum Selesai', value: summary.belumSelesai, modifier: 'summary-card--pending' },
    { label: 'Selesai', value: summary.selesai, modifier: 'summary-card--done' },
  ]

  items.forEach((item) => {
    const card = document.createElement('div')
    card.classList.add('summary-card', item.modifier)

    const value = document.createElement('span')
    value.classList.add('summary-card__value')
    value.textContent = String(item.value)

    const label = document.createElement('span')
    label.classList.add('summary-card__label')
    label.textContent = item.label

    card.append(value, label)
    panel.append(card)
  })

  container.append(panel)
}
