// @flow
import {
  SAVE_USER,
  CHECK_LOGIN_STATUS,
  AUTH_USER,
  VERIFY_PIN,
  RESEND_PIN,
  USER_LOGOUT,
  RESET_PASSWORD,
  FORGOT_PASSWORD,
  GET_USER_DETAILS,
  RECEIVE_USER_DATA,
  UPDATE_USER,
  SESSION_HANDLING,
} from "constant";

export const authUser = (loginData, fcmData, componentId) => {
  return {
    type: AUTH_USER,
    data: loginData,
    fcmData: fcmData,
    componentId,
  };
};

//Admin Session
export const handleUserSession = (data, componentId) => {
  return {
    type: SESSION_HANDLING,
    data,
    componentId,
  };
};

export const saveUser = (data, componentId) => {
  return {
    type: SAVE_USER,
    data,
    componentId,
  };
};

export const logout = () => {
  return {
    type: USER_LOGOUT,
  };
};

export const getUserDetails = (data, componentId) => {
  return {
    type: GET_USER_DETAILS,
    data,
    componentId,
  };
};

export const receiveUserData = (data) => {
  return {
    type: RECEIVE_USER_DATA,
    data,
  };
};

export const updateUser = (data, componentId) => {
  return {
    type: UPDATE_USER,
    data,
    componentId,
  };
};

export const saveRestUserData = (data, componentId) => {
  return {
    type: "SAVE_REST_USER_DATA",
    data,
    componentId,
  };
};
