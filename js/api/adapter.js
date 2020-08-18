import { env } from '../../config'
import { checkConnectedStatus } from "util/core";
import AsyncStorage from '@react-native-community/async-storage';
import { SESSION, HOSTED_ENVIRONMENT } from "constant";
import axios from 'axios';
import {checkConnectivity} from "util/NetworkConnection";
import { version } from '../../package.json';

const isUndefined = (state) =>
  typeof state === "undefined";

  export function getEnvironment() {
      let url = 'https://api.rcsapp.net/api/HostedEnvironments/GetEnvironment/'+version;
      return new Promise((resolve, reject) => {
        checkConnectedStatus()
          .then(isConnected => {
            if (!isConnected) {
              reject("offline");
              return;
            }
    
            const headers = {
              'Content-Type': "application/x-www-form-urlencoded;charset=UTF-8"
            };

            const options = {
              method: 'GET',
              headers: {
                "Content-Type": "application/json",
              }
            };

              return axios.get(
                url,
                options
              ).then(response => {
                resolve(response.data);
              })
                .catch(error => {
                  reject(error);
                });
    
          })
          .catch(error => {
            alert("Error occured while Login")
            reject("Network Information Check Failed.");
          });
      });
  }

export function login(credentials) {
    return new Promise(async (resolve, reject) => {
      let host = await AsyncStorage.getItem(HOSTED_ENVIRONMENT);
      let url = env['PROD'];
      if (host && host !== null) {
        url = env[host];
      }
        checkConnectedStatus()
        .then(isConnected => {
          if (!isConnected) {
            reject("offline");
            return;
          }
          var data = {
            'userName':credentials.username,
            "password":credentials.password,
            "grant_type":"password",
            "application":"Admin"
          }
     
          const headers = {
            'Content-Type': "application/json"
          };
          return axios.post(
            url + "/api/oauth/token",
            data,
            headers
          ).then(response => {
            resolve(response);
          })
            .catch(error => {
              if(error.response.data){
                alert(error.response.data);
              }
              else{
                alert("Error occured while Login");
              }
           
              reject(error);
            });
  
        })
        .catch(error => {
          alert("Error occured while Login");
          reject("Network Information Check Failed.");
        });
    });
}

/**
 * Fetch HTTP request handler
 * Support HTTP methods : GET, POST, PUT, DELETE
 */
export function request(url, type, data) {
  console.log('requst',url,type,data);
  let authToken = null;
  return new Promise(async (resolve, reject) => {
    try {
      checkConnectivity();
      let sessionData = await AsyncStorage.getItem(SESSION);
      if (sessionData && sessionData !== null) {
        const userObj = JSON.parse(sessionData);
        authToken = userObj.access_token;
      }
    } catch (error) {
      reject("Error:", error);
    }
    const options = {
      method: type,
      headers: {
        "Content-Type": "application/json",
        Authorization:
          authToken !== null ? "Bearer " + authToken : authToken
      }
    };
    if (type.toLowerCase() !== "get" && type.toLowerCase() !== "delete") {
      options.body = JSON.stringify({
        data
      });

    }
    if (type.toLowerCase() === 'post') {
      return axios.post(
        url,
        data,
        { headers: options.headers }
      ).then(response => {
        resolve(response.data);
      })
        .catch(error => {
          reject(error);
        });
    }
    else if (type.toLowerCase() === 'put') {
      return axios.put(
        url,
        data,
        { headers: options.headers }
      ).then(response => {
        resolve(response.data);
      })
        .catch(error => {
          reject(error);
        });
    }
    else if (type.toLowerCase() === 'delete') {
      return axios.delete(
        url,
        { headers: options.headers }
      ).then(response => {
        resolve(response.data);
      })
        .catch(error => {
          reject(error);
        });
    }
    else {
      return axios.get(
        url,
        options
      ).then(response => {
        resolve(response.data);
      })
        .catch(error => {
          reject(error);
        });
    }
  });
}

/**
 * Read single record
 * Read record make GET http request to the server
 */
export async function get(routePath, params, filterParams) {
    let host = await AsyncStorage.getItem(HOSTED_ENVIRONMENT);
    let url = env['PROD'];
    if (host && host !== null) {
      url = env[host];
    }
    if (params) {
      url += replaceUrlParams(routePath, params);
    } else {
      url += "/" + routePath;
    }

    if (filterParams) {
        url += url.indexOf("?") === -1 ? `?` : `&`;
        url += `${filterParams.key}=${filterParams.value}`;
    }

    return request(url, "GET", null).then(
      response => response,
      error => {
        throw error;
      }
    );
}

/**
 * Save record
 * Create new record make POST http request to the server
 * Update existing record make PUT http request to the server
 */
export async function save(routePath, data, params, isNewRecord = true) {
    let host = await AsyncStorage.getItem(HOSTED_ENVIRONMENT);
    let url = env['PROD'];
    if (host && host !== null) {
      url = env[host];
    }
    let requestType = isNewRecord ? "POST" : "PUT";

    if (params) {
      url += replaceUrlParams(routePath, params);
    } else if (isNewRecord) {
      // POST
      url += "/" + routePath;
    } else {
      // PUT
      // url += routePath + "/" + data.id;
      url += replaceUrlParams(routePath, params);
    }
    return request(url, requestType, data).then(
      response => response,
      error => {
        throw error;
      }
    );
}

/**
 * Delete record
 * Delete record make DELETE http request to the server
 */
export async function remove(routePath, params) {
  let host = await AsyncStorage.getItem(HOSTED_ENVIRONMENT);
    let url = env['PROD'];
    if (host && host !== null) {
      url = env[host];
    }
    let requestType = "DELETE";

      url += replaceUrlParams(routePath, params);
      return request(url, requestType, null).then(
      response => response,
      error => {
        throw error;
      }
    );
}

/**
 * Replacing url params with array data
 * url format : /url-part-one/:param1/url-part-two/:param2
 * params format : {param1: '<param1>', param2: '<param2>'}
 */
function replaceUrlParams(url, params) {
  let urlElements = url.split("/");
  let processedUrl = "";
  urlElements.forEach(element => {
    if (!element) {
      return;
    }

    if (element.charAt(0) !== ":") {
      processedUrl += "/" + element;
      return;
    }

    let length = element.length;
    let key = element.substring(1, length);
    processedUrl += "/" + params[key];
  });
  return processedUrl;
}
