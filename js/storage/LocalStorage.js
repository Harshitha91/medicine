import AsyncStorage from '@react-native-community/async-storage';
import {
  SESSION,
  CURRENT_LOCATION,
  LANGUAGE
} from "constant";

let userDefaultLanguage = "en";
let userCurrentLocation = null;

/**
 * create user session
 *
 * response => {
 *   "error": false,
 *   "data": {
 *      "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ",
 *      "userId": 2,
 *      "firstName": "Harshitha",
 *      "lastName": "Palihawadana",
 *      "mobileNo": "0719242650",
 *      "email": "harshitha@gmail.com",
 *      "permissionLevel": "user"
 *   }
 * }
 */
export const createSession = async userSession => {
  try {
    await AsyncStorage.setItem( SESSION, JSON.stringify(userSession));
  } catch (error) {
    console.log("erorr :", error);
  }
};

/**
 * Remove current session details and locations from local storage.
 */
export const removeSession = async () => {
  try {
    await AsyncStorage.multiRemove([SESSION, CURRENT_LOCATION]);
  } catch (error) {
    console.log("erorr :", error);
  }
};
