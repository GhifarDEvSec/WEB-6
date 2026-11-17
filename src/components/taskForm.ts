import type { FormMode, Task, TaskInput } from '../types'

interface TaskFormOptions {
  onSubmit: (input: TaskInput, mode: FormMode) => void
  onCancel: () => void
}

export interface TaskFormController {
  startEdit: (task: Task) => void
  resetToAdd: () => void
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

export function renderTaskForm(
  container: HTMLElement,
  options: TaskFormOptions,
): TaskFormController {
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

  const cancelButton = document.createElement('button')
  cancelButton.type = 'button'
  cancelButton.classList.add('button-secondary')
  cancelButton.textContent = 'Batal'
  cancelButton.hidden = true

  const actions = document.createElement('div')
  actions.classList.add('form-actions')
  actions.append(submitButton, cancelButton)

  let currentMode: FormMode = { mode: 'tambah', taskId: null }

  function resetToAdd(): void {
    currentMode = { mode: 'tambah', taskId: null }
    form.reset()
    form.classList.remove('task-form--edit')
    titleError.textContent = ''
    dueDateError.textContent = ''
    submitButton.textContent = 'Tambah Tugas'
    cancelButton.hidden = true
  }

  function startEdit(task: Task): void {
    currentMode = { mode: 'ubah', taskId: task.id }
    titleInput.value = task.title
    courseInput.value = task.course
    dueDateInput.value = task.dueDate
    noteInput.value = task.note
    titleError.textContent = ''
    dueDateError.textContent = ''
    form.classList.add('task-form--edit')
    submitButton.textContent = 'Simpan Perubahan'
    cancelButton.hidden = false

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    form.scrollIntoView({
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
      block: 'start',
    })
    titleInput.focus({ preventScroll: true })
  }

  cancelButton.addEventListener('click', () => {
    resetToAdd()
    options.onCancel()
  })

  form.addEventListener('submit', (event) => {
    event.preventDefault()

    const title = titleInput.value.trim()
    const dueDate = dueDateInput.value.trim()

    titleError.textContent = title ? '' : 'Judul wajib diisi'
    dueDateError.textContent = dueDate ? '' : 'Tenggat wajib diisi'

    if (!title || !dueDate) {
      return
    }

    options.onSubmit(
      {
        title,
        course: courseInput.value.trim(),
        dueDate,
        note: noteInput.value.trim(),
      },
      currentMode,
    )

    resetToAdd()
  })

  form.append(
    heading,
    row,
    createField('Tenggat', dueDateInput, dueDateError),
    createField('Catatan', noteInput),
    actions,
  )

  container.append(form)

  return { startEdit, resetToAdd }
}
