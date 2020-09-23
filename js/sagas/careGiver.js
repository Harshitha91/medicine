// @flow
import { takeEvery, put, call, select } from "redux-saga/effects";
import { SCREEN_CHANGE } from "constant";
import { Navigation } from "react-native-navigation";
import { receiveCareGivers, setState } from "actions";
import { showInAppNotification } from "util/NavigationActions";
import { save, get, getEnvironment } from "api/adapter";

function* getCareGivers(action) {
  try {
    let urlString = "";
    if (action.name) {
      urlString = "patient/get-medicine";
    }
    const careGivers = yield call(get, urlString);
    yield put(receiveCareGivers(careGivers.result));
  } catch (error) {
    console.log("error", error);
    yield call(
      showInAppNotification,
      "error",
      "Error occured while getting Care Givers",
      5000
    );
  }
}

function* inviteCareGiver(action) {
  try {
    const careGivers = yield call(save, "patient/get-medicine");
    yield put(receiveCareGivers(careGivers.result));
  } catch (error) {
    yield call(
      showInAppNotification,
      "error",
      "Error occured while inviting Care Givers.",
      5000
    );
  }
}

export default function* () {
  yield takeEvery("GET_CARE_GIVERS", getCareGivers);
  yield takeEvery("INVITE_CARE_GIVER", inviteCareGiver);
}
