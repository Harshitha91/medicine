// @flow
import { takeEvery, put, call, select } from "redux-saga/effects";
import { GET_SCHEDULE_CALANDAR } from "constant";
import { Navigation } from "react-native-navigation";
import { receiveScheduleCalandar, setState } from "actions";

function* getScheduleCalandar(action) {
  try {
    let data = {
      "2020-08-15": [{ name: "item 1 - any js object" }],
      "2020-08-16": [{ name: "item 2 - any js object", height: 80 }],
      "2020-09-09": [
        { name: "Panadol", time: "9 PM", isTaken: false },
        { name: "Zitracine", time: "10 PM", isTaken: true },
      ],
    };
    console.log("33333333333333333333333333333333333333333333");
    yield put(receiveScheduleCalandar(data));
  } catch (error) {}
}

export default function* () {
  yield takeEvery(GET_SCHEDULE_CALANDAR, getScheduleCalandar);
}
