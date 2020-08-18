// @flow
import {
  SET_STATE,
  CLEAR_APP_STATE,
  SET_ERROR,
  CLEAR_ERROR,
  ROOT_CHANGED,
  REMOVE_STATE,
  ADD_TOAST
} from "constant";

function setState(state, newState) {
  return { ...state, ...newState };
}
function clearState() {
  return {};
}
function removeState(state, key) {
  const { [key]: value, ...newState } = state;
  return newState;
}

export const getAppState = (state) => state.app;

export default function (state = {}, action) {
  switch (action.type) {
    case SET_STATE:
      return setState(state, action.state);
    case CLEAR_APP_STATE:
      return clearState();
    case SET_ERROR:
      return { ...state, error: action.data };
    case CLEAR_ERROR:
      const { error: _, ...rest } = state;
      return { ...rest };
    case ROOT_CHANGED:
      return { ...state, root: action.root };
    case REMOVE_STATE:
      return removeState(state, action.key);
    case ADD_TOAST:
      return { ...state, toastMessage: action.message };
    default:
      return state;
  }
}
