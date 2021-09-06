import React from 'react';
import {getCookie} from '../services/cookies';

const token = getCookie("token")
const initialUserData = {
    name: getCookie("name"),
    email: getCookie("email"),
    token: getCookie("token"),
    isLoggedIn: token != "" ? true : false
}

var UserContext = React.createContext(initialUserData)

export {
    initialUserData,
    UserContext,
};

