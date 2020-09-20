export function getLabAppoinmentList() {
  return {
    type: "GET_LAB_APPOINMENT_LIST",
  };
}

export function receiveLabAppoinmentList(data) {
  return {
    type: "RECEIVE_LAB_APPOINMENT_LIST",
    data,
  };
}
