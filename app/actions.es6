import { hashHistory } from 'react-router';
import { postJson } from './utils/network';

export const RESET = 'RESET';
export const NETWORK = 'NETWORK';

export function networkProgress() {
   return {
      type: NETWORK,
      state: {
         networkProgress: true,
         networkFailed: false
      }
   };
}

export function networkFailed(error) {
   if (error && error.status === 401) {
      return {
         type: NETWORK,
         state: {
            networkProgress: false,
            subscriptionProgress: false,
            networkFailed: true,
            authenticated: false
         }
      };
   }

   return {
      type: NETWORK,
      state: {
         networkProgress: false,
         subscriptionProgress: false,
         networkFailed: true
      }
   };
}

export function resetNetwork() {
   return {
      type: NETWORK,
      state: {
         networkProgress: false,
         subscriptionProgress: false,
         networkFailed: false
      }
   };
}