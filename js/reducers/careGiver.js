export default function (state = {}, action) {
  switch (action.type) {
    case "GET_CARE_GIVERS":
      return { ...state, loaderCareGiverList: true };
    case "RECEIVE_CARE_GIVERS":
      return { ...state, list: [...action.data], loaderCareGiverList: false };
    case "CLEAR_CARE_GIVERS":
      return {};
    default:
      return state;
  }
}
