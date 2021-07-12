import React, { useEffect, useState } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import HomePage from './HomePage';
import AboutUs from './AboutUs';
import Login from './Login';
import Compare from './Compare';
import InstantGroup from './InstantGroup';
import ProductList from './ProductList';
import ProductView from './ProductView';
import AddProduct from './AddProduct';
import Profile from "./Profile";
import PasswordRecovery from "./PasswordRecovery";

import {getCookie} from '../services/auth';

var initialUserData = {
    email: "",
    role: "",
    token:"",
    isLoggedIn:false
}

export default function Router() {

    const [userData, setUserData] = useState({...initialUserData, isLoggedIn: getCookie("isLoggedIn") == "true" ? true:false});

    useEffect( ()=> {

    },[userData])

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/"> <HomePage userData={userData} setUserData={setUserData} /></Route>
          <Route exact path="/about" > <AboutUs userData={userData} setUserData={setUserData} /> </Route>
          <Route exact path="/product/add"><AddProduct userData={userData} setUserData={setUserData} /> </Route>
          <Route exact path="/product/compare"> <Compare userData={userData} setUserData={setUserData} /> </Route>
          <Route exact path="/product/view/:id"> <ProductView userData={userData} setUserData={setUserData} /> </Route>
          <Route exact path="/products/:id"> <ProductList userData={userData} setUserData={setUserData} /> </Route>
          <Route exact path="/login"> <Login userData={userData} setUserData={setUserData} /> </Route>
          <Route
            exact
            path="/product/instantGroup"
          > <InstantGroup userData={userData} setUserData={setUserData} /> </Route>
          <Route exact path="/profile"><Profile userData={userData} setUserData={setUserData} /></Route>
          <Route exact path="/passwordRecovery"> <PasswordRecovery userData={userData} setUserData={setUserData} /> </Route>
        </Switch>
      </BrowserRouter>
    );
}
