import type { TaskFilter } from '../types'

interface TaskFilterOptions {
  activeFilter: TaskFilter
  onChange: (filter: TaskFilter) => void
}

const FILTER_OPTIONS: Array<{ value: TaskFilter; label: string }> = [
  { value: 'semua', label: 'Semua' },
  { value: 'belum_selesai', label: 'Belum Selesai' },
  { value: 'selesai', label: 'Selesai' },
]

export function renderTaskFilter(container: HTMLElement, options: TaskFilterOptions): void {
  container.replaceChildren()

  const group = document.createElement('div')
  group.classList.add('task-filter')
  group.setAttribute('role', 'group')
  group.setAttribute('aria-label', 'Filter tugas')

  FILTER_OPTIONS.forEach(({ value, label }) => {
    const isActive = value === options.activeFilter
    const button = document.createElement('button')
    button.type = 'button'
    button.classList.add('filter-button')
    button.textContent = label
    button.setAttribute('aria-pressed', String(isActive))

    if (isActive) {
      button.classList.add('filter-button--active')
    }

    button.addEventListener('click', () => {
      options.onChange(value)
    })

    group.append(button)
  })

  container.append(group)
}
