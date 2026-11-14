import type { TaskInput } from '../types'

interface TaskFormOptions {
  onSubmit: (input: TaskInput) => void
}

function createField(
  labelText: string,
  control: HTMLElement,
  errorMessage?: HTMLParagraphElement,
): HTMLDivElement {
  const wrapper = document.createElement('div')
  const label = document.createElement('label')
  label.append(document.createTextNode(labelText), control)
  wrapper.append(label)

  if (errorMessage) {
    errorMessage.textContent = ''
    wrapper.append(errorMessage)
  }

  return wrapper
}

export function renderTaskForm(container: HTMLElement, options: TaskFormOptions): void {
  container.replaceChildren()

  const form = document.createElement('form')

  const titleInput = document.createElement('input')
  titleInput.type = 'text'
  titleInput.name = 'title'

  const courseInput = document.createElement('input')
  courseInput.type = 'text'
  courseInput.name = 'course'

  const dueDateInput = document.createElement('input')
  dueDateInput.type = 'date'
  dueDateInput.name = 'dueDate'

  const noteInput = document.createElement('textarea')
  noteInput.name = 'note'

  const titleError = document.createElement('p')
  const dueDateError = document.createElement('p')

  const submitButton = document.createElement('button')
  submitButton.type = 'submit'
  submitButton.textContent = 'Tambah Tugas'

  form.append(
    createField('Judul', titleInput, titleError),
    createField('Mata Kuliah', courseInput),
    createField('Tenggat', dueDateInput, dueDateError),
    createField('Catatan', noteInput),
    submitButton,
  )

  form.addEventListener('submit', (event) => {
    event.preventDefault()

    const title = titleInput.value.trim()
    const dueDate = dueDateInput.value.trim()

    titleError.textContent = title ? '' : 'Judul wajib diisi'
    dueDateError.textContent = dueDate ? '' : 'Tenggat wajib diisi'

    if (!title || !dueDate) {
      return
    }

    options.onSubmit({
      title,
      course: courseInput.value.trim(),
      dueDate,
      note: noteInput.value.trim(),
    })

    form.reset()
  })

  container.append(form)
}
