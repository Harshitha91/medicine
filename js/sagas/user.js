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

    // const userDetails = yield call(login, action.data);
    // yield AsyncStorage.setItem(SESSION, JSON.stringify(userDetails));

    // yield put(setState({ sessionObject: userDetails }));
    // yield put(updateUserDeviceIdAction(action.fcmData, action.componentId))
    // yield call(sessionHandling);
  } catch (error) {
    yield put(setState({ btnState: false }));
  }
}

export function* sessionHandling(action) {
  try {
    const sessionString = yield AsyncStorage.getItem(SESSION);

    if (sessionString && sessionString !== null) {
      // yield call(goHome, 1);
      yield call(goToSignIn);
    } else {
      yield call(goToSignIn);
    }
  } catch (err) {
    console.log("error: ", err);
  }
}

export function* saveUser(action) {
  try {
    const savedUser = yield call(
      save,
      "api/accounts/create",
      action.data,
      null
    );
    yield put(setState({ savedUser }));
    yield AsyncStorage.setItem(VERIFIED_USER, "false");
    yield AsyncStorage.setItem(USER_SIGNUP_DATA, JSON.stringify(savedUser));
    yield put(resetForms());
    // yield Navigation.push(action.componentId, {
    //   component: {
    //     name: "VerifyPIN",
    //     options: {
    //       topBar: {
    //         visible: true,
    //         height: 50,
    //         topMargin: 35,
    //         borderHeight: 0,
    //         elevation: 0,
    //         title: {
    //           text: "Verification Code",
    //           alignment: "center",
    //           fontSize: 25,
    //           fontFamily: "Ubuntu-Bold",
    //         },
    //         background: {
    //           color: "#FFFFFF",
    //         },
    //         backButton: {
    //           visible: false,
    //         },
    //       },
    //     },
    //   },
    // });
    yield put(setState({ btnState: false }));
  } catch (error) {
    // yield put(setState({ btnState: false }));
    // if (error.response) {
    //   yield call(showInAppNotification, "error", error.response.data, 5000);
    // }
  }
}

export default function* () {
  yield takeEvery(AUTH_USER, authenticateUser);
  yield takeEvery(SESSION_HANDLING, sessionHandling);
  yield takeEvery(SAVE_USER, saveUser);
}
