import React from 'react';
import {Router, Route, IndexRoute} from 'react-router';
import createHashHistory from 'history/lib/createHashHistory';

import PageFrame from './web/commons/page-frame';
import LoginPage from './web/security/login-page';
import ResourceView from './web/views/resource-view';
import AuthStore from './domain/security/oauth-store';
import AuthActions from './domain/security/oauth-actions';
import UserRepo from './domain/repos/user';
import CurrentUser from './domain/security/current-user-store';

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
  CurrentUser.load().then(user => {
    console.log('User logged in - saving info about logging');
    user.lastLoginDate = new Date().toString();
    UserRepo.save(user);
    //TODO change this to some react redirect action when bloody API for it is found!!!
    //TODO when nasty workaround is removed then timeout must be removed too tp prevent reload of the whole page!!!
    //note: reload of the whole page causes that save operation may not finish thus timeout needed
    setTimeout(
      () => window.location = '/',
      4000
    );
  });
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
