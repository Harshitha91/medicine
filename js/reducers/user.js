export default function (state = {}, action) {
  switch (action.type) {
    case "GET_USER_DETAILS":
      return { ...state, loading: true };
    case "RECEIVE_USER_DATA":
      return { ...state, userDeatails: { ...action.data }, loading: false };
    default:
      return state;
  }
}
