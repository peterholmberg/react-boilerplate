import { hashHistory } from 'react-router';
import { postJson } from './utils/network';
import { saveAuthToken, updateAuthToken, removeAuthToken } from './utils/session';
import { trackEvent, LOGIN, SUCCESS, CHANGE_PASSWORD, RESET_PASSWORD } from './utils/analytics';

export const RESET = 'RESET';
export const NETWORK = 'NETWORK';
export const SUBSCRIPTION = 'SUBSCRIPTION';
export const AUTHENTICATION = 'AUTHENTICATION';

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
      removeAuthToken();
      hashHistory.push('/login');

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

function authenticated(state, customer) {
   return {
      type: AUTHENTICATION,
      customer: customer,
      state: {
         authenticated: state
      }
   };
}

export function logout() {
   removeAuthToken();
   hashHistory.push('/login');

   return {
      type: RESET
   };
}

export function authenticate(data, onUnauthorized) {
   return dispatch => {
      dispatch(networkProgress());
      return postJson('/auth', data)
         .then(response => {
            saveAuthToken(data.orgNumber, data.password);
            dispatch(authenticated(true, response.data));
            dispatch(resetNetwork());
            trackEvent(LOGIN, SUCCESS);
            hashHistory.push('/');
         })
         .catch(error => {
            if(error.status === 401) {
               onUnauthorized();
               dispatch(resetNetwork());
            }
            else {
               dispatch(networkFailed(error));
            }
         });
   }
}

export function resetPassword(orgNumber, onPasswordReset) {
   return dispatch => {
      dispatch(networkProgress());
      return postJson('/resetPassword', { orgNumber })
         .then(response => {
            dispatch(resetNetwork());
            trackEvent(RESET_PASSWORD, SUCCESS);
            onPasswordReset(response.data);
         })
         .catch(error => {
            dispatch(networkFailed(error));
         })
   }
}

export function changePassword(oldPassword, newPassword, onPasswordChanged) {
   return dispatch => {
      dispatch(networkProgress());
      return postJson('/changePassword', { oldPassword, newPassword })
         .then(response => {
            updateAuthToken(newPassword);
            dispatch(resetNetwork());
            trackEvent(CHANGE_PASSWORD, SUCCESS);
            onPasswordChanged();
         })
         .catch(error => {
            dispatch(networkFailed(error));
         })
   }
}