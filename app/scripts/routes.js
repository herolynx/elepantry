import React from 'react';
import {Router, Route, IndexRoute} from 'react-router';
import createHashHistory from 'history/lib/createHashHistory';

import PageFrame from './web/commons/page-frame';
import LoginPage from './web/security/login-page';
import ResourceView from './web/views/resource-view';


function requireAuth(nextState, replaceState) {
  // if (!AuthStore.isLoggedIn()) {
  //   replaceState({nextPathname: nextState.location.pathname}, '/login');
  // }
}

let routes = (
  <Router history={createHashHistory({queryKey: false})}>
    <Route path="/login" component={LoginPage}/>
    <Route path="/" component={PageFrame}>
      <IndexRoute component={ResourceView}/>
      <Route path="/view" component={ResourceView} onEnter={requireAuth}/>
    </Route>
  </Router>
);

export default routes;
