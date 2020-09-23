// @flow
import { takeEvery, put, call, select } from "redux-saga/effects";
import { GET_SCHEDULE_CALANDAR } from "constant";
import { Navigation } from "react-native-navigation";
import { receiveDropdownMedicines, setState } from "actions";
import { showInAppNotification } from "util/NavigationActions";
import { save, get, getEnvironment } from "api/adapter";
import {
  receiveDoctorAppoinmentList,
  receiveChannelingCenters,
  receiveDoctorsList,
  receiveDChannelList,
} from "../actions/doctor";
import moment from "moment";

export function* getDoctorAppoinmentList(action) {
  try {
    const doctorAppoinments = yield call(get, "patient/appointments/all");
    console.log("00000000000000000000000000000000000000", doctorAppoinments);
    yield put(receiveDoctorAppoinmentList(doctorAppoinments.result));
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

export function* getChannelingCenters(action) {
  try {
    const channelingCenters = yield call(
      get,
      "patient/appointments/channeling-centers/all"
    );
    console.log(
      "000000000000000000000000000000000000001111",
      channelingCenters
    );
    yield put(receiveChannelingCenters(channelingCenters.result));
  } catch (error) {
    console.log("error", error);
    yield put(setState({ btnState: false }));
    yield call(
      showInAppNotification,
      "error",
      "Error occured while getting Channeling Centers.",
      5000
    );
  }
}

export function* getDoctorsList(action) {
  try {
    let urlString = `patient/appointments/doctors?channeling_center_id=${action.data.channeling_center_id}`;
    if (action.data.date) {
      let date = moment.unix(action.data.date).format("YYYY-MM-DD");
      urlString = urlString + `&date=${date}`;
    }
    if (action.data.speciality) {
      urlString = urlString + `&speciality=${action.data.speciality}`;
    }

    console.log("00000000000000000000000000000000000000222222", urlString);
    const doctors = yield call(get, urlString);
    console.log("000000000000000000000000000000000000001111", doctors);
    yield put(receiveDoctorsList(doctors.result));
  } catch (error) {
    console.log("errorrrrrrrrrrrrrr", error);
    yield put(setState({ btnState: false }));
    yield call(
      showInAppNotification,
      "error",
      "Error occured while getting Channeling Centers.",
      5000
    );
  }
}

export function* getChannelList(action) {
  try {
    let urlString = `patient/appointments/channels?doctor_id=${action.doctorId}&channeling_center_id=${action.channellingCenterId}`;

    console.log("00000000000000000000000000000000000000222222", urlString);
    const channels = yield call(get, urlString);
    console.log("000000000000000000000000000000000000001111", channels);
    yield put(receiveDChannelList(channels.result));
  } catch (error) {
    console.log("errorrrrrrrrrrrrrr", error);
    yield put(setState({ btnState: false }));
    yield call(
      showInAppNotification,
      "error",
      "Error occured while getting Channeling Centers.",
      5000
    );
  }
}

export function* bookAppoinment(action) {
  try {
    const channels = yield call(save, "patient/appointment/book");
    yield call(
      showInAppNotification,
      "success",
      "Successfully Made Appoinment.",
      5000
    );
    yield Navigation.pop(action.componentId);
  } catch (error) {
    console.log("errorrrrrrrrrrrrrr", error);
    yield put(setState({ btnState: false }));
    yield call(
      showInAppNotification,
      "error",
      "Error occured while getting Channeling Centers.",
      5000
    );
  }
}

export default function* () {
  yield takeEvery("GET_DOCTOR_APPOINMENT_LIST", getDoctorAppoinmentList);
  yield takeEvery("GET_CHANNELING_CENTERS", getChannelingCenters);
  yield takeEvery("GET_DOCTORS_LIST", getDoctorsList);
  yield takeEvery("GET_CHANNEL_LIST", getChannelList);
  yield takeEvery("BOOK_APPOINMENT", bookAppoinment);
}
