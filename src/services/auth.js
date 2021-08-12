import {getCookie, setCookie, checkCookie} from './cookies';
import HOST from '../config/config';


const register = (data, callback) => {
    const {firstName, lastName, email, password} = data;
    
    const requestOptions = {
        method:"POST",
        headers:{
            'Content-Type':"application/json"
        },
        body: JSON.stringify({
                firstName,
                lastName,
                email,
                password
            })
    }

    fetch(HOST+'registration', requestOptions)
    .then( res => { 
        callback(res)
    })
    .catch( err => console.error(err));
}


const login = ({email, password},setUserData,history) => {
    const requestOptions = {
        method:"POST",
        headers:{
            'Content-Type':"application/json"
        },
        body: JSON.stringify({
                email,
                password
            })
    }

    return fetch(HOST+'login', requestOptions )
    .then( res => {
        if(res.ok){
            setCookie("isLoggedIn", true,7 )
            return true;
        }
        return false;
        
    })
    .catch( err=> console.error(err));

}

const logout = (setUserData,history) => {
    setUserData( userData=> { return {...userData, isLoggedIn:false}})
    setCookie("isLoggedIn", false,7 )
    history.push("/login")
}

const passwordRecovery = ({email}) => {

  const requestOptions = {
    method:"POST",
    headers:{
      'Content-Type':"application/json"
    },
    body: JSON.stringify({
      email
    })
  }
  return fetch(HOST+'reset', requestOptions )
    .then( res => {
        if(res.ok){
            setCookie("isLoggedIn", true,7 )
            return true;
        }
        return false;
        
    })
    .catch( err=> console.error(err));

}


export {
    login,
    logout,
    passwordRecovery,
    register,
}