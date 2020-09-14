export function getMedicineList() {
  return {
    type: "GET_MEDICINE_LIST",
  };
}

export function receiveMedicineList(data) {
  return {
    type: "RECEIVE_MEDICINE_LIST",
    data,
  };
}

export function saveMedicine(data, componentId) {
  return {
    type: "SAVE_MEDICINE",
    data,
    componentId,
  };
}

export function searchFilter(text) {
  return {
    type: "SEARCH_FILTER",
    text,
  };
}
