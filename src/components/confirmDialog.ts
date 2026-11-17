export function confirmDelete(taskTitle: string): Promise<boolean> {
  return new Promise<boolean>((resolve) => {
    const triggerElement =
      document.activeElement instanceof HTMLElement ? document.activeElement : null

    const dialog = document.createElement('dialog')
    dialog.classList.add('confirm-dialog')

    const title = document.createElement('h2')
    title.classList.add('confirm-dialog__title')
    title.textContent = 'Hapus tugas ini?'

    const message = document.createElement('p')
    message.classList.add('confirm-dialog__message')
    message.textContent = `Tugas "${taskTitle}" akan dihapus permanen.`

    const actions = document.createElement('div')
    actions.classList.add('confirm-dialog__actions')

    const confirmButton = document.createElement('button')
    confirmButton.type = 'button'
    confirmButton.classList.add('button-danger')
    confirmButton.textContent = 'Hapus'

    const cancelButton = document.createElement('button')
    cancelButton.type = 'button'
    cancelButton.classList.add('button-secondary')
    cancelButton.textContent = 'Batal'

    actions.append(confirmButton, cancelButton)

    function finish(result: boolean): void {
      dialog.close()
      dialog.remove()

      if (triggerElement) {
        triggerElement.focus()
      }

      resolve(result)
    }

    confirmButton.addEventListener('click', () => {
      finish(true)
    })

    cancelButton.addEventListener('click', () => {
      finish(false)
    })

    dialog.addEventListener('cancel', (event) => {
      event.preventDefault()
      finish(false)
    })

    dialog.append(title, message, actions)
    document.body.append(dialog)
    dialog.showModal()
    confirmButton.focus()
  })
}
