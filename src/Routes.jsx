import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import ProductList from './views/ProductList';
import Product from './views/Product'
import FeedBack from './views/Feedback'
import SignIn from './views/SignIn'
import SignUp from './views/SignUp'
import OrderItemTable from './views/OrderItemTable'
import CustomerOrderTable from './views/CustomerOrderTable'
import Account from './views/Account'
export default class Routes extends Component {
  render() {
    return (
      <Switch>
        <Redirect
          exact
          from="/"
          to="/productList"
        />
        <Route
          component={Product}
          exact
          path="/product/:id"
        />
        <Route
          component={ProductList}
          exact
          path="/productList"
        />
        <Route
          component={FeedBack}
          exact
          path="/feedback"
        />
        <Route
          component={SignIn}
          exact
          path="/sign-in"
        />
        <Route
          component={SignUp}
          exact
          path="/sign-up"
        />
        <Route
          component={OrderItemTable}
          exact
          path="/orders/:id"
        />
        <Route
          component={CustomerOrderTable}
          exact
          path="/customerOrders/:id"
        />
        <Route
          component={Account}
          exact
          path="/userInfo"
        />
      </Switch>
    );
  }
}
