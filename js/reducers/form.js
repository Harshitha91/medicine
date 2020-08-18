// @flow
import {
  ON_FIELD_CHANGE,
  RESET_FORMS,
  SET_FORM_FIELDS,
  SET_UPDATE_FORM_FIELDS,
  RESET_FORM,
  CHANGE_FORM_LOCALE,
  UPDATE_FORM_FIELDS,
  RESET_UPDATE_FORM_FIELDS
} from "constant";

const setOnChangeData = (state, actionData) => {
  return {
    ...state,
    [actionData.form]: {
      ...state[actionData.form],
      [actionData.name]: actionData.value
    }
  };
};

const setForm = (state, form) => {
  return {
    ...state,
    [form.name]: form.value
  };
};
const setUpdateForm = (
  state,
  form
) => {
  return {
    ...state,
    [`${form.name}_update`]: form.value
  };
};
const resetUpdateForm = (state, form) => {
  return {
    ...state,
    [`${form}_update`]: {}
  };
};
const updateForm = (state, form) => {
  return {
    ...state,
    [form.name]: { ...state[form.name], ...form.value }
  };
};
const resetForm = (state, formName) => {
  return Object.assign({}, state, { [formName]: {} });
};

export default function(state = {}, action) {
  switch (action.type) {
    case ON_FIELD_CHANGE:
      return setOnChangeData(state, action.state);
    case RESET_FORMS:
      return { frmLocale: action.locale };
    case RESET_FORM:
      return resetForm(state, action.formName);
    case SET_FORM_FIELDS:
      return setForm(state, action.form);
    case SET_UPDATE_FORM_FIELDS:
      return setUpdateForm(state, action.form);
    case UPDATE_FORM_FIELDS:
      return updateForm(state, action.form);
    case RESET_UPDATE_FORM_FIELDS:
      return resetUpdateForm(state, action.form);
    case CHANGE_FORM_LOCALE:
      return { ...state, frmLocale: action.locale };
    default:
      return state;
  }
}
