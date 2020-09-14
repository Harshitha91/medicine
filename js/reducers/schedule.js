// @flow
import { RECEIVE_SCHEDULE_CALANDAR, GET_SCHEDULE_CALANDAR } from "constant";

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

export default function (state = {}, action) {
  switch (action.type) {
    case "GET_DROPDOWN_MEDICINES":
    case "GET_SCHEDULE_LIST":
      return { ...state, loading: true };
    case "RECEIVE_SCHEDULE_LIST":
      return { ...state, list: [...action.data], loading: false };
    case "RECEIVE_DROPDOWN_MEDICINES":
      return { ...state, medicines: [...action.data], loading: false };
    default:
      return state;
  }
}
