import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, hashHistory, IndexRedirect} from 'react-router'
import Root from './components/root'
import {Provider} from 'react-redux';
import configureStore from './configure-store';

function requireAuth(nextState, replace) {
   if (!getAuthToken()) {
      replace({pathname: '/login'})
   }
}

function noAuth(nextState, replace) {
   if (getAuthToken()) {
      replace({pathname: '/'})
   }
}

function getTokenValue() {
   var reg = new RegExp('[?&]authToken=([^&#]*)', 'i');
   var string = reg.exec(window.location.href);
   return string ? string[1] : null;
}

document.addEventListener('DOMContentLoaded', () => {
   var token = getTokenValue();
   if (token !== null) {
      saveAuthTokenFromQueryString(token);
   }

   ReactDOM.render(
      <Provider store={configureStore()}>
         <Router history={hashHistory}>
            <Route path='/' component={Root}>
               <IndexRedirect to='/customer'/>
               <Route path='customer' component={Customer} onEnter={requireAuth}/>
               <Route path='subscriptions' component={Subscriptions} onEnter={requireAuth}/>
               <Route path='invoices' component={Invoices} onEnter={requireAuth}/>
               <Route path='changePassword' component={ChangePassword} onEnter={requireAuth}/>
               <Route path='login' component={Login} onEnter={noAuth}/>
            </Route>
         </Router>
      </Provider>,
      document.getElementById('react-boilerplate')
   );
});
