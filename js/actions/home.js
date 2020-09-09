// @flow
import { GET_SCHEDULE_CALANDAR, RECEIVE_SCHEDULE_CALANDAR } from "constant";
export function getScheduleCalandar() {
  console.log("111111111111111111111111111111111111111");
  return {
    type: GET_SCHEDULE_CALANDAR,
  };
}

export function receiveScheduleCalandar(data) {
  console.log("4444444444444444444444444444444");
  return {
    type: RECEIVE_SCHEDULE_CALANDAR,
    data,
  };
}
