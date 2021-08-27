import React from 'react';

const initialUserData = {
    email: "",
    role: "admin",
    token:"",
    isLoggedIn:false
}

var UserContext = React.createContext(initialUserData)

const login = (token) => {
    
}

export {
    initialUserData,
    UserContext,
    login
};

