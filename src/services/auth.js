import {getCookie, setCookie, checkCookie} from './cookies';
import HOST from '../config/config';


const user_register = (data) => {
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

    return fetch(HOST+'registration', requestOptions)
    .then( res => { 
        if (res.status == 201){
            return true
        }else{
            return res.json()
        }
    })
    .then( data => {
        if( data === true)
            return true
        else
            return data['message']
    })
    .catch( err => {console.error(err); return false});
}


const user_login = ({email, password},setUserData,history) => {
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
            return res.json();
        }
        return false;
    })
    .then ( data => {
        if( data){
            let token = data['token'].split("Bearer ")[1]
            setCookie("token", token );
            return token
        }else{
            return false;
        }
    })
    .catch( err=> console.error(err));

}

const logout = (setUserData,history) => {
    setUserData( userData=> { return { userData:{...userData.userData,token:"",isLoggedIn:false}, setUserData:userData.setUserData }})
    setCookie("isLoggedIn", false,7 );
    setCookie("token","");
    history.push("/login");
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
            return true;
        }
        return false;
    })
    .catch( err=> console.error(err));

}


export {
    user_login,
    logout,
    passwordRecovery,
    user_register,
}