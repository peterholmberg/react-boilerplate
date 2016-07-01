import {combineReducers} from 'redux';
import Immutable from 'immutable';
import { NETWORK, SUBSCRIPTION, AUTHENTICATION } from './actions';

function appState(state = Immutable.Map({
   networkFailed: false,
   networkProgress: false,
   authenticated: isAuthenticated(),
   showNavigation: true
}), action = null) {
   switch (action.type) {
      case NETWORK:
      case SUBSCRIPTION:
      case AUTHENTICATION:
         return state.merge(action.state);

      default:
         return state;
   }
}


const rootReducer = combineReducers({
   appState
});

export default rootReducer;