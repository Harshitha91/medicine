import { fork, all } from "redux-saga/effects";
import app from "./app";
import user from "./user";

export default function* rootSaga() {
  yield all([fork(app), fork(user)]);
}
