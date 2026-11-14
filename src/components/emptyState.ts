export function createEmptyState(): HTMLElement {
  const wrapper = document.createElement('div')

  const title = document.createElement('p')
  title.textContent = 'Belum ada tugas'

  const description = document.createElement('p')
  description.textContent = 'Tambahkan tugas baru lewat form di atas.'

  wrapper.append(title, description)
  return wrapper
}
