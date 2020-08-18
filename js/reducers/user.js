import { combineReducers } from "redux";
import {
  RECEIVE_COMPLAINERS,
  RECEIVE_UPDATED_SUBSCRIBED_USER,
  RECEIVE_SUBSCRIBED_USERS_BY_PROPERTY,
  RECEIVE_CURRENT_ADMINS,
  RECEIVE_ALL_ADMINS,
  RECEIVE_INVITED_USERS,
  CLEAR_INVITED_USERS,
  INVITE_USER,
  ADD_TO_ALL_ADMINS,
  REMOVE_FROM_ALL_ADMINS,
  ADD_TO_CURRENT_ADMINS,
  REMOVE_FROM_CURRENT_ADMINS,
  CLEAR_CURRENT_ADMINS,
  REMOVE_COMPLAINERS,
  RECEIVE_ALL_COMPLAINERS
} from "constant";

const generateUserById = (data) => {
  return {
    ...data.reduce((obj, item) => {
      obj[item.id] = item;
      return obj;
    }, {})
  };
};

const generatePropertiesById = (data) => {
  return {
    ...data.reduce((obj, item) => {
      obj[item.propertyId] = item;
      return obj;
    }, {})
  };
};

const updateUser = (state = {}, data) => {
  return { ...state, [data.id]: data };
};

const removeUser = (state = {}, key) => {
  const { [key]: __, ...newState } = state;
  return newState;
};

const removeVisibleUser = (state = [], data) => {
  return [...state.filter(item => item !== data)];
};

const addUser = (state = {}, data) => {
  return { [data.id]: data, ...state };
};

const byId = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_COMPLAINERS:
      return generateUserById(action.data);
    case RECEIVE_UPDATED_SUBSCRIBED_USER:
      return updateUser(state, action.userDetails);
    case REMOVE_COMPLAINERS:
      return {};
    default:
      return state;
  }
};
const visibleIds = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_COMPLAINERS:
      return action.data.map(item => item.id);
    case REMOVE_COMPLAINERS:
      return [];
    default:
      return state;
  }
};

const propertiesById = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_SUBSCRIBED_USERS_BY_PROPERTY:
      return generatePropertiesById(action.data);
    default:
      return state;
  }
};

const propertiesByVisibleIds = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_SUBSCRIBED_USERS_BY_PROPERTY:
      return action.data.map(item => item.propertyId);
    default:
      return state;
  }
};

const currentAdminsById = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_CURRENT_ADMINS:
      return generateUserById(action.data);
    case ADD_TO_CURRENT_ADMINS:
      return addUser(state, action.user);
    case REMOVE_FROM_CURRENT_ADMINS:
      return removeUser(state, action.userId);
    case CLEAR_CURRENT_ADMINS:
        return {};
    default:
      return state;
  }
};

const currentAdminsByVisibleIds = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_CURRENT_ADMINS:
      return action.data.map(item => item.id);
    case ADD_TO_CURRENT_ADMINS:
      return [action.user.id, ...state];
    case REMOVE_FROM_CURRENT_ADMINS:
      return removeVisibleUser(state, action.userId);
    case CLEAR_CURRENT_ADMINS:
        return [];
    default:
      return state;
  }
};

const allAdminsUsersById = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_ALL_ADMINS:
      return generateUserById(action.data);
    case ADD_TO_ALL_ADMINS:
      return addUser(state, action.user);
    case REMOVE_FROM_ALL_ADMINS:
      return removeUser(state, action.userId);
    default:
      return state;
  }
};

const allAdminsUsersByVisibleIds = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_ALL_ADMINS:
      return action.data.map(item => item.id);
    case ADD_TO_ALL_ADMINS:
      return [action.user.id, ...state];
    case REMOVE_FROM_ALL_ADMINS:
      return removeVisibleUser(state, action.userId);
    default:
      return state;
  }
};

const invitedUsersById = (state = {}, action) => {
  switch (action.type) {
    case INVITE_USER:
      return updateUser(state, action.data);
    case RECEIVE_INVITED_USERS:
      return generateUserById(action.data);
    case CLEAR_INVITED_USERS:
      return state = {};
    default:
      return state;
  }
};

const invitedUsersVisibleIds = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_INVITED_USERS:
      return action.data.map(item => item.id);
    case CLEAR_INVITED_USERS:
      return state = [];
    default:
      return state;
  }
};

const allComplainers = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_ALL_COMPLAINERS:
      return action.data;
    default:
      return state;
  }
};

export default combineReducers({
  byId,
  visibleIds,
  propertiesById,
  invitedUsersById,
  currentAdminsById,
  allAdminsUsersById,
  propertiesByVisibleIds,
  invitedUsersVisibleIds,
  currentAdminsByVisibleIds,
  allAdminsUsersByVisibleIds,
  allComplainers
});
export const getUsersByPropertyId = (state, propertyId) => state.propertiesById[propertyId];
export const getVisibleUsersByPropertyId = (state) => {
  return state.propertiesByVisibleIds.map(propertyId => getUsersByPropertyId(state, propertyId));
};

export const getUsersById = (state, id) => state.byId[id];
export const getVisibleUsersById = (state) => {
  return state.visibleIds.map(id => getUsersById(state, id));
};

export const getCurrentAdminsById = (state, id) => state.currentAdminsById[id];
export const getVisibleCurrentAdmins = (state) => {
  return state.currentAdminsByVisibleIds.map(id => getCurrentAdminsById(state, id));
};

export const getAllAdminsById = (state, id) => state.allAdminsUsersById[id];
export const getVisibleAllAdmins = (state) => {
  return state.allAdminsUsersByVisibleIds.map(id => getAllAdminsById(state, id));
};

export const getInvitedUsersById = (state, id) => state.invitedUsersById[id];
export const getVisibleInvitedUsersById = (state) => {
  return state.invitedUsersVisibleIds.map(id => getInvitedUsersById(state, id));
};
