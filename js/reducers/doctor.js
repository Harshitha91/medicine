export default function (state = {}, action) {
  switch (action.type) {
    case "GET_DOCTOR_APPOINMENT_LIST":
    case "GET_CHANNELING_CENTERS":
    case "GET_DOCTORS_LIST":
      return { ...state, loading: true };
    case "RECEIVE_DOCTOR_APPOINMENT_LIST":
      return { ...state, appoinmets: [...action.data], loading: false };
    case "RECEIVE_CHANNELING_CENTERS":
      return { ...state, channelingCenters: [...action.data], loading: false };
    case "RECEIVE_DOCTORS_LIST":
      return { ...state, doctors: [...action.data], loading: false };
    case "RECEIVE_CHANNEL_LIST":
      return { ...state, channels: [...action.data], loading: false };
    default:
      return state;
  }
}
