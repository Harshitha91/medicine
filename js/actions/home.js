// @flow
import { GET_SCHEDULE_CALANDAR, RECEIVE_SCHEDULE_CALANDAR } from "constant";
export function getScheduleCalandar(date) {
  console.log("111111111111111111111111111111111111111");
  return {
    type: GET_SCHEDULE_CALANDAR,
    date,
  };
}

export function receiveScheduleCalandar(data) {
  console.log("4444444444444444444444444444444");
  return {
    type: RECEIVE_SCHEDULE_CALANDAR,
    data,
  };
}

export function updateTakenStatus(data) {
  console.log("111111111111111111111111111111111111111");
  return {
    type: "UPDATE_FREQUENCY_STATUS",
    data,
  };
}

export function receiveUpdatedTakenStatus(data) {
  return {
    type: "RECEIVE_UPDATE_FREQUENCY_STATUS",
    data,
  };
}
