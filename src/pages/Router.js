import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HomePage from "./HomePage";
import AboutUs from "./AboutUs";
import Login from "./Login";
import Compare from "./Compare";
import InstantGroup from "./InstantGroup";
import ProductList from "./ProductList";
import ProductView from "./ProductView";
import AddProduct from "./AddProduct";
import Profile from "./Profile";
import PasswordRecovery from "./PasswordRecovery";
import TermsOfService from "./TermsOfService";

export default function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={HomePage}></Route>
        <Route exact path="/about" component={AboutUs}></Route>
        <Route exact path="/product/add" component={AddProduct}></Route>
        <Route exact path="/product/compare" component={Compare}></Route>
        <Route exact path="/product/view/:id" component={ProductView}></Route>
        <Route exact path="/products/:id" component={ProductList}></Route>
        <Route exact path="/login" component={Login}></Route>
        <Route exact path="/TermsOfService" component={TermsOfService}></Route>
        <Route
          exact
          path="/product/instantGroup"
          component={InstantGroup}
        ></Route>
        <Route exact path="/profile" component={Profile}></Route>
        <Route
          exact
          path="/passwordRecovery"
          component={PasswordRecovery}
        ></Route>
      </Switch>
    </BrowserRouter>
  );
}
