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
    case "UPDATE_FREQUENCY_STATUS":
      return { ...state, loading: true };
    case RECEIVE_SCHEDULE_CALANDAR:
      return { ...state, data: action.data, loading: false };
    case "RECEIVE_UPDATE_FREQUENCY_STATUS":
      const formattedState = state.data[action.data.date].map((item) => {
        if (item.id === action.data.frequency_id) {
          return { ...item, status: action.data.status };
        }
        return item;
      });
      return {
        ...state,
        data: { [action.data.date]: formattedState },
        loading: false,
      };
    default:
      return state;
  }
}
