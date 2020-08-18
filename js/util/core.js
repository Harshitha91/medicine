import { NetInfo } from "react-native";
import call from 'react-native-phone-call';
import { getAllCountries } from "react-native-country-picker-modal";

// @flow
import moment from "moment";
export const isUndefined = (state: any): boolean =>
  typeof state === "undefined";

export const convertToArray = (item: any) => {
  if (!Array.isArray(item)) {
    return [];
  }
  return item;
};

export const isInArray = (array: Array<any>, item: any) => {
  return array.indexOf(item) > -1;
};

export const isUnicode = (text: string) => {
  for (let i = 0; i < text.length; i++) {
    if (text.charCodeAt(i) > 127) {
      return true;
    }
  }
  return false;
};

// Used to uppercase a text.
export const upperCasifyText = (text: string) => {
  if (!text) return;
  return text.charAt(0).toUpperCase() + text.substr(1);
};

//Check device is connected to a network.
export const checkConnectedStatus = () => {
  return new Promise((resolve, reject) => {
    NetInfo.isConnected
      .fetch()
      .then(isConnected => {
        resolve(isConnected);
      })
      .catch(error => {
        reject(error);
      });
  });
};

/**
 * hasPermission function is use to check the permission of given item
 *
 */
export const hasPermission = (
  userPermissions: Object,
  allowedPermissionKey: string
) => {
  return userPermissions[allowedPermissionKey] !== undefined ? true : false;
};

export const selectLocalizedAreaName = (
  areaNameObject: Object,
  locale: string
) => {
  if (locale === "en") {
    return areaNameObject.areaName_en;
  }
  if (locale === "si") {
    return areaNameObject.areaName_si;
  }
  if (locale === "tl") {
    return areaNameObject.areaName_tl;
  }
};

export const formatDate = (dateString: string) => {
  if (dateString) {
    return moment(parseInt(dateString, 10) * 1000).format("YYYY-MM-DD");
  }
};

/** get the event list and return in a data structure appropraiate for the list of the Agenda component
 * marking every date between startDate and EndDate
 * Sample input 
 * eventItems: {
 * 6eeb7be0-1252-4b7f-8c62-a0d7cb1cd150:
  {
    endDate: 1536171200,
    id: "6eeb7be0-1252-4b7f-8c62-a0d7cb1cd150",
    startDate: 1537468200,
    ...
  }
  7a3c0824-3d47-4738-bd2c-3a5574bdb44b:
  {
    endDate: 1536258600,
    id: "7a3c0824-3d47-4738-bd2c-3a5574bdb44b",
    locationCode: "1-1-03-010",
    startDate: 1537468200,
    ...
  }}
  *currentDate: "2018-09-10"
  Sample Output:
  { 
    2018-09-10: []
    2018-09-11: []
    2018-09-12: [6eeb7be0-1252-4b7f-8c62-a0d7cb1cd150]
    2018-09-13: [6eeb7be0-1252-4b7f-8c62-a0d7cb1cd150]
    2018-09-14: [6eeb7be0-1252-4b7f-8c62-a0d7cb1cd150]
    2018-09-15: [7a3c0824-3d47-4738-bd2c-3a5574bdb44b, 6eeb7be0-1252-4b7f-8c62-a0d7cb1cd150]
    2018-09-16: [7a3c0824-3d47-4738-bd2c-3a5574bdb44b, 6eeb7be0-1252-4b7f-8c62-a0d7cb1cd150]
    2018-09-17: [7a3c0824-3d47-4738-bd2c-3a5574bdb44b]
    2018-09-18: []
  }
 */
export const createEventList = (eventItems: Object, currentDate: string) => {
  let eventList = {};

  const daySecs = 86400;
  const monthStartTimestamp = Number(moment(currentDate).format("X"));
  const monthEndTimestamp = monthStartTimestamp + 31 * daySecs;
  for (let key in eventItems) {
    const { startDate, endDate, id } = eventItems[key];
    const loopStartDate =
      startDate > monthStartTimestamp ? startDate : monthStartTimestamp;
    const loopEndDate =
      endDate < monthEndTimestamp ? endDate : monthEndTimestamp;
    for (let i = loopStartDate; i <= loopEndDate; i += daySecs) {
      const iDateString = moment(i * 1000).format("YYYY-MM-DD");
      if (isUndefined(eventList[iDateString])) {
        eventList[iDateString] = [id];
      } else {
        eventList[iDateString].push(id);
      }
    }
  }
  let iDate;
  for (let i = 0; i <= 30; i++) {
    iDate = moment(currentDate)
      .add(i, "days")
      .format("YYYY-MM-DD");
    if (isUndefined(eventList[iDate])) {
      eventList[iDate] = [];
    }
  }
  return eventList;
};

/** get the event list and return in a data structure appropraiate for date marking in the Agenda component
 * marking every date between startDate and EndDate
 * Sample input:
 *  eventItems: {
 * 6eeb7be0-1252-4b7f-8c62-a0d7cb1cd150:
  {
    endDate: 1536171200,
    id: "6eeb7be0-1252-4b7f-8c62-a0d7cb1cd150",
    startDate: 1537468200,
    ...
  }
  7a3c0824-3d47-4738-bd2c-3a5574bdb44b:
  {
    endDate: 1536258600,
    id: "7a3c0824-3d47-4738-bd2c-3a5574bdb44b",
    locationCode: "1-1-03-010",
    startDate: 1537468200,
    ...
  }}
 *
 * Sample Output:
 * 
   { 
    2018-09-12: [dots:[{ key: 6eeb7be0-1252-4b7f-8c62-a0d7cb1cd150, color: #11e1ad}]]
    2018-09-13: [dots:[{ key: 6eeb7be0-1252-4b7f-8c62-a0d7cb1cd150, color: #11e1ad}]]
    2018-09-14: [dots:[{ key: 6eeb7be0-1252-4b7f-8c62-a0d7cb1cd150, color: #11e1ad}]]
    2018-09-15: [dots:[{ key: 6eeb7be0-1252-4b7f-8c62-a0d7cb1cd150, color: #11e1ad}, { key: 7a3c0824-3d47-4738-bd2c-3a5574bdb44b, color: #af1801}]]
    2018-09-16: [dots:[{ key: 6eeb7be0-1252-4b7f-8c62-a0d7cb1cd150, color: #11e1ad}, { key: 7a3c0824-3d47-4738-bd2c-3a5574bdb44b, color: #af1801}]]
    2018-09-17: [dots:[{ key: 7a3c0824-3d47-4738-bd2c-3a5574bdb44b, color: #af1801}]]
   }
 */
export const createDotMarkerObject = (eventItems: Object) => {
  let dotMarkers = {};
  for (let key in eventItems) {
    const { startDate, endDate } = eventItems[key];
    const daySecs = 86400;
    let color;
    if (eventItems[key].id.length >= 6) {
      color = "#" + eventItems[key].id.substr(-6);
    } else {
      const colorString = "#" + eventItems[key].id + "55555";
      color = colorString.substr(0, 7);
    }
    if (endDate >= startDate) {
      for (let i = startDate; i <= endDate; i += daySecs) {
        let dotObject = {
          key: eventItems[key].id,
          color
        };

        const dots = { dots: [dotObject] };
        const iDateString = moment(i * 1000).format("YYYY-MM-DD");
        if (isUndefined(dotMarkers[iDateString])) {
          dotMarkers[iDateString] = dots;
        } else {
          dotMarkers[iDateString].dots.push(dotObject);
        }
      }
    }
  }
  return dotMarkers;
};

function randomString(len) {
  let charSet =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let randomString = "";
  for (let i = 0; i < len; i++) {
    let randomPoz = Math.floor(Math.random() * charSet.length);
    randomString += charSet.substring(randomPoz, randomPoz + 1);
  }
  return randomString;
}

/**
 * pick object by provided filter array,
 * example:-
 *
 * const obj = {
 *  "name": "user",
 *  "role": "gn",
 *  "age": 50
 * };
 *
 * const arrayOfKeys = ["name", "role"];
 *
 * const result = pickObjectByKeys(obj, arrayOfKeys);
 *
 * @returns
 *  {
 *    "name": "user",
 *    "role": "gn"
 *  }
 */
export const pickObjectByKeys = (obj: Object, arrayOfKeys: Array) =>
  arrayOfKeys.reduce(
    (acc, curr) => (curr in obj && (acc[curr] = obj[curr]), acc),
    {}
  );

/**
 * omit key in an object by provided filter array,
 * example:-
 *
 * const obj = {
 *  "name": "user",
 *  "role": "gn",
 *  "age": 50
 * };
 *
 * const filterKeys = ["name", "role"];
 *
 * const result = omitKeysInObject(obj, arrayOfKeys);
 *
 * @returns
 *  {
 *    "age": 50
 *  }
 */
export const omitKeysInObject = (obj, filterKeys) =>
  Object.keys(obj)
    .filter(k => !filterKeys.includes(k))
    .reduce((acc, key) => ((acc[key] = obj[key]), acc), {});

export function dialNumber(number) {
  const args = {
    number: number,
    prompt: true
  }
  call(args).catch(console.error)
}

export const getCountries = () => {
  return new Promise((resolve, reject) => {
    getAllCountries().then((result) => {
      resolve(result); 
      return;   
    })
    .catch((error) => {
      reject(error);
      return;  
    })
  })
}
