export function getDoctorAppoinmentList() {
  return {
    type: "GET_DOCTOR_APPOINMENT_LIST",
  };
}

export function receiveDoctorAppoinmentList(data) {
  return {
    type: "RECEIVE_DOCTOR_APPOINMENT_LIST",
    data,
  };
}

export function getChannelingCenters() {
  return {
    type: "GET_CHANNELING_CENTERS",
  };
}

export function receiveChannelingCenters(data) {
  return {
    type: "RECEIVE_CHANNELING_CENTERS",
    data,
  };
}

export function getDoctorsList(data) {
  return {
    type: "GET_DOCTORS_LIST",
    data,
  };
}

export function receiveDoctorsList(data) {
  return {
    type: "RECEIVE_DOCTORS_LIST",
    data,
  };
}

export function getChannelList(doctorId, channellingCenterId) {
  return {
    type: "GET_CHANNEL_LIST",
    doctorId,
    channellingCenterId,
  };
}

export function receiveDChannelList(data) {
  return {
    type: "RECEIVE_CHANNEL_LIST",
    data,
  };
}
