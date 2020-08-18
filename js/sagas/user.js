// @flow
import { takeEvery, put, call, select, cancel } from "redux-saga/effects";
import { Alert, Platform } from "react-native";
import * as RNIap from "react-native-iap";
import { SAVE_USER, SESSION, AUTH_USER, SESSION_HANDLING } from "constant";
import { save, login, get, getEnvironment } from "api/adapter";
import {
  resetForms,
  setState,
  updateUserDeviceId as updateUserDeviceIdAction,
  receiveAllComplainers,
} from "actions";
import { goToSignIn, goHome } from "../screens/navigation";
import AsyncStorage from "@react-native-community/async-storage";

export function* authenticateUser(action) {
  try {
    yield AsyncStorage.setItem(SESSION, "vjgkvgkghjvvjh");
    yield call(sessionHandling);
    //yield put(resetForms());
  } catch (error) {
    yield put(setState({ btnState: false }));
  }
}

export function* sessionHandling(action) {
  try {
    const sessionString = yield AsyncStorage.getItem(SESSION);

    console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", sessionString);

    if (sessionString && sessionString !== null) {
      // yield put(setState({ sessionObject }));
      // yield getAvailablePurchases(action);
      yield call(goHome, 1);
    } else {
      yield call(goToSignIn);
    }
  } catch (err) {
    console.log("error: ", err);
  }
}

export default function* () {
  yield takeEvery(AUTH_USER, authenticateUser);
  yield takeEvery(SESSION_HANDLING, sessionHandling);
}
