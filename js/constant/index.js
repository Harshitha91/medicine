export const SET_STATE = "SET_STATE";
export const CLEAR_STATE = "CLEAR_STATE";
export const CLEAR_APP_STATE = "CLEAR_APP_STATE";
export const SET_ERROR = "SET_ERROR";
export const CLEAR_ERROR = "CLEAR_ERROR";
export const ROOT_CHANGED = "ROOT_CHANGED";
export const SCREEN_CHANGE = "SCREEN_CHANGE";
export const CHANGE_FORM_LOCALE = "CHANGE_FORM_LOCALE";
export const FETCH_SCREEN_CHANGE = "FETCH_SCREEN_CHANGE";
export const REMOVE_STATE = "REMOVE_STATE";
export const CLEAN_STATE = "CLEAN_STATE";
export const ADD_TOAST = "ADD_TOAST";

//form action types
export const ON_FIELD_CHANGE = "ON_FIELD_CHANGE";
export const RESET_FORMS = "RESET_FORMS";
export const RESET_FORM = "RESET_FORM";
export const EDIT_FORM = "EDIT_FORM";
export const SET_FORM_FIELDS = "SET_FORM_FIELDS";
export const SET_UPDATE_FORM_FIELDS = "SET_UPDATE_FORM_FIELDS";
export const UPDATE_FORM_FIELDS = "UPDATE_FORM_FIELDS";
export const RESET_UPDATE_FORM_FIELDS = "RESET_UPDATE_FORM_FIELDS";
export const POST = "POST";
export const GET = "GET";
export const PUT = "PUT";
export const DELETE = "DELETE";

// settings action types
export const CHANGE_APP_LOCALE = "CHANGE_APP_LOCALE";

export const GET_APP_LOCALE = "GET_APP_LOCALE";
export const RECEIVE_APP_LOCALE = "RECEIVE_APP_LOCALE";
export const CHANGE_LOCATION = "CHANGE_LOCATION";
export const RECEIVE_CHANGED_LOCATION = "RECEIVE_CHANGED_LOCATION";
export const GET_LOCATIONS = "GET_LOCATIONS";
export const SET_LOCATION_NAMES = "SET_LOCATION_NAMES";
export const GET_SELECTED_LOCATION = "GET_SELECTED_LOCATION";
export const RECEIVE_SELECTED_LOCATION = "RECEIVE_SELECTED_LOCATION";
export const RECEIVE_LOCATIONS = "RECEIVE_LOCATIONS";

// AsyncStorage keys
export const SESSION = "EGN_USER_SESSION";
export const TOKEN = "EGN_TOKEN";
export const CURRENT_LOCATION = "CURRENT_LOCATION_CODE";
export const LANGUAGE = "EGN_LANG";
export const PROFILE = "PROFILE";
export const COUNTRIES = "COUNTRIES";
export const POST_OFFICES = "POST_OFFICES";
export const POLICE_STATIONS = "POLICE_STATIONS";
export const PIN = "@offline_login";
export const FIRST = "FIRST_TIME_USER";
export const HAS_PREVIOUSLY_SETUP = "HAS_PREVIOUSLY_SETUP";
export const SESSION_HANDLING = "SESSION_HANDLING";
export const HANDLE_GET_STARTED = "HANDLE_GET_STARTED";

// User action types
export const VERIFIED_USER = "VERIFIED_USER";
export const USER_SIGNUP_DATA = "USER_SIGNUP_DATA";
export const SAVE_USER = "SAVE_USER";
export const RECEIVE_USER_DATA = "RECEIVE_USER_DATA";
export const UPDATE_USER = "UPDATE_USER";

//user action types
export const AUTH_USER = "AUTH_USER";
export const RECEIVE_PROFILE = "RECEIVE_PROFILE";
export const USER_LOGOUT = "USER_LOGOUT";
export const GET_USER_DETAILS = "GET_USER_DETAILS";
export const CHANGE_INITIAL_PASSWORD = "CHANGE_INITIAL_PASSWORD";
export const GET_PROFILE = "GET_PROFILE";
export const CHECK_LAST_ONLINE_TIME = "CHECK_LAST_ONLINE_TIME";
export const SET_USER_FORCE_LOGOUT = "SET_USER_FORCE_LOGOUT";
export const FORCE_USER_TO_LOGOUT = "FORCE_USER_TO_LOGOUT";
export const FORGOT_PASSWORD = "FORGOT_PASSWORD";
export const RESET_PASSWORD = "RESET_PASSWORD";
export const VERIFY_PIN = "VERIFY_PIN";
export const RESEND_PIN = "RESEND_PIN";
export const RECEIVE_UPDATED_SUBSCRIBED_USER =
  "RECEIVE_UPDATED_SUBSCRIBED_USER";
export const UPDATE_USER_DEVICE_ID = "UPDATE_USER_DEVICE_ID";
export const INVITE_USER_TO_PROPERTY = "INVITE_USER_TO_PROPERTY";
export const RECEIVE_INVITED_USERS = "RECEIVE_INVITED_USERS";
export const CLEAR_INVITED_USERS = "CLEAR_INVITED_USERS";
export const INVITE_USER = "INVITE_USER";

//Listners types
export const OFFLINE_TIME_CHECK = "offlineTimeCheck";

//Row count
export const DEFAULT_NUMBER_OF_ROWS = 12;

// Transliteration
export const TRANSLITERATE = "TRANSLITERATE";

// Application language keys
export const LANG_STACK = ["en", "si", "tl"];

// Badge data
export const BADGE_DATA = {
  completed: {
    badgeType: "success",
    badgeText: "COMPLETED",
    badgeColor: "#69C31D",
  },
  pending: {
    badgeType: "success",
    badgeText: "PENDING",
    badgeColor: "#FFA726",
  },
  inProgress: {
    badgeType: "success",
    badgeText: "IN PROGRESS",
    badgeColor: "#FACF10",
  },
  reOpen: {
    badgeType: "success",
    badgeText: "RE OPEN",
    badgeColor: "#20C7EF",
  },
  onHold: {
    badgeType: "success",
    badgeText: "ON HOLD",
    badgeColor: "#D57350",
  },
};

//changePassword
export const CHANGE_PASSWORD = "CHANGE_PASSWORD";

export const GET_HOST_ENVIRONMENT = "GET_HOST_ENVIRONMENT";
export const HOSTED_ENVIRONMENT = "HOSTED_ENVIRONMENT";
export const UNIQUE_SIGNALR_DEVICE_ID = "UNIQUE_SIGNALR_DEVICE_ID";
export const GENERATE_UNIQUE_ID = "GENERATE_UNIQUE_ID";
export const APPLY_FILTERS = "APPLY_FILTERS";
export const SET_FILTERS = "SET_FILTERS";
export const REMOVE_FILTERS = "REMOVE_FILTERS";

export const GET_SCHEDULE_CALANDAR = "GET_SCHEDULE_CALANDAR";
export const RECEIVE_SCHEDULE_CALANDAR = "RECEIVE_SCHEDULE_CALANDAR";
