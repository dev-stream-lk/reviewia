import React from "react";
import { getItem, setItem } from "../services/localStorage";

const token = getItem("token");
const initialUserData = {
  name: getItem("name"),
  email: getItem("email"),
  token: getItem("token"),
  role: getItem("role"),
  isLoggedIn: token != "" ? true : false,
};

var UserContext = React.createContext(initialUserData);
export { initialUserData, UserContext };
