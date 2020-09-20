// @flow
import { combineReducers } from "redux";
// import reducers
import app from "./app";
import form from "./form";
import user from "./user";
import home from "./home";
import schedule from "./schedule";
import medicine from "./medicine";
import doctor from "./doctor";
import lab from "./lab";

const appReducer = combineReducers({
  app,
  form,
  user,
  home,
  schedule,
  medicine,
  doctor,
  lab,
});

const rootReducer = (state = {}, action) => {
  let nextState = state;
  if (action.type === "CLEAR_STATE") {
    nextState = {};
  }
  //   if (action.type === "CLEAN_STATE" || action.type === "USER_LOGOUT") {
  //     nextState = {
  //       settings: state.settings,
  //       userProfile: state.userProfile,
  //       calendar: state.calendar,
  //       app: {
  //         networkStatus: state.app.networkStatus,
  //         orientation: state.app.orientation,
  //         sessionObject: state.app.sessionObject,
  //         root: state.app.root
  //       }
  //     };
  //   }
  return appReducer(nextState, action);
};

export default rootReducer;
