// @flow
import { takeEvery, put, call, select } from "redux-saga/effects";
import { GET_SCHEDULE_CALANDAR } from "constant";
import { Navigation } from "react-native-navigation";
import { receiveDropdownMedicines, setState } from "actions";
import { showInAppNotification } from "util/NavigationActions";
import { save, get } from "api/adapter";
import { receiveScheduleList } from "../actions/schedule";

function* getDropDownMedicines(action) {
  try {
    const medicines = yield call(get, "patient/get-medicine");
    console.log("VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV", medicines);
    if (medicines && medicines.result) {
      let formattedMedicines = medicines.result.map((medi) => {
        return { value: medi.id, label: medi.preferred_name };
      });
      yield put(receiveDropdownMedicines(formattedMedicines));
    }
  } catch (error) {
    console.log("VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV2222", error);
  }
}

export function* saveSchedule(action) {
  console.log("JJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJ", action.data);
  try {
    const savedComplain = yield call(
      save,
      "patient/schedule/store",
      { ...action.data },
      null
    );

    yield call(
      showInAppNotification,
      "success",
      "Successfully Added new Schedule.",
      5000
    );
    yield Navigation.pop(action.componentId);
    yield put(setState({ btnState: false }));
  } catch (error) {
    console.log("error", error);
    yield put(setState({ btnState: false }));
    yield call(
      showInAppNotification,
      "error",
      "Error occured while adding Schedule",
      5000
    );
  }
}

export function* getScheduleList(action) {
  try {
    const schedules = yield call(get, "patient/schedule/all");
    console.log("wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww", schedules);
    yield put(receiveScheduleList(schedules.result));
  } catch (error) {
    console.log("error", error);
    yield put(setState({ btnState: false }));
    yield call(
      showInAppNotification,
      "error",
      "Error occured while adding Schedule",
      5000
    );
  }
}

export default function* () {
  yield takeEvery("GET_DROPDOWN_MEDICINES", getDropDownMedicines);
  yield takeEvery("SAVE_SCHEDULE", saveSchedule);
  yield takeEvery("GET_SCHEDULE_LIST", getScheduleList);
}
