// @flow
import { takeEvery, put, call, select } from "redux-saga/effects";
import { GET_SCHEDULE_CALANDAR } from "constant";
import { Navigation } from "react-native-navigation";
import { receiveDropdownMedicines, setState } from "actions";
import { showInAppNotification } from "util/NavigationActions";
import { save, get, getEnvironment } from "api/adapter";
import { receiveMedicineList } from "../actions/medicine";

export function* saveMedicine(action) {
  console.log("JJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJ", action.data);
  try {
    const savedComplain = yield call(
      save,
      "patient/add-medicine",
      { ...action.data, patient_id: 12, medicine_id: 2 },
      null
    );

    yield call(
      showInAppNotification,
      "success",
      "Successfully Added new Medicine.",
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
      "Error occured while adding Medicine",
      5000
    );
  }
}

export function* getMedicineList(action) {
  try {
    const medicines = yield call(get, "patient/get-medicine");
    console.log("1111111111111111111111111111111111111", medicines);
    yield put(receiveMedicineList(medicines.result));
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

export function* searchFilter(action) {
  try {
    const medicines = yield call(
      getEnvironment,
      `https://clinicaltables.nlm.nih.gov/api/rxterms/v3/search?terms=${action.text}&ef=STRENGTHS_AND_FORMS`
    );
    console.log("2222222222222222222222222222222222222222222", medicines);
    if (medicines && medicines[1]) {
      let formattedMedicines = [];
      for (let index = 0; index < medicines[1].length; index++) {
        const medicine_name = medicines[1][index];
        const medicine_stength = medicines[2]["STRENGTHS_AND_FORMS"][index];
        formattedMedicines.push({ medicine_name, medicine_stength });
      }
      yield put(setState({ filterData: formattedMedicines }));
    }
  } catch (error) {
    console.log("errortrrrrrrrrrrrrrrrrr", error);
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
  yield takeEvery("SAVE_MEDICINE", saveMedicine);
  yield takeEvery("GET_MEDICINE_LIST", getMedicineList);
  yield takeEvery("SEARCH_FILTER", searchFilter);
}
