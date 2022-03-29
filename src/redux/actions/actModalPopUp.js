import * as actModal from '../constants'

export const actOpenModal = () => ({
  type: actModal.OPEN_MODAL_POPUP
});

export const actCloseModal = () => ({
  type: actModal.CLOSE_MODAL_POPUP
});

export const actOpenEditModal=(component) => ({
  type: actModal.OPEN_EDIT_MODAL_POPUP,
  component: component
})

export const actSubmitEditModal=(submitForm) => ({
  type: actModal.SUBMIT_EDIT_MODAL,
  submitForm: submitForm
})