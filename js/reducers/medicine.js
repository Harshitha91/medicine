export default function (state = {}, action) {
  switch (action.type) {
    case "GET_MEDICINE_LIST":
      return { ...state, loading: true };
    case "RECEIVE_MEDICINE_LIST":
      return { ...state, list: [...action.data], loading: false };
    default:
      return state;
  }
}
