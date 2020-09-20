// @flow
import { takeEvery, put, call, select } from "redux-saga/effects";
import { GET_SCHEDULE_CALANDAR } from "constant";
import { Navigation } from "react-native-navigation";
import { receiveDropdownMedicines, setState } from "actions";
import { showInAppNotification } from "util/NavigationActions";
import { save, get, getEnvironment } from "api/adapter";
import { receiveLabAppoinmentList } from "../actions/lab";

export function* getLabAppoinmentList(action) {
  try {
    const medicines = yield call(get, "patient/get-medicine");
    console.log("1111111111111111111111111111111111111", medicines);
    yield put(receiveLabAppoinmentList(medicines));
  } catch (error) {
    console.log("error", error);
    yield put(setState({ btnState: false }));
    yield call(
      showInAppNotification,
      "error",
      "Error occured while adding Medicines",
      5000
    );
  }
}

export default function* () {
  yield takeEvery("GET_LAB_APPOINMENT_LIST", getLabAppoinmentList);
}
