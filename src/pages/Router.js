import React, { useEffect, useState } from "react";
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
import DashBoard from './admin_dashboard/DashBoard';
import FavouriteList from './FavouriteList';
import PageNotFound from './PageNotFound'


export default function Router() {

  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {" "}
            <HomePage/>
          </Route>
          <Route exact path="/about">
            {" "}
            <AboutUs />{" "}
          </Route>
          <Route exact path="/product/add">
            <AddProduct />{" "}
          </Route>
          <Route exact path="/product/compare">
            {" "}
            <Compare/>{" "}
          </Route>
          <Route exact path="/product/view/:id">
            {" "}
            <ProductView/>{" "}
          </Route>
          <Route exact path="/products/:categoryId/:subCategoryId">
            {" "}
            <ProductList />{" "}
          </Route>
          <Route exact path="/products/:categoryId">
            {" "}
            <ProductList />{" "}
          </Route>
          <Route exact path="/products">
            {" "}
            <ProductList />{" "}
          </Route>
          <Route exact path="/login">
            {" "}
            <Login />{" "}
          </Route>
          <Route exact path="/product/instantGroup/:postId/:groupId">
            {" "}
            <InstantGroup />{" "}
          </Route>
          <Route exact path="/profile">
            <Profile />
          </Route>
          <Route exact path="/TermsOfService">
            <TermsOfService/>
          </Route>
          <Route exact path="/passwordRecovery">
            {" "}
            <PasswordRecovery/>{" "}
          </Route>
          <Route exact path="/favourite-list">
            {" "}
            <FavouriteList/>{" "}
          </Route>
          <Route exact path="/dashboard"> <DashBoard /> </Route>
          <Route exact path="/pagenotfound">
            <PageNotFound/>
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}
