// @flow
import { takeEvery, put, call, select } from "redux-saga/effects";
import { SCREEN_CHANGE } from "constant";
import { Navigation } from "react-native-navigation";
import { fetchScreenChange, setState } from "actions";

function* changeScreen(action) {
  try {
    const visibleScreenInstanceId = yield Navigation.getCurrentlyVisibleScreenId();
    const state = { currentScreen: visibleScreenInstanceId.screenId };
    yield put(fetchScreenChange(state));
  } catch (error) {
    //TODO: Add error message here.
  }
  yield put(setState({ toggleForm: false }));
}

export default function*() {
  yield takeEvery(SCREEN_CHANGE, changeScreen);
}
