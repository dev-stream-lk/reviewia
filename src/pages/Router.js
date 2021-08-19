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
import {UserContext, initialUserData} from '../context/UserContext';

import {getCookie} from '../services/cookies';
import DashBoard from './DashBoard';


export default function Router() {

  const changeUserContext = (data) => {
    setUserData(data)
  }
  const [userData, setUserData] = useState({
      ...initialUserData,
      isLoggedIn: getCookie("isLoggedIn") == "true" ? true : false,
  });

  const [userDatas, setUserDatas] = useState({
    userData:{
      ...initialUserData,
      isLoggedIn: getCookie("isLoggedIn") == "true" ? true : false,
    },
    setUserData:changeUserContext
  });


  return (
    <UserContext.Provider value={userDatas}>
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
          <Route exact path="/products/:id">
            {" "}
            <ProductList />{" "}
          </Route>
          <Route exact path="/login">
            {" "}
            <Login userData={userData} setUserData={setUserData} />{" "}
          </Route>
          <Route exact path="/product/instantGroup">
            {" "}
            <InstantGroup userData={userData} setUserData={setUserData} />{" "}
          </Route>
          <Route exact path="/profile">
            <Profile userData={userData} setUserData={setUserData} />
          </Route>
          <Route exact path="/TermsOfService">
            <TermsOfService userData={userData} setUserData={setUserData} />
          </Route>
          <Route exact path="/passwordRecovery">
            {" "}
            <PasswordRecovery
              userData={userData}
              setUserData={setUserData}
            />{" "}
          </Route>
          <Route exact path="/dashboard"> <DashBoard userData={userData} setUserData={setUserData} /> </Route>
        </Switch>
      </BrowserRouter>
    </UserContext.Provider>
  );
}
