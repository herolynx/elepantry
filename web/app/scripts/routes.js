import React from 'react';
import {Router, Route, IndexRoute} from 'react-router';
import createHashHistory from 'history/lib/createHashHistory';

import PageFrame from './web/commons/page-frame';
import LoginPage from './web/security/login-page';
import ResourceView from './web/views/resource-view';
import AuthStore from './domain/security/oauth-store';
import AuthActions from './domain/security/oauth-actions';

function requireAuth(nextState, replaceState) {
  console.debug('requireAuth: ', nextState.location, AuthStore.isLoggedIn());
  if (!AuthStore.isLoggedIn()) {
    console.log('User not logged in - redirecting to login page');
    replaceState(
      {  nextPathname: nextState.location.pathname},
      '/login'
    );
  }
}

AuthActions.loginCompleted.listen(function(loggedIn) {
  console.log('User logged in: ', loggedIn);
  //TODO change this to some react redirect action when bloody API for it is found!!!
  window.location = '/';
});

let routes = (
  <Router history={createHashHistory({queryKey: false})}>
    <Route path="/login" component={LoginPage}/>
    <Route path="/" component={PageFrame}>
      <IndexRoute component={ResourceView} onEnter={requireAuth}/>
      <Route path="/view" component={ResourceView} onEnter={requireAuth}/>
    </Route>
  </Router>
);

export default routes;
