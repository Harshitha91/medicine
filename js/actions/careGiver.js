export function getCareGivers(name) {
  return {
    type: "GET_CARE_GIVERS",
    name,
  };
}

export function receiveCareGivers(data) {
  return {
    type: "RECEIVE_CARE_GIVERS",
    data,
  };
}

export function clearCareGiverList() {
  return {
    type: "CLEAR_CARE_GIVERS",
  };
}

export function inviteCareGiver(email, componentId) {
  return {
    type: "INVITE_CARE_GIVER",
    email,
    componentId,
  };
}
