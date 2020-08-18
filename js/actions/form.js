// @flow
import {
  ON_FIELD_CHANGE,
  RESET_FORMS,
  SET_FORM_FIELDS,
  RESET_FORM,
  CHANGE_FORM_LOCALE,
  TRANSLITERATE,
  UPDATE_FORM_FIELDS,
  SET_UPDATE_FORM_FIELDS,
  RESET_UPDATE_FORM_FIELDS
} from "constant";

export const onFieldChange = (state)  => {
  return {
    type: ON_FIELD_CHANGE,
    state
  };
};

export const resetForms = ()  => {
  return {
    type: RESET_FORMS
  };
};

export const resetForm = (formName) => {
  return {
    type: RESET_FORM,
    formName
  };
};

export const setFormFields = (form) => {
  return {
    type: SET_FORM_FIELDS,
    form
  };
};

export const setUpdateFormFields = (form) => {
  return {
    type: SET_UPDATE_FORM_FIELDS,
    form
  };
};

export const updateFormFields = (form) => {
  return {
    type: UPDATE_FORM_FIELDS,
    form
  };
};

export const resetUpdateFormFields = (name) => {
  return {
    type: RESET_UPDATE_FORM_FIELDS,
    form: name
  };
};

export function setFormLocale(frmLocale) {
  return {
    type: CHANGE_FORM_LOCALE,
    locale: frmLocale
  };
}

export const translit = (data) => {
  return {
    type: TRANSLITERATE,
    data
  };
};
