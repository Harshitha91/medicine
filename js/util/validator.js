/**
                __    _        __         _                   
               [  |  (_)      |  ]       / |_                 
 _   __  ,--.   | |  __   .--.| |  ,--. `| |-' .--.   _ .--.  
[ \ [  ]`'_\ :  | | [  |/ /'`\' | `'_\ : | | / .'`\ \[ `/'`\] 
 \ \/ / // | |, | |  | || \__/  | // | |,| |,| \__. | | |     
  \__/  \'-;__/[___][___]'.__.;__]\'-;__/\__/ '.__.' [___]    
                                                              
 */
// @flow

import { isUnicode, isUndefined } from "./core";
import { isNumber } from "lodash";
import moment from "moment";
import isEmpty from "lodash/isEmpty";
const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();
/**
 * returns an empty object if no errors in the object after validation with schema,
 * Sample error object output : {
 *  "firstName": "Only alpha numeric characters are allowed for first name",
 *  "lastName": "Onlyh alpha numeric characters are allowed for first name"
 * }
 */
export const validate = (
  schema,
  data
) => {
  let fields = Object.keys(schema.fields);
  return fields.reduce((errorObject, fieldName) => {
    const fieldDef = schema.fields[fieldName];
    const value = data[fieldName];
    // skip from validating if the field is system generated or it is a relation ship field
    if (fieldDef.system || fieldDef.relationship) return errorObject;
    // if data object does not contain a value for a required field submit errors
    if (fieldDef.type !== "boolean" && fieldDef.required && !value) {
      const errMsg = fieldDef.label + ' is required';
      return setError(errorObject, fieldName, errMsg);
    }

    // validate for number
    if (value && fieldDef.type === "number") {
      if (!/^\d+$/.test(value)) {
        const errMsg = 'Only allow numeric values';
        return setError(errorObject, fieldName, errMsg);
      }
    }
    // validate length
    if (value && fieldDef.maxLength) {
      if (value.toString().length > fieldDef.maxLength) {
        const errMsg = 'Maximum ' + fieldDef.maxLength + ' characters are allowed';
        return setError(errorObject, fieldName, errMsg);
      }
    }

    // validate for space-only strings
    if (value && fieldDef.type === "string") {
      if (value.trim() === "") {
        const errMsg = 'Invalid Name';

        return setError(errorObject, fieldName, errMsg);
      }
    }

    // validate for email
    if (value && fieldDef.type === "email") {
      const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!emailRegex.test(value)) {
        const errMsg = 'Should be a valid email address';

        return setError(errorObject, fieldName, errMsg);
      }
    }

    // validate for check space contain strings
    if (value && fieldDef.name === "Username") {
      if (/\s/.test(value)) {
        const errMsg = 'Username should not contain spaces.';

        return setError(errorObject, fieldName, errMsg);
      }
    }

    // // validate for decimal
    // if (value && fieldDef.type === "decimal") {
    //   if (!/^\d+(\.\d+)?$/.test(value)) {
    //     const errMsg = t("validationMessages.decimalMsg", lang);

    //     return setError(errorObject, fieldName, errMsg);
    //   }
    // }

    // validate for password type
    if (
      value &&
      fieldDef.type === "password" &&
      (fieldDef.name === "Password" || fieldDef.name === "ConfirmPassword" ||  fieldDef.name === "NewPassword")
    ) {
      const isValidated = passwordValidate(value);
      if (!isValidated) {
        const errMsg = 'Password should be at least 6 characters long with combination of upper and lower letters, digits and special characters';
        return setError(errorObject, fieldName, errMsg);
      }

      const passwordMatch = data['Password'] === data['ConfirmPassword'] || data['NewPassword'] === data['ConfirmPassword'];
      if (!passwordMatch) {
        const errMsg = 'Confirm password did not match';
        return setError(errorObject, 'ConfirmPassword', errMsg);
      }
    }

    // if (
    //   value &&
    //   fieldDef.type === "password" &&
    //   (fieldDef.name === "NewPassword" || fieldDef.name === "ConfirmPassword")
    // ) {
    //   const isValidated = data['Password'] === data['ConfirmPassword'] || data['NewPassword'] === data['ConfirmPassword'];
    //   if (!isValidated) {
    //     const errMsg = 'Confirm password did not match';

    //     return setError(errorObject, 'ConfirmPassword', errMsg);
    //   }
    // }

    // if (
    //   value &&
    //   fieldDef.type === "password" &&
    //   (fieldDef.name === "NewPassword" || fieldDef.name === "ConfirmPassword" || fieldDef.name === "Password")
    // ) {
    //   const isValidated = data['Password'] && data['Password'].length > 5 || data['NewPassword'] && data['NewPassword'].length > 5 || data['ConfirmPassword'] && data['ConfirmPassword'].length > 5;
    //   if (!isValidated) {
    //     const errMsg = 'Minimum characters 6';
    //     return setError(errorObject, fieldName, errMsg);
    //   }
    // }

    // // pattern validation; skip unicode
    // if (value && fieldDef.pattern && !isUnicode(value)) {
    //   const regexp = new RegExp(fieldDef.pattern);

    //   if (!regexp.test(value)) {
    //     const errMsg =
    //       fieldDef.errorMessage || t("validationMessages.invalidMsg", lang);

    //     return setError(errorObject, fieldName, errMsg, lang, fieldDef);
    //   }
    // }

    // boolean field validation
    if (value && fieldDef.type === "boolean") {
      const values = fieldDef.options.values;
      const validValues = values.map(function (object) {
        return object.value;
      });

      if (typeof value !== "boolean") {
        const errorLabel = 'Only allow';
        const errMsg = `${errorLabel} ${validValues.join(", ")}`;

        return setError(errorObject, fieldName, errMsg);
      }
    }

    if (value && fieldDef.type === "enum") {
      if (Number(value) === 0) {
        return setError(errorObject, fieldName, "Please Select the Country");
      }
    }

    // // Enum field validation
    // if (value && fieldDef.type === "enum") {
    //   if (
    //     !isUndefined(fieldDef.enum.values) &&
    //     !isEmpty(fieldDef.enum.values)
    //   ) {
    //     const values = fieldDef.enum.values;
    //     const validValues = values.map(function(enumObject) {
    //       return enumObject.value;
    //     });
    //     if (
    //       fieldDef.required &&
    //       Number(value) === 0 &&
    //       validValues.indexOf(value) === -1
    //     ) {
    //       const errMsg = t("validationMessages.selectValidMsg", lang);

    //       return setError(errorObject, fieldName, errMsg, lang, fieldDef);
    //     } else if (Number(value) !== 0 && validValues.indexOf(value) === -1) {
    //       const errMsg = t("validationMessages.selectValidMsg", lang);

    //       return setError(errorObject, fieldName, errMsg, lang, fieldDef);
    //     }
    //   }
    // }

    // // Timestamp validation
    // if (value && fieldDef.type === "timestamp") {
    //   if (!/^-?\d+$/.test(value)) {
    //     const errMsg = t("validationMessages.date", lang);

    //     return setError(errorObject, fieldName, errMsg);
    //   }
    // }

    // // Length validation
    // if (value && fieldDef.length) {
    //   let valueLength = value.length;
    //   let lengthDef = fieldDef.length.slice();

    //   if (valueLength < lengthDef[0] || valueLength > lengthDef[1]) {
    //     const errorLabel = t("validationMessages.lengthbetween", lang);
    //     const crlabel = t("validationMessages.characters", lang);
    //     //error = "[" + name + "] " + errlabel + fieldDef.length.join('-') + " " + crlabel;
    //     let errMsg = `${errorLabel} ${fieldDef.length.join("-")} ${crlabel}`;

    //     if (lang === "en") {
    //       errMsg = `${errorLabel} ${lengthDef[0]} to ${
    //         lengthDef[1]
    //       } characters`;
    //     } else if (lang === "si") {
    //       errMsg = `${crlabel} ${lengthDef[0]} - ${lengthDef[1]} ${errorLabel}`;
    //     }

    //     return setError(errorObject, fieldName, errMsg);
    //   }
    // }

    // // Check minus values
    // if (value && fieldDef.min) {
    //   if (value < fieldDef.min) {
    //     const errMsg = `${t("validationMessages.lengthbetween", lang)} ${
    //       fieldDef.min
    //     }`;

    //     return setError(errorObject, fieldName, errMsg, lang);
    //   }
    // }
    // // Check equal form fields
    // if (fieldDef.equals) {
    //   if (data[fieldDef.equals] !== value) {
    //     const errMsg = t("validationMessages.equalsPasswords", lang);
    //     return setError(errorObject, fieldName, errMsg, lang);
    //   }
    // }
    if (value && (fieldDef.name === "PhoneNumber" || fieldDef.name === "phoneNumber")) {
      if (data['Country']) {
        let iso2 = data['Country'].cca2.toLowerCase();
        let formattedNumber = `+${data['Country'].callingCode}${value}`;

        if (!isValidNumber(formattedNumber, iso2)) {
          const errMsg = "Invalid phone number ";
          return setError(errorObject, fieldName, errMsg);
        }
      } else {
        const errMsg = "Invalid phone number ";
        return setError(errorObject, fieldName, errMsg);
      }
    }
    // if (value && fieldDef.name === "landlineNumber") {
    //   if (isValidPhoneNumber(value, true) === false) {
    //     const errMsg = t("validationMessages.invalidLandlineNumber", lang);
    //     return setError(errorObject, fieldName, errMsg, lang);
    //   }
    // }
    // if (value && fieldDef.name === "mobileNumber") {
    //   if (isValidPhoneNumber(value, false) === false) {
    //     const errMsg = t("validationMessages.invalidMobileNumber", lang);
    //     return setError(errorObject, fieldName, errMsg, lang);
    //   }
    // }
    // if (value && fieldDef.name === "nic") {
    //   if (isValidNic(value) === false) {
    //     const errMsg = t("validationMessages.invalidNic", lang);
    //     return setError(errorObject, fieldName, errMsg, lang);
    //   }
    // }
    return errorObject;
  }, {});
};

export const passwordValidate = (password) => {
  let hasNotEnoughLength = password.length < 6;
  let hasNoUpperCase = !/[A-Z]/.test(password);
  let hasNoLowerCase = !/[a-z]/.test(password);
  let hasNoNumbers = !/\d/.test(password);
  let hasNoNonAlphaNumeric = !/[!@#$%&*]/.test(password);
  let hasAnyOtherSymbol = /[^A-Za-z\d!@#$%&*]/.test(password);

  if (
    hasNotEnoughLength ||
    hasNoUpperCase ||
    hasNoLowerCase ||
    hasNoNumbers ||
    hasNoNonAlphaNumeric ||
    hasAnyOtherSymbol
  )
    return false;
  return true;
};

export const validateLoginDetails = (loginData) => {
  let errorMsg = "";
  if (isUndefined(loginData)) {
    errorMsg = "Please fill login details.";
  } else if (
    isUndefined(loginData.username) ||
    loginData.username.trim() === ""
  ) {
    errorMsg = "Username required.";
  } else if (
    isUndefined(loginData.password) ||
    loginData.password.trim() === ""
  ) {
    errorMsg = "User password required.";
  }
  return errorMsg;
};

const setError = (
  errorObject,
  name,
  errMsg
) => {
  return {
    ...errorObject,
    [name]: errMsg
  };
};

// /**
//  * Validate phone numbers
//  * if allow landlines for checking phone number isAllowLandline should be true
//  * unless default isAllowLandline is false
//  */
// export const isValidPhoneNumber = (
//   phoneNumber: string,
//   isAllowLandline: boolean = false
// ) => {
//   let validPattern = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g;
//   return validPattern.test(phoneNumber);
// };

/**
 * Validate nic
 */
export const isValidNic = (nic: string) => {
  if (/^([0-9]{9})(v|V|x|X)$/.test(nic) || /^([0-9]{12})$/.test(nic)) {
    return true;
  }
  return false;
};

/**
 * Validate timestamp
 * checking if the timestamp > current time
 */
export const isValidFutureTimestamp = (timestamp: number) => {
  const time = new Date(timestamp);
  return time > new Date();
};

/**
 * Validate timestamp
 * checking if the timestamp < current time
 */
export const isValidPastTimestamp = (timestamp: number) => {
  const time = new Date(timestamp);
  return time < new Date();
};

export const isValidTimestamp = (timestamp: number) => {
  return isNumber(timestamp);
};

export const isValidYYYYMMDD = (date: string) => {
  return moment(date, "YYYY-MM-DD", true).isValid();
};

export const isValidInteger = (date: string) => {
  return Number.isInteger(Number(date));
};

export const numericValidation = (value: any, label: string) => {
  let errorObject = {};
  if (isNaN(value)) {
    const errMsg = 'Should Be A Numeric Value';
    return setError(errorObject, label, errMsg);
  }
  return errorObject;
};

export const mobileNumberValidation = (
  value: any,
  label: string
) => {
  let errorObject = {};
  if (!isValidPhoneNumber(value, false)) {
    const errMsg = 'Should be a Mobile number';
    return setError(errorObject, label, errMsg);
  }
  return errorObject;
};

export const parse = (number, iso2) => {
  try {
    return phoneUtil.parse(number, iso2);
  } catch (err) {
    console.log(`Exception was thrown: ${err.toString()}`);
    return null;
  }
};

export const isValidNumber = (number, iso2) => {
  if (number.length < 3) return false;
  const phoneInfo = parse(number, iso2);

  if (phoneInfo) {
    return phoneUtil.isValidNumber(phoneInfo);
  }

  return false;
};
