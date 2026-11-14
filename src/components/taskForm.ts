import type { TaskInput } from '../types'

interface TaskFormOptions {
  onSubmit: (input: TaskInput) => void
}

type FormControl = HTMLInputElement | HTMLTextAreaElement

function createField(
  labelText: string,
  control: FormControl,
  errorMessage?: HTMLParagraphElement,
): HTMLDivElement {
  const wrapper = document.createElement('div')
  wrapper.classList.add('field')

  const label = document.createElement('label')
  label.htmlFor = control.id
  label.textContent = labelText
  wrapper.append(label)

  if (errorMessage) {
    const errorId = `${control.id}-error`
    errorMessage.id = errorId
    errorMessage.classList.add('field-error')
    errorMessage.textContent = ''
    control.setAttribute('aria-describedby', errorId)
  }

  wrapper.append(control)

  if (errorMessage) {
    wrapper.append(errorMessage)
  }

  return wrapper
}

export function renderTaskForm(container: HTMLElement, options: TaskFormOptions): void {
  container.replaceChildren()

  const form = document.createElement('form')
  form.classList.add('task-form')

  const heading = document.createElement('h2')
  heading.classList.add('form-title')
  heading.textContent = 'Form Tugas'

  const titleInput = document.createElement('input')
  titleInput.type = 'text'
  titleInput.name = 'title'
  titleInput.id = 'task-title'

  const courseInput = document.createElement('input')
  courseInput.type = 'text'
  courseInput.name = 'course'
  courseInput.id = 'task-course'

  const dueDateInput = document.createElement('input')
  dueDateInput.type = 'date'
  dueDateInput.name = 'dueDate'
  dueDateInput.id = 'task-due-date'

  const noteInput = document.createElement('textarea')
  noteInput.name = 'note'
  noteInput.id = 'task-note'

  const titleError = document.createElement('p')
  const dueDateError = document.createElement('p')

  const row = document.createElement('div')
  row.classList.add('form-row')
  row.append(
    createField('Judul', titleInput, titleError),
    createField('Mata Kuliah', courseInput),
  )

  const submitButton = document.createElement('button')
  submitButton.type = 'submit'
  submitButton.classList.add('button-primary')
  submitButton.textContent = 'Tambah Tugas'

  form.append(
    heading,
    row,
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
