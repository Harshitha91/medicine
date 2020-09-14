// @flow
import { GET_SCHEDULE_CALANDAR, RECEIVE_SCHEDULE_CALANDAR } from "constant";
export function saveSchedule(data, componentId) {
  console.log("111111111111111111111111111111111111111");
  return {
    type: "SAVE_SCHEDULE",
    data,
    componentId,
  };
}

export function getDropdownMedicines() {
  return {
    type: "GET_DROPDOWN_MEDICINES",
  };
}

export function receiveDropdownMedicines(data) {
  return {
    type: "RECEIVE_DROPDOWN_MEDICINES",
    data,
  };
}

export function getScheduleList() {
  return {
    type: "GET_SCHEDULE_LIST",
  };
}

export function receiveScheduleList(data) {
  return {
    type: "RECEIVE_SCHEDULE_LIST",
    data,
  };
}
