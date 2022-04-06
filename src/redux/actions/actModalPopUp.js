import * as actModal from '../constants'

export const actOpenModal = () => ({
  type: actModal.OPEN_MODAL_POPUP
});

export const actCloseModal = () => ({
  type: actModal.CLOSE_MODAL_POPUP
});

export const actOpenEditModal = (component, title) => ({
  type: actModal.OPEN_EDIT_MODAL_POPUP,
  component: component,
  title: title
})

export const actSubmitEditModal = (submitForm) => ({
  type: actModal.SUBMIT_EDIT_MODAL,
  submitForm: submitForm
})

export const actOpenCreateTaskModal = (component, title) => ({
  type: actModal.OPEN_CREATE_TASK_MODAL,
  component: component,
  title: title
})

export const actSubmitTaskModal = (submitForm) => ({
  type: actModal.SUBMIT_TASK_MODAL,
  submitForm: submitForm
})