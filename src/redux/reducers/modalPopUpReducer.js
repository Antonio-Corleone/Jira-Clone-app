import * as actModal from '../constants';
import React from 'react';


const initialState = {
  visible: false,
  title: '',
  componentContent: <p>Default content</p>,
  callBackSubmit: () => { alert('this is a submit') }
}

const modalPopUpRenderer = (state = initialState, action) => {
  switch (action.type) {
    case actModal.OPEN_MODAL_POPUP:
      return { ...state, visible: true }

    case actModal.CLOSE_MODAL_POPUP:
      return { ...state, visible: false }

    case actModal.OPEN_EDIT_MODAL_POPUP:
      return { ...state, visible: true, title: action.title, componentContent: action.component }

    case actModal.SUBMIT_EDIT_MODAL:
      return { ...state, callBackSubmit: action.submitForm }

    case actModal.OPEN_CREATE_TASK_MODAL:
      return { ...state, visible: true, title: action.title, componentContent: action.component }
    case actModal.SUBMIT_TASK_MODAL:
      return { ...state, callBackSubmit: action.submitForm }
    default:
      return state
  }
};

export default modalPopUpRenderer;
