// @flow
import { takeEvery, put, call, select } from "redux-saga/effects";
import { GET_SCHEDULE_CALANDAR } from "constant";
import { Navigation } from "react-native-navigation";
import {
  receiveScheduleCalandar,
  setState,
  receiveUpdatedTakenStatus,
} from "actions";
import { save, get } from "api/adapter";

function* getScheduleCalandar(action) {
  try {
    // let data = {
    //   "2020-08-15": [{ name: "item 1 - any js object" }],
    //   "2020-08-16": [{ name: "item 2 - any js object", height: 80 }],
    //   "2020-09-09": [
    //     { name: "Panadol", time: "9 PM", isTaken: false },
    //     { name: "Zitracine", time: "10 PM", isTaken: true },
    //   ],
    // };
    const data = yield call(get, `patient/schedule/daily?date=${action.date}`);
    let formattedData =
      data &&
      data.data.map((item) => {
        let formattedTime = item.time.substring(0, item.time.length - 3);
        let time = formattedTime
          .toString()
          .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [formattedTime];
        if (time.length > 1) {
          // If time format correct
          time = time.slice(1); // Remove full string match value
          time[5] = +time[0] < 12 ? "AM" : "PM"; // Set AM/PM
          time[0] = +time[0] % 12 || 12; // Adjust hours
        }

        console.log("LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL33333222", item);
        return {
          id: item.id,
          name: item.medicine.preferred_name,
          time: time.join(""),
          status: item.status,
        };
      });
    let newData = {
      [action.date]: formattedData,
    };
    yield put(receiveScheduleCalandar(newData));
  } catch (error) {
    console.log("LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL33333", error);
  }
}

function* updateFrequencyStatus(action) {
  try {
    const data = yield call(save, "patient/schedule/update", action.data, null);
    console.log("DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD", data);
    yield put(receiveUpdatedTakenStatus(action.data));
  } catch (error) {}
}

export default function* () {
  yield takeEvery(GET_SCHEDULE_CALANDAR, getScheduleCalandar);
  yield takeEvery("UPDATE_FREQUENCY_STATUS", updateFrequencyStatus);
}
