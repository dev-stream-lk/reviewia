import React from 'react';

export const initialUserData = {
    email: "",
    role: "admin",
    token:"",
    isLoggedIn:false
}

export const UserContext = React.createContext(initialUserData)