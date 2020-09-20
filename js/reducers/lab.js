export default function (state = {}, action) {
  switch (action.type) {
    case "GET_LAB_APPOINMENT_LIST":
      return { ...state, loading: true };
    case "RECEIVE_LAB_APPOINMENT_LIST":
      return { ...state, list: [...action.data], loading: false };
    default:
      return state;
  }
}
