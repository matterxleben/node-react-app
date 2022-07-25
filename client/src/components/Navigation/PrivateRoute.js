import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import Landing from '../Landing';
import Reviews from '../Reviews';
import Search from '../Search';
import MyPage from '../MyPage';
import history from './history';

export default function PrivateRoute({
  //authenticated,
  //...rest
}) {
  return (

    <Router history={history}>
      <Switch>
      <Route path="/" exact component={Landing} />
      <Route path="/search" exact component={Search} />
      <Route path="/reviews" exact component={Reviews} />
      <Route path="/myPage" exact component={MyPage} />
      </Switch>
    </Router>
  );
}
