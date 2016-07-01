import axios, { xhr, dispatchRequest } from 'axios';
import { getAuthToken } from './session';
import { ApiUrl } from '../globals';

const instance = axios.create({
   baseURL: getApiUrl()
});

export function getApiUrl() {
   if(ApiUrl === '#APIURL#') {
      // return 'http://localhost:53396/api';
   }
   return ApiUrl;
}

function getJsonHeaders() {
   return {
      headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
         'Authorization': 'Basic ' + getAuthToken()
      }
   }
}

export function getJson(url) {
   return instance.get(url, getJsonHeaders());
}

export function putJson(url, data) {
   return instance.put(url, JSON.stringify(data), getJsonHeaders());
}

export function postJson(url, data) {
   return instance.post(url, JSON.stringify(data), getJsonHeaders());
}