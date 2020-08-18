// @flow
import {
    SET_STATE,
    CLEAR_STATE,
    CLEAR_APP_STATE,
    SET_ERROR,
    CLEAR_ERROR,
    ROOT_CHANGED,
    SCREEN_CHANGE,
    REMOVE_STATE,
    CLEAN_STATE,
    ADD_TOAST
  } from "constant";
  export function setState(state) {
    return {
      type: SET_STATE,
      state
    };
  }
  export function cleanState() {
    return {
      type: CLEAN_STATE
    };
  }
  export function clearState() {
    return {
      type: CLEAR_STATE
    };
  }
  export function clearAppState() {
    return {
      type: CLEAR_APP_STATE
    };
  }
  export function setError(
    errorMsg: string = "Unable to connect with the server. Check your internet connection and try again."
  ) {
    return {
      type: SET_ERROR,
      data: errorMsg
    };
  }
  export function clearError() {
    return {
      type: CLEAR_ERROR
    };
  }
  export function changeAppRoot(root: string) {
    return {
      type: ROOT_CHANGED,
      root
    };
  }
  
  export function appInitialized() {
    changeAppRoot("login");
  }
  
  export function screenChanged() {
    return {
      type: SCREEN_CHANGE
    };
  }
  
  export function fetchScreenChange(state: { currentScreen: string }) {
    return {
      type: SET_STATE,
      state
    };
  }
  
  //Opposite of setState
  export function removeState(key) {
    return {
      type: REMOVE_STATE,
      key
    };
  }

  export function addToast (message) {
    return { type: ADD_TOAST, message };
  }
  