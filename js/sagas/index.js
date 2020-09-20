import { fork, all } from "redux-saga/effects";
import app from "./app";
import user from "./user";
import home from "./home";
import schedule from "./schedule";
import medicine from "./medicine";
import doctor from "./doctor";
import lab from "./lab";

export default function* rootSaga() {
  yield all([
    fork(app),
    fork(user),
    fork(home),
    fork(schedule),
    fork(medicine),
    fork(doctor),
    fork(lab),
  ]);
}
