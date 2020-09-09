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
    case GET_SCHEDULE_CALANDAR:
      console.log("2222222222222222222222222222222222222222");
      return { ...state, loading: true };
    case RECEIVE_SCHEDULE_CALANDAR:
      return { ...state, data: action.data, loading: false };
    default:
      return state;
  }
}
