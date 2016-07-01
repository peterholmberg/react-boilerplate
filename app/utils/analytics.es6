export const LOGIN = 'LOGIN';
export const EDIT_CONTACT_DETAILS = 'EDIT_CONTACT_DETAILS';
export const EDIT_ADDRESSES = 'EDIT_ADDRESSES';
export const SUBSCRIPTION = 'SUBSCRIPTION';
export const DATAPACKAGE = 'DATAPACKAGE';
export const TOPUP = 'TOPUP';
export const SIM = 'SIM';
export const NETWORK_SERVICES = 'NETWORK_SERVICES';
export const BAR_SERVICES = 'BAR_SERVICES';
export const INVOICE = 'INVOICE';
export const CHANGE_PASSWORD = 'CHANGE_PASSWORD';
export const RESET_PASSWORD = 'RESET_PASSWORD';

export const SUCCESS = 'SUCCESS';
export const LOAD = 'LOAD';
export const GET = 'GET';

export function trackEvent(category, action) {
    _gaq.push(['_trackEvent', category, action]);
}